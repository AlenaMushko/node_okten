
//===================================== EXPRES =====================================
// npm init -y
// npm i express

const express= require('express');
const app = express();
app.use(express.json);   //щоб прочитати формат json
ap.use(express.urlencoded({extended:true}));   //читати query params
const PORT = 5000;

const users =[
    {
        name:"Alona",
        age:37,
        country:"Ukraine",
    }
]
app.get('/', (req, res)=>{
    //req те що отрималт з клієнта
    //res  те що відправили клієнту
    res.json(users)
});

app.post("/", (req, res)=>{
    console.log(req.body);
    res.status(201).json({message: "Created user"});
});

app.put("/", (req, res)=>{
    const {id}= req.params; //щоб із url дістати id
    const updatedUser = req.body;
    users[+id] = updatedUser;
    res.status(200).json({message:`users[id].name is updated`});
});

app.delete("/", (req, res)=>{
    const {id}= req.params;
    users.splice(+id, 1);
    res.status(200).json({message:`users[id].name is deleted`})
})




app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
