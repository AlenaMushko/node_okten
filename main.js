const express = require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = 5005;

const usersRouter = require('./users')

app.use('/', usersRouter);

app.use((req, res)=>{
    res.status(404).json({ message: 'Not found'})
});
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});
