import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
export default function House(props) {
    return (
        <Link href="/houses/[id]" as={"/houses/" + props.id}>
            <a>
                <img src={props.picture} width="100%" alt="House" />
                <p>{props.type} - {props.town}</p>
                <p>{props.title}</p>
            </a>
        </Link>
    )
}