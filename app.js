import express from "express";
import {db} from './db.js';
import Til from './models/til.js';
import { asyncHandler, errorHandler } from './middleware/errorHandler.js';
import morganMiddleware from "./middleware/morgan.middleware.js";
import logger from "./utils/logger.js";

const app = express();
app.use(express.json());
app.use(morganMiddleware);

// 데이터베이스 연결
const connectDatabase = async () => {
    try {
        await db.authenticate();
        logger.info('Database connection has been established successfully.')
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}

connectDatabase();

app.get('/logger', (req,res)=> {
    logger.error('This is error log');
    logger.warn('This is warn log');
    logger.info("This is a info log");
    logger.http("This is a http log");
    logger.debug("This is a debug log");

    res.send("Hello logger!");
})

/*
* GET Request 
*/
app.get('/til', async (req,res) => {
    const tils = await Til.findAll();
    res.send(tils);
});

/*
* GET Request with dynamic url
*/
app.get('/til/:id', asyncHandler(async (req,res,next) => {
    const id = Number(req.params.id);
    const til = await Til.findOne({
        where: { id: id }
    });

    if (!til) {
        res.status(404).json({ message: `id ${id} not found` });
        return;
    } else {
        res.send(til);
    }
}));

/*
* POST Request
*/
app.post('/til', asyncHandler(async (req,res,next) => {
    const newTilRequest = req.body;
    const newTil = await Til.create({
        title : newTilRequest.title,
        description : newTilRequest.description,
        category : newTilRequest.category
    })
    res.status(201).send(newTil);
}));


/*
* PATCH Request
*/
app.patch('/til/:id', asyncHandler(async (req,res,next) => {
    const id = Number(req.params.id);
    const TilModifyRequest = req.body;

    const til = await Til.findOne({
        where : {
            id : id
        }
    });

    if(!til) {
        res.status(404).json({ message: `id ${id} not found` });
        return;
    };

    // Update Til
    await Til.update(TilModifyRequest, { where: { id } });
    res.status(200).json({ message: `id ${id} modified` });
}));

/*
* DELETE Request
*/
app.delete('/til/:id', asyncHandler(async (req,res,next)=> {
    const id = Number(req.params.id);

    const til = await Til.findOne({
        where : {
            id : id
        }
    });

    if(!til) {
        res.status(404).json({ message: `id ${id} not found` });
        return;
    };
    
    // Delete Til
    await Til.destroy({where : {id : id}});
    res.status(204).json({message : `id ${id} deleted`} );
}));

app.use(errorHandler);

app.listen(3000,()=>logger.info("Server started!"));