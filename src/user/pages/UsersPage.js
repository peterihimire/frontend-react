import React from "react";
import UserList from "../components/UserList";
import pix from "../../assets/Lady-do-it.png";

const UsersPage = () => {
  const USERS = [
    {
      id: "u1",
      name: "Peter Ihimire",
      email: "peterihimire@gmail.com",
      image: pix,
    },
  ];

  return <UserList items={USERS} />;
};

export default UsersPage;
