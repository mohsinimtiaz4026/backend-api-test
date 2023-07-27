module.exports.userCreateSchemaErr = {
  code: 203,
  message: "Please provide all fields",
};

module.exports.userAlreadyRegisteredErr = {
  code: 203,
  message: "User already registered",
};

module.exports.internalServerErr = {
  code: 500,
  message: "Internal Server Error",
};
module.exports.wrongCredentials = {
  code: 404,
  message: "Invalid Credentials",
};
module.exports.userLoginSchemaErr = {
  code: 203,
  message: "Please provide all fields",
};
module.exports.allUsersSchemaErr = {
  code: 404,
  message: "Something Went Wrong!!!",
};
module.exports.noUsersSchemaErr = {
  code: 404,
  message: "No Users found!!!",
};
module.exports.noTokenErr = {
  code: 404,
  message: "There is not token attached with header!!!",
};