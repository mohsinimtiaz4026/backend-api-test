// schemas
const { userSchemas } = require("../schemas/userSchema");
// services
const {
  findUserByEmail,
  createNewUser,
  findUserByEmailAndPassword,
  getUsers
} = require("../services/userServices");
// utils
const { sign } = require("../utils/jwtUtils");
// values
const {
  userCreateSchemaErr,
  userAlreadyRegisteredErr,
  internalServerErr,
  wrongCredentials,
  userLoginSchemaErr,
  allUsersSchemaErr,
  noUsersSchemaErr
} = require("../values/errors");
const {
  userCreatedSuccessfulyRes,
  loginSuccessfullyRes,
  getUsersSuccessfullyRes
} = require("../values/responses");

module.exports = {
  userRegister: async (req, res) => {
    try {
      const { body } = req;
      const { error } = userSchemas.validateCreateRequest({ body });

      if (error) {
        return res
          .status(userCreateSchemaErr.code)
          .json({ ...userCreateSchemaErr });
      } else {
        let { success } = await findUserByEmail({ body });
        if (success) {
          return res
            .status(userAlreadyRegisteredErr.code)
            .json({ ...userAlreadyRegisteredErr });
        }
        let {
          success: createSuccess,
          error,
          user,
        } = await createNewUser({ body });
        if (createSuccess) {
          const token = sign({ id: user._id, email: user.email });
          res.set({ ["x-auth-token"]: token });
          return res
            .status(userCreatedSuccessfulyRes.code)
            .json({ ...userCreatedSuccessfulyRes });
        } else {
          return res.status(400).json({ error });
        }
      }
    } catch (error) {
      return res.status(internalServerErr.code).json({ ...internalServerErr });
    }
  },
  userLogin: async (req, res) => {
    const { body } = req;
    try {
      const { error } = userSchemas.validateLoginRequest({ body });
      if (error) {
        return res
          .status(userLoginSchemaErr.code)
          .json({ ...userLoginSchemaErr });
      }
      const { email, password } = req.body;
      const { success, user } = await findUserByEmailAndPassword({
        email,
        password,
      });
      if (success) {
        const token = sign({ id: user._id, email: user.email });
        res.set({ ["x-auth-token"]: token });
        return res
          .status(loginSuccessfullyRes.code)
          .json({ ...loginSuccessfullyRes, user });
      } else {
        return res.status(wrongCredentials.code).json({ ...wrongCredentials });
      }
    } catch (error) {
      return res.status(internalServerErr.code).json({ ...internalServerErr });
    }
  },
  userProfile: async (req, res) => {},
  getAllUser: async (req,res) => {
    try {
      let { success, users } = await getUsers();
      if(success) {
        return res.status(getUsersSuccessfullyRes.code).json({...getUsersSuccessfullyRes, users});
      }else {
        return res.status(noUsersSchemaErr.code).json({...noUsersSchemaErr});
      }
    }catch(error) {
      console.log(error)
      return res.status(allUsersSchemaErr.code).json({...allUsersSchemaErr});
    }
  }
};
