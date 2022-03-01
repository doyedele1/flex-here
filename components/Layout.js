import Nav from './Nav';
import Modal from './Modal';
import { useState } from 'react';

export default function Layout(props) {
    const [showModal, setShowModal] = useState(true);

    return (
        <div>
            <Nav />
            <main>{props.content}</main>
            {
                showModal && <Modal>test</Modal>
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