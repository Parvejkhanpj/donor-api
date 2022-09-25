const router = require("express").Router();
const Joi = require("joi");
const passwordComplexcity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

const { User } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    console.log("hello1");
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });
    console.log("hello3");

    if (!user)
      return res.status(401).send({ message: "Invaild Email And Password" });
    console.log("hello4");
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("hello5");
    if (!validatePassword)
      return res.status(401).send({ message: "Invalid Email And Password " });
    console.log("hello6");
    console.log(user);
    const token = user.generateAuthToken();
    console.log("hello8");
    res.status(200).send({ data: token, message: "Login Sucessfully" });
  } catch (error) {
    res.status(500).send({ message: "error from server" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: passwordComplexcity().required().label("Password"),
    cpassword: passwordComplexcity().label("cPassword"),
  });
  return schema.validate(data);
};
module.exports = router;
