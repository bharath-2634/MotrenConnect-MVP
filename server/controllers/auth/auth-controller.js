const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { OAuth2Client } = require("google-auth-library");

// Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_OAUTH);

const registerUser = async (req, res) => {
    try {
        const { userName, email, password, authType = "email", MCID } = req.body;

        console.log("Received Data", req.body);

        let userExists = await User.findOne({ email });
        console.log("After Check",userExists)
        if (userExists)
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        console.log("After Check",userExists)
        // Hash the password only if authType is email
        let hashPassword = null;
        if (authType === "email") {
            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: "Password is required for email authentication."
                });
            }
            hashPassword = await bcrypt.hash(password, 12);
        }

        console.log("after pass",req.body);
        // Generate MCID if not provided
        const generatedMCID = MCID || `MC-${Math.floor(100000 + Math.random() * 900000)}`;

        // Create new user
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
            authType,
            MCID: generatedMCID,
            profile : {
                envelope : [1],
                points : 10,
                crown : 1,
            }
        });

        console.log("newUser", newUser);

        await newUser.save();
        console.log("after Save");

        // Generate JWT Token
        const token = jwt.sign(
            {
                userName: newUser.userName,
                userId: newUser._id,
                email: newUser.email,
                role: newUser.role,
                MCID: newUser.MCID,
            },
            "CLIENT_SECRET_KEY",
            { expiresIn: "7d" }
        );

        res.cookie("token", token, { httpOnly: true, secure: false });

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            token,
            isAuthenticated : true,
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role,
                MCID: newUser.MCID,
            },
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};


// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("login",req.body);

        let checkUser = await User.findOne({ email });
        console.log(checkUser);
        if (!checkUser)
            return res.json({
                success: false,
                message: "You don't have an account in MC"
            });
        
        // Check Password
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        
        if (!checkPasswordMatch) {
            return res.json({
                success: false,
                message: "Incorrect password.",
            });
        }

        
        // Generate JWT Token
        const token = jwt.sign(
            {
                userId: checkUser._id,
                email: checkUser.email,
                role: checkUser.role,
                MCID: checkUser.MCID,
                userName : checkUser.userName
            },
            "CLIENT_SECRET_KEY",
            { expiresIn: "7d" }
        );

        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName,
                MCID: checkUser.MCID,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// ✅ Google Login
const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;
        console.log("token",token);

        if (!token) {
            return res.status(400).json({ success: false, message: "Token is required" });
        }

        // console.log("token",token);

        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "997407954891-15midcdg8c555ds9hrbd3emjbtam5pv5.apps.googleusercontent.com",
        });

        console.log("ticket",ticket);

        const payload = ticket.getPayload();
        // console.log("Google Payload:", payload);

        // Check if the user exists
        let user = await User.findOne({ email: payload.email });
        // console.log("user",user);
        if (!user) {
            // If the user doesn't exist, create a new one
            const MCID = `MC-${Math.floor(100000 + Math.random() * 900000)}`;

           user = new User({
                userName: payload.family_name,
                email : payload.email,
                avatar_url: payload.picture || "hello",
                authType: "google",
                MCID, 
                profile : {
                    envelope : [1],
                    points : 10,
                    crown : 1,
                }
            });
            await user.save();
        }

        console.log("user",user);

        const jwtToken = jwt.sign(
          {
              userName: payload.family_name || "",
              userId: user._id,
              email: user.email,
              role: user.role,
              MCID: user.MCID,
          },
          "CLIENT_SECRET_KEY",
          { expiresIn: "7d" }
      );

      res.cookie("token", jwtToken, { httpOnly: true, secure: false }).json({
        success: true,
        message: "Google login successful",
        token: jwtToken,
        isAuthenticated: true,
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
            MCID: user.MCID,
            avatar_url: user.avatar_url,
        },
    });
    
        // res.cookie("token", jwtToken, { httpOnly: true, secure: false }).json(
        //     { success: true, message: "Google login successful", user });

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token").json({
      success: true,
      message: "Logged out successfully!",
    });
};

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
  
    try {
      const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
};

const getUser = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }

    const user = await User.findById(userId); // ✅ returns single object

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
      message: "Found User!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
};

const updateUser = async (req,res) => {
    try {
        // const {id}  = req.params;
        const {user} = req.body;
        // console.log(user);
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User instance required",
            });
        }
        const userId = user._id;

        if(!userId) {
            console.log("No UserId found");
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {$set : user},
            {new : true}
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    }catch(error) {
        console.error(error.message);
        res.status(500).json({
        success: false,
        message: "Server Error!",
        });
    }
}
  

module.exports = { registerUser, loginUser, googleAuth , logoutUser , authMiddleware,getUser ,updateUser};
