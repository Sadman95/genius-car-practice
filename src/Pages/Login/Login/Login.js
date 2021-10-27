import React from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuth from './../../../hooks/useAuth';

const Login = () => {
    const { signInUsingGoogle } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const redirect_uri = location.state?.from || '/login';

    const handleSignInWthGoogle = () =>{
        signInUsingGoogle();
        history.push(redirect_uri);
    }

    return (
        <div>
            <h2>Please Login</h2>
            <button onClick={handleSignInWthGoogle} className="btn btn-warning">Google Sign In</button>
        </div>
    );
};

export default Login;