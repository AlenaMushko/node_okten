"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const nanoid_1 = require("nanoid");
const path_1 = __importDefault(require("path"));
const usersValidation_1 = require("./validations/usersValidation");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = 5005;
const usersPath = path_1.default.join(__dirname, "users.json");
async function getUsers() {
    try {
        const data = await promises_1.default.readFile(usersPath, "utf8");
        return JSON.parse(data);
    }
    catch (err) {
        console.error("An error occurred:", err);
    }
}
app.get("/users", async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
    }
});
app.get("/users/:id", async (req, res) => {
    try {
        const users = await getUsers();
        const { id } = req.params;
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: users[userIndex] });
    }
    catch (error) {
        console.log(error);
    }
});
app.post("/users", async (req, res) => {
    try {
        const users = await getUsers();
        const { error, value } = usersValidation_1.userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed" });
        }
        const newUser = { id: (0, nanoid_1.nanoid)(), ...value };
        users.push(newUser);
        promises_1.default.writeFile(usersPath, JSON.stringify(users, null, 2));
        res.status(201).json({ message: "User is created", user: newUser });
    }
    catch (error) {
        console.log(error);
    }
});
app.put("/users/:id", async (req, res) => {
    try {
        const users = await getUsers();
        const { id } = req.params;
        const { error, value } = usersValidation_1.userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed" });
        }
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = { id, ...value };
        users[userIndex] = updatedUser;
        promises_1.default.writeFile(usersPath, JSON.stringify(users, null, 2));
        res.status(200).json({ message: "User is updated", user: updatedUser });
    }
    catch (error) {
        console.log(error);
    }
});
app.patch("/users/:id", async (req, res) => {
    try {
        const users = await getUsers();
        const { id } = req.params;
        const { error, value } = usersValidation_1.updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed" });
        }
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }
        const currentUser = users[userIndex];
        console.log(currentUser);
        const updatedUser = { ...currentUser, ...value };
        users[userIndex] = updatedUser;
        promises_1.default.writeFile(usersPath, JSON.stringify(users, null, 2));
        res.status(200).json({ message: "User is updated", user: updatedUser });
    }
    catch (error) {
        console.log(error);
    }
});
app.delete("/users/:id", async (req, res) => {
    try {
        const users = await getUsers();
        const { id } = req.params;
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }
        users.splice(userIndex, 1);
        promises_1.default.writeFile(usersPath, JSON.stringify(users, null, 2));
        res.status(200).json({ message: `User id=${id} is deleted` });
    }
    catch (error) {
        console.log(error);
    }
});
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
