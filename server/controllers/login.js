import { User } from "../models/userModel.js"

const newUser = async (req,res) => {
    const { name,username,password,bio } = req.body;
    const avatar = {
        public_id: "asdfg",
        url: "asdfg"
    };

    await User.create({
        name: name,
        username: username,
        password: password,
        bio: bio,
        avatar: avatar
    });

    res.status(201).json({ message: "User created suucessfully!"});
}

const login = (req,res) => {
    res.send("Hello!");
}

export {login, newUser};