import express from "express";
import {db} from './db.js';
import Til from './models/til.js';

const app = express();
app.use(express.json());

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
app.get('/til/:id', async (req,res) => {
    const id = Number(req.params.id);
    await Til.findOne({
        where : {
            id : id
        }
    }).then(til => {
        if(!til) {
            res.status(404).json({message : `id ${id} not found`});
            return;
        } else {
            res.send(til);
        }
    })
    
});

/*
* POST Request
*/
app.post('/til', async (req,res) => {
    const newTilRequest = req.body;
    const newTil = Til.create({
        title : newTilRequest.title,
        description : newTilRequest.description,
        category : newTilRequest.category
    });
    res.status(201).send(newTil);
});

/*
* PATCH Request
*/
app.patch('/til/:id', async (req,res) => {
    const id = Number(req.params.id);
    const TilModifyRequest = req.body;

    // error handling
    await Til.findOne({
        where : {
            id : id
        }
    }).then(async til => {
        if (!til) {
            res.status(404).json({message : `id ${id} not found`});
            return;
        } else { 
            await Til.update(
                TilModifyRequest,
                {where : {
                    id : id
                }}
            );
            res.status(200).json({message : `id ${id} modified`} );
        }
    });
});

/*
* DELETE Request
*/
app.delete('/til/:id', async (req,res)=> {
    const id = Number(req.params.id);

    // error handling
    await Til.findOne({
        where : {
            id : id
        }
    }).then(async til => {
        if (!til) {
            res.status(404).json({message : `id ${id} not found`});
            return;
        } else { 
            await Til.destroy({
                where : {
                    id : id
                }
            });
            res.status(204).json({message : `id ${id} deleted`} );
        }
    });
});

app.listen(3000,()=>console.log("Server started!"));