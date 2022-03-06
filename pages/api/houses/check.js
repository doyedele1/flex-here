/* eslint-disable import/no-anonymous-default-export */
import { Booking } from '../../../model.js';
import { Sequelize } from 'sequelize';

const canBookThoseDates = async (houseId, startDate, endDate) => {
    const results = await Booking.findAll({
        where: {
            houseId: houseId,
            startDate: {
                [Sequelize.Op.lte]: new Date(endDate)
            },
            endDate: {
                [Sequelize.Op.gte]: new Date(startDate)
            }
        }
    });
    return !(results.length > 0);
}

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }
    const houseId = req.body.houseId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    let message = 'free';
    if (!(await canBookThoseDates(houseId, startDate, endDate))) {
        message = 'not free';
    }

    res.json({
        status: 'success',
        message: message
    });
}