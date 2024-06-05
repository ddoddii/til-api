import { DataTypes, Model } from 'sequelize';
import {db} from '../db.js';

class Til extends Model{}

Til.init(
    {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type : DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type : DataTypes.TEXT
        },
        category: {
            type : DataTypes.STRING,
            defaultValue : "컴퓨터과학",
            validate : {
                isIn: [['운영체제','네트워크','컴퓨터구조','자료구조','알고리즘','데이터베이스']]
            }
        },
    },
    {
        sequelize: db,
        modelName : 'Tils',
        timestamps: true,
    }
);


export default Til;
