const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: ID
    findallcontacts: [Contact]!
    findallposts: [Poststruct]
    findallnotifications: [Notification]
    findallusers: [User]
    findallfeedbacks: [Feedback]
    findallreports: [Report]
  }

  type Contact {
    id: ID!
    name: String!
    phone: String!
    email: String!
    description: String!
  }
  type Feedback {
    id: ID!
    userid: String!
    username: String!
    feedback: String!
  }
  type Report {
    id: ID!
    postid: String
    userid: String
    username: String
  }
  type Notification {
    id: ID!
    header: String!
    description: String!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    tokenVersion: Int!
    phone: String!
    Posts: [Posttype]
    bookMarks: [Posttype]
  }
  type Posttype {
    postid: String
  }
  type Poststruct {
    id: ID
    userid: ID
    description: String
    title: String
    category: String
    physical: Boolean
    imageurl: String
    verified: Boolean
    location: locationtype
    reviews: [reviewtype]
    photos: [phototype]
  }
  type reviewtype {
    userid: String!
    username: String!
    rating: Int
    comment: String
  }
  type phototype {
    imgurl: String
  }
  type locationtype {
    latitude: Int
    longitude: Int
  }
  type LoginResponse {
    accessToken: String!
    userId: ID!
  }
  type Mutation {
    contactSubmit(
      name: String!
      phone: String!
      email: String!
      description: String
    ): Boolean!
    removeContact(id: ID): Boolean!
    create(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): LoginResponse
    revokeRefreshToken(userId: String!): Boolean!
    logout: Boolean!
    changePassword(
      userId: String!
      password: String!
      newpassword: String!
    ): Boolean!
    addNotification: Boolean!
    deletePost(id: String!): Boolean!
    verifyPost(id: String!): Boolean!
    
  }
`;
module.exports = { typeDefs };
