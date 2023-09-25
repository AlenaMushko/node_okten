import express from 'express';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import path from 'path';
import fs from 'fs/promises';

import {userSchema, updateUserSchema} from './validations/usersValidation';

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = 5005;

const usersPath = path.join(__dirname, 'users.json');

interface IUser {
    id:string,
    name:string,
    age: number,
    country: string
}

async function getUsers() {
    try {
        const data = await fs.readFile(usersPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

app.get('/users', async (req:Request, res:Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
});
app.get('/users/:id', async (req:Request, res:Response) => {
    try {
        const users = await getUsers();
        const {id} = req.params;

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({data: users[userIndex]})
    } catch (error) {
        console.log(error);
    }
});

app.post('/users', async (req:Request, res:Response) => {
    try {
        const users = await getUsers();
        const {error, value} = userSchema.validate(req.body);

        if (error) {
            return res.status(400).json({message: 'Validation failed'});
        }

        const newUser = {  id: nanoid(), ...value};
        users.push(newUser);
        fs.writeFile(usersPath, JSON.stringify(users, null, 2));
        res.status(201).json({message: 'User is created', user: newUser})
    } catch (error) {
        console.log(error);
    }
});

app.put('/users/:id', async (req:Request, res:Response) => {
    try {
        const users = await getUsers();
        const {id} = req.params;
        const {error, value} = userSchema.validate(req.body);

        if (error) {
            return res.status(400).json({message: 'Validation failed'});
        }

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({message: 'User not found'});
        }

        const updatedUser = {id, ...value};
        users[userIndex] = updatedUser;

        fs.writeFile(usersPath, JSON.stringify(users, null, 2));
        res.status(200).json({message: 'User is updated', user: updatedUser})
    } catch (error) {
        console.log(error);
    }
});

app.patch('/users/:id', async (req:Request, res:Response) => {
    try {
        const users = await getUsers();
        const {id} = req.params;
        const {error, value} = updateUserSchema.validate(req.body);

        if (error) {
            return res.status(400).json({message: 'Validation failed'});
        }

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({message: 'User not found'});
        }

        const currentUser = users[userIndex]
        console.log(currentUser)
        const updatedUser = {...currentUser, ...value};
        users[userIndex] = updatedUser;

        fs.writeFile(usersPath, JSON.stringify(users, null, 2));
        res.status(200).json({message: 'User is updated', user: updatedUser})

    } catch (error) {
        console.log(error);
    }
});

app.delete('/users/:id', async (req:Request, res:Response) => {
    try {
        const users = await getUsers();
        const {id} = req.params;

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({message: 'User not found'});
        }

        users.splice(userIndex, 1);

        fs.writeFile(usersPath, JSON.stringify(users, null, 2));
        res.status(200).json({message: `User id=${id} is deleted`})

    } catch (error) {
        console.log(error)
    }
});

app.use((req:Request, res:Response)=>{
    res.status(404).json({ message: 'Not found'})
});
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});
