const bcrypt = require("bcrypt");

module.exports.hashPassword = async ({password}) => {
    let hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}
module.exports.compareHashedPassword = async (password,dbPassword) => {
    let comparedPassword = await bcrypt.compare(password, dbPassword);
    return comparedPassword;
}