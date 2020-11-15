import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../components/header';
import Footer from '../components/footer';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
      <div className="bg-dark text-white" style={{height: "100vh"}}>
        <Header currentUser={currentUser} />
        <hr></hr>
        <div className="container"> 
          <Component currentUser={currentUser} {...pageProps} />
        </div>
        <Footer />
      </div>
    );
  };
  
  AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
  
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }
  
    return {
      pageProps,
      ...data
    };
  };
  
  export default AppComponent;