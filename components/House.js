export default function House(props) {
    return (
        <div>
            <img src={props.picture} width="100%" alt="House" />
            <p>{props.type} - {props.town}</p>
            <p>{props.title}</p>
        </div>
    )
}