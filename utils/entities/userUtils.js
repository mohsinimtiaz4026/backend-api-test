const omit = require("lodash/omit");

module.exports.cleanUserObject = ({ user }) => {
  const fieldsToOmit = ["_id", "__v", "password", "createdAt", "updatedAt"];
  return omit({
    id: user._id,
    ...omit(user.toJSON(), fieldsToOmit),
  });
};
module.exports.cleanUsersObjectArray = ({ users }) => {
  const fieldsToOmit = ["_id", "__v", "password", "createdAt", "updatedAt"];
  let cleanUsers = [];
  users.map((user) => {
    cleanUsers.push(
      omit({
        id: user._id,
        ...omit(user.toJSON(), fieldsToOmit),
      })
    );
  });
  return cleanUsers;
};
