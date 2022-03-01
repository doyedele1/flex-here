import Nav from './Nav';
import Modal from './Modal';
import { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Layout(props) {
    const [showModal, setShowModal] = useState(true);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(true);

    return (
        <div>
            <Nav />
            <main>{props.content}</main>
            
            {
                showModal && <Modal close={() => setShowModal(false)}>
                    {showLoginModal && (
                        <LoginModal 
                            showSignup = {() => {
                                setShowSignupModal(true)
                                setShowLoginModal(false)
                            }}
                        />
                    )}
                    {showSignupModal && (
                        <SignupModal
                            showLogin = {() => {
                                setShowSignupModal(false)
                                setShowLoginModal(true)
                            }}
                        />
                    )}

                </Modal>
            }

            <style jsx>
                {`
                    main {
                        position: relative;
                        max-width: 56em;
                        background-color: white;
                        padding: 2em;
                        margin: 0 auto;
                        box-sizing: border-box;
                    }
                `}
            </style>
        </div>
    )
}