const Router = require("express");
const User = require("../model/User");
const auth = require("../service/authService");

const userRouter = Router();

userRouter.get(
  "/",
  auth.isAuthenticated,
  auth.hasRole("user"),
  async (req, res) => {
    res.json(await User.find());
  }
);

userRouter.get("/:id", auth.isAuthenticated, findById, async (req, res) => {
  res.json(req.User);
});

userRouter.post("/", async (req, res) => {
  const data = req.body;
  data.password = await auth.encrypt(data.password);

  try {
    const newUser = await new User(data).save();
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

userRouter.delete(
  "/:id",
  auth.isAuthenticated,
  auth.hasRole("admin"),
  findById,
  async (req, res) => {
    await req.User.remove();
    res.status(200).json({
      message: "Usuário removido com sucesso.",
    });
  }
);

userRouter.put("/:id", auth.isAuthenticated, findById, async (req, res) => {
  if (req.session.role === "admin" || req.session._id === req.params.id) {
    let User = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Usuário alterado com sucesso.",
      User,
    });
  } else {
    res.status(403).send({
      auth: false,
      message: "Você não tem autorização para alterar esse User",
    });
  }
});

async function findById(req, res, next) {
  try {
    req.User = await User.findById(req.params.id);

    if (req.User === null) {
      return res.status(404).json({
        message: "Nao foi possivel encontrar um usuário com o id informado",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
}

module.exports = userRouter;
