const { Validator } = require("node-input-validator");
const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const v = new Validator(req.body, {
    email: "required|email",
    password: "required"
  });
  v.check().then(async (matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
      return;
    }

    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      res.status(400).json({ message: "User already exist" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    })
    res.json({ message: "Success" })
  });
};

const login = async (req, res) => {
  const { email, password } = req.body
  const findUser = await UserModel.findOne({ email })
  if (!findUser) {
    res.status(400).json({ message: "User not does not exist" })
    return
  }

  const hashedPassword = findUser.password
  const userId = findUser._id

  try {
    const result = await bcrypt.compare(password, hashedPassword)
    if (!result) {
      console.log('here 3');
      res.status(400).json({ message: "User not found" })
      return
    }

    let token = generateToken({userId})
    res.json({ token })

  }
  catch (error) {
    res.status(400).json({ error })
  }
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.KEY_SECRET, { expiresIn: '2h' })
}

module.exports = { register, login };
