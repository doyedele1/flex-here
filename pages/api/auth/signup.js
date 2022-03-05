/* eslint-disable import/no-anonymous-default-export */
import { User } from '../../../model.js';
import Cookies from 'cookies';

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

    const { email, password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) {
        res.end(
            JSON.stringify({
                status: 'error',
                message: 'Passwords do not match'
            })
        );
        return;
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
        user = await User.create({ email, password });

        const sessionToken = randomString(255);
        const d = new Date();
        d.setDate(d.getDate() + 30);
        User.update(
            {
                session_token: sessionToken,
                session_expiration: d
            },
            { 
                where: { email }
            }
        );
        const cookies = new Cookies(req, res);
        cookies.set('flexhere_session', sessionToken, {
            httpOnly: true
        });
        res.end(
            JSON.stringify({
                status: 'success',
                message: 'User created'
            })
        );
    }
    else {
        res.end(
            JSON.stringify({
                status: 'error',
                message: 'User already exists in the database'
            })
        );
    }
}