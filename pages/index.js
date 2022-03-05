/* eslint-disable react-hooks/exhaustive-deps */
import houses from '../houses';
import House from '../components/House';
import Layout from '../components/Layout';
import { House as HouseModal } from '../model.js';

import Cookies from 'cookies';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

export default function Home({ flexhere_session, houses }) {
  const setLoggedIn = useStoreActions((actions) => actions.login.setLoggedIn);
  
  useEffect(() => {
    if (flexhere_session) {
      setLoggedIn(true);
    }
  }, []);

  return ( 
    <Layout 
      content={
        <div>

          <h2>Places to stay</h2>

          <div className="houses">
            {houses.map((house, index) => {
              return <House key={index} {...house} />;
            })}
          </div>

          <style jsx>
            {`
              .houses {
                display: grid;
                grid-template-columns: 49% 49%;
                grid-template-rows: 300px 300px;
                grid-gap: 2%;
              }
            `}
          </style>

        </div>
      }
    />
  )
}

export async function getServerSideProps({ req, res, query }) {
  const cookies = new Cookies(req, res);
  const flexhere_session = cookies.get('flexhere_session');
  const houses = await HouseModel.findAndCountAll();

  return {
    props: {
      flexhere_session: flexhere_session || null,
      houses: houses.rows.map((house) => house.dataValues)
    }
  };
}
