require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

module.exports.register = async (req, res, next) => {
  const { username, password, confirmPassword, email } = req.body;
  try {
    //validation
    if (!(username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("password not match");
    }
    const hased = await bcrypt.hash(password, 8);
    console.log(hased);

    const data = {
      username,
      password: hased,
      email,
    };
    //                                db  / const db
    const rs = await db.user.create({ data: data });
    console.log(rs);

    res.json({ message: "Register SUCCESSFUL!!!" });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // validation
    if (!(username.trim() && password.trim())) {
      throw new Error("Please Enter your input");
    }
    //find username in db.user
    const user = await db.user.findFirstOrThrow({ where: { username: username } });

    //check password
    const pwOK = await bcrypt.compare(password, user.password);
    if (!pwOK) {
      throw new Error("Invaild login");
    }

    //issue jwt token
    const payload = { id: user.user_id };
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
  
    });
    // console.log(payload)
    console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.GETME = (req,res,next) => {
  res.json( req.user)
}
