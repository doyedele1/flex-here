/* eslint-disable @next/next/no-img-element */
import houses from '../../houses';

const House = (props) => {
    <div>
        <img src={props.house.picture} width="100%" alt="House" />
        <p>{props.house.type} - {props.house.town}</p>
        <p>{props.house.title}</p>
    </div>
}

House.getInitialProps = ({ query}) => {
    const { id } = query;

    return {
        house: houses.filter((house) => house.id === id)[0]
    }
}

export default House;