const { verify } = require("jsonwebtoken");
require("dotenv").config();

const isAuth = {
  Query: {
    findallcontacts: async (resolve, parent, args, { req, res }, info) => {
      const authorization = req.headers["authorization"];

      if (!authorization) {
        res.status(400);
        throw new Error("not authenticated kjsdjklfjsadkljklkfsdk");
      }
      try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        console.log(payload);
      } catch (err) {
        res.status(400);
        throw new Error("not authenticated sakfsdklknksnkls");
      }

      return await resolve(parent, args, { req, res }, info);
    },
   me: async (resolve, parent, args, { req, res }, info) => {
      const authorization = req.headers["authorization"];

      if (!authorization) {
        res.status(400);
        throw new Error("not authenticated kjsdjklfjsadkljklkfsdk");
      }
      try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        console.log(payload);
      } catch (err) {
        res.status(400);
        throw new Error("not authenticated sakfsdklknksnkls");
      }

      return await resolve(parent, args, { req, res }, info);
    },
  },
};

module.exports = { isAuth };