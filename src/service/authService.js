const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const VEXPIRATION_TOKEN = parseInt(process.env.EXPIRATION_TOKEN);
const BCRYPT_SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

async function encrypt(text) {
  return await bcrypt.hash(text, BCRYPT_SALT_ROUNDS);
}

async function compare(text, encryptedText) {
  return bcrypt.compare(text, encryptedText);
}

function createToken(user) {
  let payload = {
    id: user._id,
    email: user.email,
  };

  let token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: VEXPIRATION_TOKEN,
  });

  return token;
}

async function loginValidate(user, password) {
  if (!user) {
    throw "Não foi encontrado um usuário com o email informado!";
  } else if (!(await compare(password, user.password))) {
    throw "Senha inválida!";
  }
}

function isAuthenticated(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(401).send({
      auth: false,
      message: "Não foi encontrado o token no cabeçalho da requisição.",
    });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Token inválido.",
      });
    }

    User.findById(decoded.id, (err, user) => {
      req.session = user;
      next();
    });
  });
}

const hasRole = (role) => {
  return (req, res, next) => {
    if (req.session.role === role) {
      next();
    } else {
      return res.status(401).send({
        auth: false,
        message: "Você não tem autorização para acessar esse recurso",
      });
    }
  };
};

module.exports = {
  encrypt,
  compare,
  createToken,
  isAuthenticated,
  loginValidate,
  hasRole,
};
