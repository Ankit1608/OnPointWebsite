const {
  Users,
  Contacts,
  Admin,
  Report,
  Feedback,
  Posts,
  Notification,
} = require("./models/User");
const { hash, compare } = require("bcryptjs");
const { createAccessToken, createRefeshToken } = require("./auth");
const { sendRefreshToken } = require("./sendRefreshToken");
const { getcurrUser, setCurrUser } = require("./currUser");

const resolvers = {
  Query: {
    me: () => getcurrUser(),
    findallcontacts: () => Contacts.find(),
    findallreports: () => Report.find(),
    findallfeedbacks: () => Feedback.find(),
    findallposts: () => Posts.find(),
    findallnotifications: () => Notification.find(),
    findallusers: () => Users.find(),
  },
  Mutation: {
    removeContact: async (_, { id }) => {
      const cont = Contacts.findById(id);
      if (!cont) throw new Error("contact not found");
      try {
        await Contacts.findByIdAndDelete(id);
      } catch (err) {
        return false;
      }
      return true;
    },
    contactSubmit: async (_, { name, phone, email, description }) => {
      const NewEntry = new Contacts({ name, phone, email, description });
      try {
        await NewEntry.save();
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    create: async (_, { email, password }) => {
      const hashedPassword = await hash(password, 12);
      const admin = new Admin({ email, password: hashedPassword });
      try {
        await admin.save();
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },

    login: async (_, { email, password }, { res }) => {
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        throw new Error("could not find the user");
      }
      const valid = await compare(password, admin.password);
      if (!valid) {
        throw new Error("bad password");
      }
      //login succesfull
      setCurrUser(admin.id);
      sendRefreshToken(res, createRefeshToken(admin));
      return { accessToken: createAccessToken(admin), userId: admin.id };
    },
    logout: async (_, {}, { res }) => {
      sendRefreshToken(res, " ");
      return true;
    },

    revokeRefreshToken: async (_, { userId }) => {
      const User = await Users.findByIdAndUpdate(userId, {
        $inc: { tokenVersion: 1 },
      });
      if (!User) {
        throw new Error("could not find the user");
      }
      return true;
    },
    changePassword: async (_, { userId, password, newpassword }) => {
      const admin = await Admin.findById(userId);
      if (!admin) {
        throw new Error("could not find the user");
      }
      const valid = await compare(password, admin.password);
      if (!valid) {
        throw new Error("bad password");
      }
      const hashedPassword = await hash(newpassword, 12);
      try {
        await Admin.findByIdAndUpdate(userId, {
          $set: {
            password: hashedPassword,
          },
        });
      } catch (e) {
        throw new Error("something went wrong. please try again");
      }
      return true;
    },
    addNotification: async (_, { header, description }) => {
      const not = new Notification({ header, description });
      try {
        await not.save();
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    deletePost: async (_, { id }) => {
      const cont = Posts.findById(id);
      if (!cont) throw new Error("post not found");
      try {
        await Posts.findByIdAndDelete(id);
      } catch (err) {
        return false;
      }
      return true;
    },
    verifyPost: async (_, { id }) => {
      const post = await Posts.findById(id);
      if (!post) {
        throw new Error("could not find the post");
      }
      try {
        await Posts.findByIdAndUpdate(id, {
          $set: {
            verified: true,
          },
        });
      } catch (e) {
        throw new Error("something went wrong. please try again");
      }
      return true;
    },
  },
};
module.exports = { resolvers };
// $inc: { tokenVersion: 1 }
// const User = await Users.findOneAndUpdate(
//   { id: userId },
//   { email: "boob@boob.com" },
//   { new: true, useFindAndModify: false },
//   (err, data) => {
//     if (err) console.log(err);
//     if (data) console.log(data);
//   }
// );
// if (!User) return false;
// return true;
