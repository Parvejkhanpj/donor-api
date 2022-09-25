const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/:id*?", (req, res, next) => {
  const filter = req.params.id ? { _id: req.params.id } : {};

  User.find(filter)
    .then((users) => res.json(users))
    .catch(next);
});

// router.post("/", (req, res, next) => {
//   User.create(req.body)
//     .then((user) => res.json(user))
//     .catch(next);
// });

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    //   validate error
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    //   validate user exist
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User Give Email Already Exiest" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //   new User
    await new User({ ...req.body, password: hashPassword }).save();
    console.log("hello 1");
    res.status(201).send({ message: "User created Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/:id", function (req, res, next) {
  User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (error, result) => res.json(result)
  ).catch(next);
});

router.delete("/:id", function (req, res, next) {
  User.findOneAndRemove({ _id: req.params.id })
    .then((user) => res.json(`User '${user.firstName}' was deleted correctly.`))
    .catch(next);
});

module.exports = router;
