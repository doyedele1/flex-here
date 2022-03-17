/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Layout from '../../components/Layout';
import DateRangePicker from '../../components/DateRangePicker';
import { House as HouseModel } from '../../model.js';

import Cookies from 'cookies';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState, useEffect } from 'react';
import axios from 'axios';

const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let dayCount = 0;

    while (end > start) {
        dayCount += 1;
        start.setDate(start.getDate() + 1);
    }

    return dayCount;
}

const getBookedDates = async id => {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/houses/booked', 
            { houseId: id }
        );
        if (response.data.status === 'error') {
            alert(response.data.message);
            return;
        }
        return response.data.dates;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

const canReserve = async (houseId, startDate, endDate) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/houses/check',
            { houseId, startDate, endDate }
        );
        if (response.data.status === 'error') {
            alert(response.data.message);
            return;
        }
        if (response.data.message == 'not free') return false;
        return true;
    }
    catch (error) {
        console.log(error);
        return;
    }
    }

export default function House({ house, flexhere_session, bookedDates }) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [dateChosen, setDateChosen] = useState(false);
    const [numberOfNightsBetweenDates, setNumberOfNightsBetweenDates] = useState(0);
    const loggedIn = useStoreState((state) => state.login.loggedIn);
    const setShowLoginModal = useStoreActions(
        (actions) => actions.modals.setShowLoginModal
    );
    const setLoggedIn = useStoreActions((actions) => actions.login.setLoggedIn);

    useEffect(() => {
        if (flexhere_session) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <Layout content = {
            <div className="container">
                <Head>
                    <title>{house.title}</title>
                </Head>
                <article>
                    <img src={house.picture} width="100%" alt="House picture" />
                    <p>
                        {house.type} - {house.town}
                    </p>
                    <p>{house.title}</p>
                </article>
                <aside>
                    <h2>Choose a date</h2>
                    <DateRangePicker
                        datesChanged={(startDate, endDate) => {
                            setNumberOfNightsBetweenDates(calcNumberOfNightsBetweenDates(startDate, endDate));
                            setDateChosen(true);
                            setStartDate(startDate);
                            setEndDate(endDate);
                        }}
                        bookedDates={bookedDates}
                    />

                    {dateChosen && (
                        <div>
                            <h2>Price per night</h2>
                            <p>${house.price}</p>
                            <h2>Total price for booking</h2>
                            <p>
                                ${(numberOfNightsBetweenDates * house.price).toFixed(2)}
                            </p>
                            {
                                loggedIn ? (
                                    <button 
                                        className="reserve" 
                                        onClick={async () => {
                                            if (!(await canReserve(house.id, startDate, endDate))) {
                                                alert('These dates are not available');
                                                return;
                                            }
                                            try {
                                                const sessionResponse = await axios.post('/api/stripe/session', {
                                                    amount: house * price * numberOfNightsBetweenDates
                                                });
                                                if (sessionResponse.data.status === 'error') {
                                                    alert(sessionResponse.data.message);
                                                    return;
                                                }
                                                const sessionId = sessionResponse.data.sessionId;
                                                const stripePublicKey = sessionResponse.data.stripePublicKey;

                                                const response = await axios.post('/api/reserve', {
                                                    houseId: house.id,
                                                    startDate,
                                                    endDate,
                                                    sessionId
                                                });
                                                if (response.data.status === 'error') {
                                                    alert(response.data.message);
                                                    return;
                                                }
                                                console.log(response.data);

                                                const stripe = Stripe(stripePublicKey);
                                                const { error } = await stripe.redirectToCheckout({sessionId});
                                            }
                                            catch (error) {
                                                console.log(error);
                                                return;
                                            }
                                        }}
                                    >
                                        Reserve now
                                    </button>
                                ) : (
                                    <button 
                                        className="reserve" 
                                        onClick={() => {
                                            setShowLoginModal();
                                        }}
                                    >
                                        Log in to Reserve
                                    </button>
                                )
                            }
                        </div>
                    )}
                </aside>

                <style jsx>
                    {`
                        .container {
                            display: grid;
                            grid-template-columns: 60% 40%;
                            grid-gap: 30px;
                        }
                        
                        aside {
                            border: 1px solid #ccc;
                            padding: 20px;
                        }
                    `}
                </style>

            </div>
        }/>
    )
}

export async function getServerSideProps({ req, res, query }) {
    const { id } = query;
    const cookies = new Cookies(req, res);
    const flexhere_session = cookies.get('flexhere_session');
    const house = await HouseModel.findByPk(id);
    const bookedDates = await getBookedDates(id);

    return {
        props: {
            house: house.dataValues,
            flexhere_session: flexhere_session || null,
            bookedDates
        }
    };
}