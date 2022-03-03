import Nav from './Nav';
import Modal from './Modal';
import { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function Layout(props) {
    const showModal = useStoreState((state) => state.modals.showModal);
    const showLoginModal = useStoreState((state) => state.modals.showLoginModal);
    const showSignupModal = useStoreState(
        (state) => state.modals.showSignupModal
    );

    const setHideModal = useStoreActions((actions) => actions.modals.setHideModal);
    const setShowSignupModal = useStoreActions(
        (actions) => actions.modals.setShowSignupModal
    );
    const setShowLoginModal = useStoreActions(
        (actions) => actions.modals.setShowLoginModal
    );

    return (
        <div>
            <Nav />
            <main>{props.content}</main>

            {
                showModal && (
                    <Modal close={() => setHideModal()}>
                        {showLoginModal && (
                            <LoginModal 
                                showSignup = {() => {
                                    setShowSignupModal()
                                }}
                            />
                        )}
                        {showSignupModal && (
                            <SignupModal
                                showLogin = {() => {
                                    setShowLoginModal()
                                }}
                            />
                        )}
                    </Modal>
                )
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