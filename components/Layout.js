import Nav from './Nav';

export default function Layout(props) {
    return (
        <div>
            <Nav />

            <main>{props.content}</main>

            <style jsx>
                {`
                    main {
                        position: relative;
                        max-width: 55em;
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