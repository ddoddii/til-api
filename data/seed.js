import Til from '../models/til.js';  
import {db} from '../db.js'; 
import mockData from './mock.js';

const seedDatabase = async () => {
    try {
        await Til.sync({ force: true });
        await Til.bulkCreate(mockData);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        await db.close();
    }
};

seedDatabase();