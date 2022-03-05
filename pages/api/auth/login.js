/* eslint-disable import/no-anonymous-default-export */
import Cookies from 'cookies';
import { User, sequelize } from '../../../model.js';

const randomString = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }

    const { email, password } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
        res.end(JSON.stringify({
            status: 'error',
            message: 'User does not exist'
        }));
        return;
    }

    const isPasswordValid = await user.isPasswordValid(password);

    if (!isPasswordValid) {
        res.end(JSON.stringify({
            status: 'error',
            message: 'Password is incorrect'
        }));
        return;
    }

    let sessionToken = null;
    const sessionExpiration = new Date();
    sessionExpiration.setDate(sessionExpiration.getDate() + 30);

    if (new Date(user.session_expiration) < new Date()) {
        sessionToken = randomString(255);
        User.update(
            {
                session_token: sessionToken,
                session_expiration: sessionExpiration
            },
            { 
                where: { email }
            }
        );
    } 
    else {
        sessionToken = user.session_token;
        User.update(
            {
                session_expiration: sessionExpiration
            },
            {
                where: { email }
            }
        );
    }

    const cookies = new Cookies(req, res);
    cookies.set('flexhere_session', sessionToken, {
        httpOnly: true
    });

    res.end(JSON.stringify({
        status: 'success',
        message: 'User logged in'
    }));
}