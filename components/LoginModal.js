export default function LoginModal(props) {
    return (
        <>
            <h2>Log in</h2>
            <div>
                <form 
                    onSubmit={(event) => {
                        alert('Log in!');
                        event.preventDefault();
                    }}>
                    <input id="email" type="email" placeholder="Email address" />
                    <input id="password" type="password" placeholder="Password" />
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