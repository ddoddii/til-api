import express from "express";
import til from './data/mock.js';

const app = express();
app.use(express.json());

app.get('/til', (req,res)=>{
    const sort = req.query.sort;
    const category  = req.query.category;
    const count = Number(req.query.count);

    // 오래된 순으로 정렬
    const compareFn = 
    sort == 'oldest'
    ? (a,b) => a.createdAt - b.createdAt 
    : (a,b) => b.createdAt - a.createdAt;

    // 카테고리 필터
    let filteredData = category ? til.filter(item => item.category === category) : til;

    // 데이터 정렬
    filteredData = filteredData.sort(compareFn);

    // 정해진 개수만큼 가져오기
    if(count) {
        filteredData = filteredData.slice(0,count);
    }
    
    res.send(filteredData);
});

app.get('/til/:id', (req,res) => {
    const id = Number(req.params.id);
    const target = til.find((target)=> target.id === id);
    if (target) {
        res.send(target);
    } else {
        res.status(404).send({message : 'No TIL with given ID is found'});
    }
})

app.post('/til', (req,res) => {
    const newTIL = req.body;
    const ids = til.map((target)=>target.id);
    newTIL.id = Math.max(...ids) +1;
    newTIL.createdAt = new Date();
    newTIL.updatedAt = new Date();
    til.push(newTIL);
    res.status(201).send(newTIL);
})

app.patch('/til/:id', (req,res) => {
    const id = Number(req.params.id);
    const target = til.find((target)=> target.id === id);
    if (target) {
        Object.keys(req.body).forEach((key) => {
            target[key] = req.body[key];
        });
        target.updatedAt = new Date();
        res.send(target);
    } else {
        res.status(404).send({message : 'No TIL with given ID is found'});
    }
})

app.listen(3000,()=>console.log("Server started!"));