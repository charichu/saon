import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  GMChangeStatus,
} from '@chasaon/common';
import { Order } from '../models/order';
import { stripe } from '../stripe'; 
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/paymentCreatedPublisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if(!order){
        throw new NotFoundError();
    }

    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    if(order.status === GMChangeStatus.Cancelled){
        throw new BadRequestError('Order is already cancelled');
    }
    
    const charge = await stripe.charges.create({
        currency: 'usd',
        amount: 1000,
        source: token
    });

    const payment = Payment.build({
        orderId,
        stripeId: charge.id
    });

    await payment.save();
    
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({id: payment.id});
  }
);

export { router as createChargeRouter };
