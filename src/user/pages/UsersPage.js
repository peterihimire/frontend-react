import React, {useEffect} from "react";
import UserList from "../components/UserList";
import pix from "../../assets/Lady-do-it.png";

const UsersPage = () => {
  // const USERS = [
  //   {
  //     id: "u1",
  //     name: "Peter Ihimire",
  //     email: "peterihimire@gmail.com",
  //     image: pix,
  //   },
  // ];

  const getCurrentUser = () => {
    // setIsLoading(true);
    fetch(`http://localhost:4000/api/admin/users/`, {
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
            console.log(res.user);
            const loadedUser = res.user;
            // setUser(loadedUser);
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

  return <UserList items='' />;
};

export default UsersPage;
