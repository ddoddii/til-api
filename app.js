import express from "express";
import {db} from './db.js';
import Til from './models/til.js';
import { asyncHandler, errorHandler } from './middleware/errorHandler.js';


const app = express();
app.use(express.json());
app.use(errorHandler);

// 데이터베이스 연결
const connectDatabase = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDatabase();

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

app.listen(3000,()=>console.log("Server started!"));