/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Layout from '../../components/Layout';
import DateRangePicker from '../../components/DateRangePicker';
import { House as HouseModel } from '../../model.js';

import Cookies from 'cookies';
import { useStoreActions } from 'easy-peasy';
import { useState, useEffect } from 'react';

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

export default function House({ house, flexhere_session }) {
    const [dateChosen, setDateChosen] = useState(false);
    const [numberOfNightsBetweenDates, setNumberOfNightsBetweenDates] = useState(0);

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
                        }}
                    />

                    {dateChosen && (
                        <div>
                            <h2>Price per night</h2>
                            <p>${house.price}</p>
                            <h2>Total price for booking</h2>
                            <p>
                                ${(numberOfNightsBetweenDates * house.price).toFixed(2)}
                            </p>
                            <button 
                                className="reserve" 
                                onClick={() => {
                                    setShowLoginModal();
                                }}
                            >
                                Reserve
                            </button>{' '}
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

    return {
        props: {
            house: house.dataValues,
            flexhere_session: flexhere_session || null
        }
    };
}