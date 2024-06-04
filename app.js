import express from "express";
import til from './data/mock.js';

const app = express();

app.get('/til', (req,res)=>{
    res.send(til);
});

app.listen(3000,()=>console.log("Server started!"));