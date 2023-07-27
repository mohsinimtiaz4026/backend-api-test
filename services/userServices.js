const User = require("../models/User");
// utils
const {
  hashPassword,
  compareHashedPassword,
} = require("../utils/passwordUtils");
// entities
const {
  cleanUserObject,
  cleanUsersObjectArray,
} = require("../utils/entities/userUtils");

module.exports = {
  findUserByEmail: async ({ body: { email } }) => {
    try {
      let user = await User.findOne({ email });
      if (user) {
        return {
          success: true,
          user,
        };
      } else {
        return {
          success: false,
          user,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  createNewUser: async ({ body: { fullname, email, password } }) => {
    try {
      const hashedPassword = await hashPassword({ password });
      const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
      });
      await user.save();
      if (user) {
        return {
          success: true,
          user,
        };
      } else {
        return {
          success: false,
          user,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  findUserByEmailAndPassword: async ({ email, password }) => {
    try {
      let findUser = await User.findOne({ email });
      if (findUser) {
        let matchedPassword = await compareHashedPassword(
          password,
          findUser.password
        );
        if (matchedPassword) {
          return {
            success: true,
            user: cleanUserObject({ user: findUser }),
          };
        }
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  getUsers: async () => {
    try {
      let allUsers = await User.find({});
      if (allUsers) {
        return {
          success: true,
          users: cleanUsersObjectArray({ users: allUsers }),
        };
      } else {
        return {
          success: false,
          users: [],
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
};
