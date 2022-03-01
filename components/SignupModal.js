export default function SignupModal(props) {
    return (
        <>
            <h2>Sign up</h2>
            <div>
                <form
                    onSubmit={event => {
                        alert('Sign up!');
                        event.preventDefault();
                    }}>
                    <input id="email" type="email" placeholder="Email address" />
                    <input id="password" type="password" placeholder="Password" />
                    <input id="passwordConfirmation" type="password" placeholder="Confirm password" />                
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