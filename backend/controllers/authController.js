import {User} from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import apiResponse  from '../utils/apiResponse.js';

const generateToken = (userId) => {
    return jwt.sign ({id:userId}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN || "30d"});
}


export const registerUser = async (req, res) => {
    try{
        const {name, email, password, profileImageUrl} = 
            req.body;

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        if(!user){
            return res.status(500)
            .json(new apiResponse(false, "user not created", {}));
        }

        return res.status(201)
        .json(new apiResponse(true, "User registered successfully",user))
    }catch (err){
        return res
      .status(500)
      .json(new apiResponse(false, "Server error", {}, err.message));
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(500).json({message: "Invalid email or password"});
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(500).json({message: "server error"});
        }

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        };

        // return user data with jwt 
        return res.status(200)
        .json(new apiResponse(true,"user logged In", userData));

    } catch (err) {
        return res
      .status(500)
      .json(new apiResponse(false, "Server error", {}, err.message));
    }
}


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user._id).select('-password');

    if (!user) {
      return res
        .status(404)
        .json(new apiResponse(false, "User not found"));
    }

    return res
      .status(200)
      .json(new apiResponse(true, "User profile fetched successfully", user));
  } catch (err) {
    return res
      .status(500)
      .json(new apiResponse(false, "Server error", {}, err.message));
  }
};

