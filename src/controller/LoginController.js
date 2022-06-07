const Router = require("express");
const User = require("../model/User");
const authService = require("../service/authService");

const sessionRouter = Router();

sessionRouter.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  try {
    await authService.loginValidate(user, req.body.password);

    let token = authService.createToken(user);
    res.status(200).json({
      auth: true,
      token,
      role: user.role,
      user: { nome: user.nome, email: user.email },
    });
  } catch (erro) {
    res.status(401).send({ auth: false, erro });
  }
});

sessionRouter.delete("/", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = sessionRouter;
