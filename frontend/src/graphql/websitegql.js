import { gql } from "@apollo/client";

const me = gql`
  query {
    me
  }
`;
const contactsubmit = gql`
  mutation (
    $name: String!
    $phone: String!
    $email: String!
    $description: String
  ) {
    contactSubmit(
      name: $name
      email: $email
      phone: $phone
      description: $description
    )
  }
`;
const login = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;
const logout = gql`
  mutation {
    logout
  }
`;
const findallcontacts = gql`
  query {
    findallcontacts {
      id
      name
      phone
      email
      description
    }
  }
`;
const removeContact = gql`
  mutation ($id: ID!) {
    removeContact(id: $id)
  }
`;
const findallusers = gql`
  query {
    findallusers {
      id
      name
      email
      password
      tokenVersion
      phone
    }
  }
`;
const revokeRefreshToken = gql`
  mutation ($userId: String) {
    revokeRefreshToken(userId: $userId)
  }
`;
const findallposts = gql`
  query {
    findallposts {
      id
      userid
      title
      description
      category
      physical
      imageurl
      verified
    }
  }
`;
const deletePost = gql`
  mutation ($id: String!) {
    deletePost(id: $id)
  }
`;
const verifyPost = gql`
  mutation ($id: String!) {
    verifyPost(id: $id)
  }
`;
const findallfeedbacks = gql`
  query {
    findallfeedbacks {
      id
      userid
      username
      feedback
    }
  }
`;
const findallreports = gql`
  query {
    findallreports {
      id
      userid
      username
      postid
    }
  }
`;
const changePassword = gql`
  mutation ($userId: String!, $password: String!, $newpassword: String!) {
    changePassword(
      userId: $userId
      password: $password
      newpassword: $newpassword
    )
  }
`;
export {
  me,
  contactsubmit,
  login,
  findallcontacts,
  logout,
  removeContact,
  findallusers,
  findallposts,
  revokeRefreshToken,
  deletePost,
  verifyPost,
  findallfeedbacks,
  findallreports,
  changePassword,
};
