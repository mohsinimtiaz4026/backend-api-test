// utils
const { decode,sign } = require("../utils/jwtUtils");
// values
const { noTokenErr } = require("../values/errors");

const refreshTokenMiddleware = async (req, res, next) => {
  let token;
  try {
    token = req.headers["x-auth-token"];
    const decodedToken = await decode(token);
    console.log(decodedToken);
    const newTokenValues = {
      id: decodedToken.id,
      email: decodedToken.email
    }
    if (decodedToken) {
        const token = sign({ ...newTokenValues });
        res.set({ ["x-auth-token"]: token });
        next();
    }
  } catch (error) {
    console.log(error)
    return res.status(noTokenErr.code).json({...noTokenErr});
  }
};

module.exports = refreshTokenMiddleware;
