const jwt = require("jsonwebtoken");

module.exports.sign = (obj) => {
    const token = jwt.sign(obj,"mohsinimtiaz4026",{expiresIn: '1d'});
    return token;
}
module.exports.verify = (token) => {
    const decodedToken = jwt.verify(token,"mohsinimtiaz4026");
    return decodedToken;
}
module.exports.decode = (token) => {
    const decodedToken = jwt.decode(token,"mohsinimtiaz4026");
    return decodedToken;
}