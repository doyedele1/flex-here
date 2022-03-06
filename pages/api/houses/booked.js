/* eslint-disable import/no-anonymous-default-export */
import { Booking } from '../../../model.js';
import { Sequelize } from 'sequelize';

const getDatesBetweenDates = (startDate, endDate) => {
    let dates = [];
    while (startDate < endDate) {
        dates = [...dates, new Date(startDate)];
        startDate.setDate(startDate.getDate() + 1);
    }
    dates = [...dates, endDate];
    return dates;
}

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }
    const houseId = req.body.houseId;

    const results = await Booking.findAll({
        where: {
            houseId: houseId,
            endDate: {
                [Sequelize.Op.gte]: new Date()
            }
        }
    })

    let bookedDates = [];

    for (const result of results) {
        const dates = getDatesBetweenDates(
            new Date(result.startDate),
            new Date(result.endDate)
        )

        bookedDates = [...bookedDates, ...dates]
    }

    bookedDates = [...new Set(bookedDates.map((date) => date))]

    res.json({
        status: 'success',
        message: 'ok',
        dates: bookedDates
    })
}