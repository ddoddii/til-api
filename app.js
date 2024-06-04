import express from "express";
import til from './data/mock.js';

const app = express();


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



app.listen(3000,()=>console.log("Server started!"));