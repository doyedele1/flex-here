import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import axios from 'axios';

export default function SignupModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const setLoggedIn = useStoreActions((actions) => actions.login.setLoggedIn);
    const setHideModal = useStoreActions((actions) => actions.modals.setHideModal);

    const submit = async () => {
        const response = await axios.post('/api/auth/signup', {
            email, password, passwordConfirmation
        });
        
        if (response.data.status === 'error') {
            alert(response.data.message);
            return;
        }

        setLoggedIn(true);
        setHideModal(true);
    }

    return (
        <>
            <h2>Sign up</h2>
            <div>
                <form
                    onSubmit={submit}>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="Email address" 
                        onChange={(event) => setEmail(event.target.value)} 
                    />
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <input 
                        id="passwordConfirmation" 
                        type="password" 
                        placeholder="Confirm password"
                        onChange={(event) => setPasswordConfirmation(event.target.value)} 
                    />                
                    <button>Sign up</button>
                </form>
            </div>
            
            <p>
                Already have an account?{' '}
                <a href="javascript:;" onClick={() => props.showLogin()}>
                    Log in
                </a>
            </p>
        </>
    )
}