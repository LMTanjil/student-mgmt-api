import {User} from "../models/user.model.js";
import {hashPassword, comparePassword} from "../utils/hashPassword.js";
import {generateToken} from "../utils/generateToken.js";

export const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    try{
        if(!firstName || !lastName || !email || !password) {
            return res.status(400).send({error: "Please provide all required fields"});
        }
        const userExits = await User.findOne({email});
        if(userExits){
            return res.status(400).send({message: "User already exists"});
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        const token = generateToken(newUser._id);
        res.status(201).send({
            message: "User user created successfully",
            token,
            data: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            }
        })
        // console.log(newUser)
    }catch (e) {
        res.status(500).send({
            message: "Server Error",
            error: e.message
        });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({message: "Please provide all required fields"});
        }
        const user = await User.findOne({email});
        if(!user || user.length === 0){
            return res.status(400).json({message: "Incorrect email or password"});
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = generateToken(user._id)
        res.status(200).json({
            message: "User login successfully",
            token,
            data: {
                userName: user.firstName + " " + user.lastName,
                email: user.email
            }
        });
        // console.log(user);
    } catch (e) {
        res.status(500).send({
            message: "Server Error",
            error: e.message
        })
    }
}