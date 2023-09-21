// const fs = require('fs');
// const path = require('path');
//
// // щоб побачити подію
// eventEmitter.once('hello', ()=>{
//     /викликається 1 раз
// });
// eventEmitter.emit('hello');
//
// eventEmitter.on('hey', ()=>{
//     /викликається безліч разів
// });
//
// eventEmitter.emit('hey');
// eventEmitter.emit('hey');
// eventEmitter.emit('hey');
//
//приклад: загрузка відео частинками


//===================================== EXPRES =====================================
// npm init -y
// npm i express

const express= require('express');
const app = express();
app.use(express.json());
// щоб прочитати формат json
app.use(express.urlencoded({extended:true}));
// читати query params
const PORT = 5004;

const users =[
    {
        id:0,
        name:"Alona",
        age:37,
        country:"Ukraine",
    }
]

app.get('/users', (req, res)=>{
    //req те що отрималт з клієнта
    //res  те що відправили клієнту
    res.json(users)
});

// app.get('/users:id', (req, res)=>{
//     const {id}= req.params;
//     res.json({
//     data: users[+id})
// });

app.post("/users", (req, res)=>{
    users.push(req.body);
    console.log(req.body);
    console.log(users)
    res.status(201).json({message: "Created user"});
});

app.put("/users/:id", (req, res)=>{
    const {id}= req.params; //щоб із url дістати id
    console.log(id)
    const updatedUser = req.body;
    if (users[id]) {
        users[id] = updatedUser;
        console.log(users);
        res.status(200).json({ message: `User with ID ${id} is updated` });
    } else {
        res.status(404).json({ message: `User with ID ${id} not found` });
    }
});

app.delete("/users/:id", (req, res)=>{
    const {id}= req.params;
    users.splice(+id, 1);
    res.status(200).json({message:`users[id].name is deleted`})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
