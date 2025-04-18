const usermodel = require("../models/usersModel");
const bcrypt = require("bcrypt");
// const cloudinaryUtil = require("../util/Cloudinary");
const mailUtil = require("../util/MailUtil");
const jwt = require("jsonwebtoken");
var secret = "secret";

const addUser = async (req, res) => {
  try {
    const user = await usermodel.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      data: err,
    });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const founduserfromemail = await usermodel.findOne({ email: email });

    if (founduserfromemail != null) {
      const isPasswordValid = bcrypt.compareSync(password, founduserfromemail.password); // Compare hashed password
      if (isPasswordValid) {
        res.status(200).json({
          message: "User found successfully",
          data: founduserfromemail,
        });


      } else {
        res.status(404).json({
          message: "Invalid password",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error during login",
      data: err,
    });
  }
};


const loginuserWithToken = async (req, res) => {
  const password = req.body.password;
  const foundUserFromEmail = await usermodel.findOne({ email: req.body.email });
  if (foundUserFromEmail) {
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    if (isMatch) {
      const token = jwt.sign(foundUserFromEmail.toObject(), secret);

      res.status(200).json({
        message: "User found successfully",
        data: foundUserFromEmail,
        token: token, // return the token
      });
    } else {
      res.status(420).json({
        message: "invalid cred...",
      });
    }
  } else {
    res.status(404).json({
      message: "user not found..",
    });
  }
};

// const signup = async (req, res) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hashedpassword = bcrypt.hashSync(req.body.password, salt); // Corrected order
//     req.body.password = hashedpassword;

//     const usercreated = await usermodel.create(req.body);
//     await mailUtil.sendingMail(
//       usercreated.email,
//       "Welcome to E-Advertisement",
//       "This is a welcome email."
//     );
    
    
    
//     res.status(201).json({
//       message: "User registered successfully",
//       data: usercreated,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Error during signup",
//       data: err,
//     });
//   }
// };

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedpassword;

    const usercreated = await usermodel.create(req.body);

    // await mailUtil.sendingmail(
    //   usercreated.email,
    //   "Welcome to E-Advertisement",
    //   "This is a welcome email."
    // );

    res.status(201).json({
      message: "User registered successfully",
      data: usercreated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error during signup",
      data: err,
    });
  }
};



const addFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    } else {

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      console.log(cloundinaryResponse);
      console.log(req.body);

      req.body.hordingURL = cloundinaryResponse.secure_url;
      const savedHording = await hordingModel.create(req.body);

      res.status(200).json({
        message: "hording saved successfully",
        data: savedHording,
      });
    }
  });
};

const getAllUser = async (req, res) => {
  try {
    const allusers = await usermodel.find().populate("roleId");
    res.status(200).json({
      message: "Users retrieved successfully",
      data: allusers,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving users",
      data: err,
    });
  }
};

const finduserbyid = async (req, res) => {
  try {
    const userbyid = await usermodel.findById(req.params.id);
    res.status(200).json({
      message: "User retrieved successfully",
      data: userbyid,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error retrieving user",
      data: e,
    });
  }
};

const resetpassword = async (req, res) => {
  const token = req.body.token; //decode --> email | id
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  //object -->email,id..
  //password encrypt...
  const salt = bcrypt.genSaltSync(10);
  const hashedPasseord = bcrypt.hashSync(newPassword,salt);

  const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPasseord,
  });
  res.json({
    message: "password updated successfully..",
  });
};

module.exports = {
  login,
  signup,
  getAllUser,
  finduserbyid,
  addUser,
  addFile,
  loginuserWithToken,
  resetpassword
};