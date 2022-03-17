import { Sequelize, Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION, {
    dialect: 'postgres',
    logging: false,
});

class User extends Model {};

User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        session_token: {
            type: DataTypes.STRING
        },
        session_expiration: {
            type: DataTypes.DATEONLY
        }
    },
    {
        sequelize,
        modelName: 'user',
        timestamps: false,
        hooks: {
            beforeCreate: async (user) => {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
);

User.prototype.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password);
};

class House extends Sequelize.Model {}

House.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        picture: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        town: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        owner: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'house',
        timestamps: false
    }
)

class Booking extends Sequelize.Model {}

Booking.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        houseId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        startDate: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: false
        },
        paid: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        sessionId: {
            type: Sequelize.DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'booking',
        timestamps: true
    }
)

export { sequelize, User, House, Booking };

User.sync({ alter: true });
House.sync({ alter: true });
Booking.sync({ alter: true });