/* eslint-disable import/no-anonymous-default-export */
import { User, Booking } from '../../model.js';

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }

    const user_session_token = req.cookies.flexhere_session;
    if (!user_session_token) {
        res.status(401).end();
        return;
    }

    User.findOne({ where: { session_token: user_session_token } }).then(user => {
        Booking.create({
            houseId: req.body.houseId,
            userId: user.id,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            sessionId: req.body.sessionId
        }).then(() => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(
                JSON.stringify({
                    status: 'success',
                    message: 'Booking created'
                })
            );
        });
    });
}