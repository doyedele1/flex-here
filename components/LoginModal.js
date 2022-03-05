import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import axios from 'axios';

export default function LoginModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setLoggedIn = useStoreActions((actions) => actions.login.setLoggedIn);
    const setHideModal = useStoreActions((actions) => actions.modals.setHideModal);

    const submit = async () => {
        const response = await axios.post('/api/auth/login', {
            email, password
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
            <h2>Log in</h2>
            <div>
                <form 
                    onSubmit={(event) => {
                        submit();
                        event.preventDefault();
                    }}>
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
                    <button>Log in</button>
                </form>
            </div>
            
            <p>
                Don&apos;t have an account yet?{' '}
                <a href="javascript:;" onClick={() => props.showSignup()}>
                    Sign up
                </a>
            </p>
        </>
    )
}