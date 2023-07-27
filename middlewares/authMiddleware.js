const { verify } = require("../utils/jwtUtils");
// values
const { noTokenErr } = require("../values/errors");

const authMiddleware = async (req, res, next) => {
  let token;
  try {
    token = req.headers["x-auth-token"];
    const IsTokenVerfied = await verify(token);
    if (IsTokenVerfied) {
      next();
    }
  } catch (error) {
    return res.status(noTokenErr.code).json({...noTokenErr});
  }
};

module.exports = authMiddleware;
