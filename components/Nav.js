/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Nav(props) {
    return (
        <div className="nav-container">
            <Link href="/">
                <a>
                    <img src="/img/logo.png" alt="Logo" />
                </a>
            </Link>
            
            <nav>
                <ul>
                    <li>
                        <Link href="/register">
                            <a>Sign up</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <a>Log in</a>
                        </Link>
                    </li>
                </ul>
            </nav>

            <style jsx>
                {`
                    .nav-container {
                        border-bottom: 1px solid #eee;
                        height: 50px;
                    }

                    img {
                        float: left;
                        width: 50px;
                        height: 50px;
                    }

                    ul {
                        margin: 0;
                        padding: 0;
                        float: right;
                    }

                    li {
                        display: block;
                        float: left;
                    }

                    a {
                        text-decoration: none;
                        display: block;
                        margin-right: 15px;
                        color: #333;
                    }

                    nav a {
                        padding: 1em 0.5em;
                    }
                `}
            </style>
        </div>
    )
}