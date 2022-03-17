/* eslint-disable import/no-anonymous-default-export */
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }

    const amount = req.body.amount;

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: 'Booking house on Flexhere',
            amount: amount * 100,
            currency: 'usd',
            quantity: 1
        }],
        success_url: process.env.BASE_URL + '/bookings',
        cancel_url: process.env.BASE_URL + '/bookings'
    });

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
        status: 'success',
        sessionId: session.id,
        stripePublicKey: process.env.STRIPE_PUBLIC_KEY
    }));
}