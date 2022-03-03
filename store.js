import { createStore, action } from 'easy-peasy';

export default createStore({
    modals: {
        showModal: false,
        showLoginModal: false,
        showSignupModal: false,
        setShowModal: action((state) => {
            state.showModal = true
        }),
        setHideModal: action((state) => {
            state.showModal = false
        }),
        setShowLoginModal: action((state) => {
            state.showModal = true
            state.showLoginModal = true
            state.showSignupModal = false
        }),
        setShowSignupModal: action((state) => {
            state.showModal = true
            state.showLoginModal = false
            state.showSignupModal = true
        })
    }
})