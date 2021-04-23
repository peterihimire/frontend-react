import React, { useEffect } from "react";
import UserList from "../components/UserList";
// import pix from "../../assets/Lady-do-it.png";

const UsersPage = () => {
  // const USERS = [
  //   {
  //     id: "u1",
  //     name: "Peter Ihimire",
  //     email: "peterihimire@gmail.com",
  //     image: pix,
  //   },
  // ];
  const [users, setUsers] = React.useState();

  const getCurrentUser = () => {
    // setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/users/`, {
      // headers: {
      //   Authorization: "Bearer " + auth.token,
      // },
    })
      .then((response) => {
        response
          .json()
          .then((res) => {
            console.log(res);
            if (!response.ok) {
              throw new Error(res.msg);
            }
            // setIsLoading(false);
            console.log(res);
            console.log(res.users);
            const loadedUsers = res.users;
            setUsers(loadedUsers);
          })
          .catch((err) => {
            console.log(err);
            // console.log(typeof err);
            // setIsLoading(false);
            // setError(
            //   err.message || "You are not Authorized to view this page!"
            // );
          });
      })
      .catch((err) => {
        console.log(err);
        // setIsLoading(false);
        // setError(err.msg || "Error occured , please try again!");
      });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  console.log(users);
  return <>{users && <UserList items={users} />}</>;
};

export default UsersPage;
