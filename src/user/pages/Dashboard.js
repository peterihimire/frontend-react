import React, { useEffect, useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./Dashboard.css";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  console.log(user);

  const getCurrentUser = () => {
    setIsLoading(true);
    fetch(`http://localhost:4000/api/admin/users/${auth.userId}`, {
      // fetch(`http://localhost:7000/api/admin/users/${pId}`, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
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
            setUser(loadedUser);
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
    //  THIS METHOD MAKES SURE THAT IF NO USER-ID THEN LOADING SPINNER ELSE THE METHOD WORKS, THE DEPENDENCY IS AUTH.USERID
    if (!auth.userId) {
      setIsLoading(true);
    }
    getCurrentUser();
  }, [auth.userId]);

  return (
    <div className="dashboard-div">
      <div className='center'>
        <h1>{user.name} This is your dashboard</h1>
      </div>

      <Card>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <h3>{user.id}</h3>
      </Card>
    </div>
  );
};

export default Dashboard;
