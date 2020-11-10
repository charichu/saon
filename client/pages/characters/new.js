import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const NewCharacter = () => {

    const [name, setName] = useState('');
    const [stats, setStats] = useState('');

    const { doRequest, errors } = useRequest({
        url: '/api/characters',
        method: 'post',
        body: {
            name, stats
        },
        onSuccess: (character) => Router.push('/characters/show'),
    });

    const onSubmit = (event) => {
        event.preventDefault();

        doRequest();
    };

    return (
        <div>
            <h1>Create New Character</h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name</label>                    
                    <input 
                        value={name} onChange={(e) => setName(e.target.value)} 
                        className="form-control">                        
                    </input>
                </div>
                <div className="form-group">
                    <label>JSON:</label>                    
                    <input 
                        value={stats} onChange={(e) => setStats(e.target.value)} 
                        className="form-control">                        
                    </input>
                </div>
                {errors}
                <button className="btn btn-secondary">Submit</button>
            </form>
        </div>
    )

}

export default NewCharacter;