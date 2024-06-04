import { DataTypes } from 'sequelize';
import {db} from '../db.js';

const Til = db.define(
    'Til',
    {
        title: {
            type : DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type : DataTypes.TEXT
        },
        category: {
            type : DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt : {
            type : DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }
);

export default Til;
