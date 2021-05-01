import React, { useEffect, useState, useContext, useCallback } from "react";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./Dashboard.css";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  const [error, setError] = useState();

  console.log(user);

  // const getCurrentUser = () => {
  //   setIsLoading(true);
  //   fetch(`http://localhost:4000/api/admin/users/${auth.userId}`, {
  //     // fetch(`http://localhost:7000/api/admin/users/${pId}`, {
  //     headers: {
  //       Authorization: "Bearer " + auth.token,
  //     },
  //   })
  //     .then((response) => {
  //       response
  //         .json()
  //         .then((res) => {
  //           console.log(res);
  //           if (!response.ok) {
  //             throw new Error(res.msg);
  //           }
  //           // setIsLoading(false);
  //           console.log(res);
  //           console.log(res.user);
  //           const loadedUser = res.user;
  //           setUser(loadedUser);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           // console.log(typeof err);
  //           // setIsLoading(false);
  //           // setError(
  //           //   err.message || "You are not Authorized to view this page!"
  //           // );
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // setIsLoading(false);
  //       // setError(err.msg || "Error occured , please try again!");
  //     });
  // };

  // useEffect(() => {
  //   //  THIS METHOD MAKES SURE THAT IF NO USER-ID THEN LOADING SPINNER ELSE THE METHOD WORKS, THE DEPENDENCY IS AUTH.USERID
  //   if (!auth.userId) {
  //     setIsLoading(true);
  //   }
  //   getCurrentUser();
  // }, [auth.userId]);

  const getCurrentUser = useCallback(() => {
    setIsLoading(true);
    if (!auth.userId || auth.userId === "" || auth.userId === undefined) {
      return setIsLoading(true);
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/users/${auth.userId}`, {
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
            setIsLoading(false);
            console.log(res);
            console.log(res.user);
            const loadedUser = res.user;
            setUser(loadedUser);
          })
          .catch((err) => {
            console.log(err);
            // console.log(typeof err);
            setIsLoading(false);
            setError(
              err.message || "You are not Authorized to view this page!"
            );
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err.msg || "Error occured , please try again!");
      });
  }, [auth.token, auth.userId]);

  useEffect(() => {
    //  THIS METHOD MAKES SURE THAT IF NO USER-ID THEN LOADING SPINNER ELSE THE METHOD WORKS, THE DEPENDENCY IS AUTH.USERID
    if (!auth.token) {
      setIsLoading(true);
    }
    getCurrentUser();
  }, [auth.token, getCurrentUser]);

  // REMOVES THE ERROR MODAL
  const errorModalHandler = () => {
    setError("");
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorModalHandler} />
      <div className="dashboard-div">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="center">
          <h1>{user.name} This is your dashboard</h1>
        </div>
        {user.image && (
          <Card>
            <Link to={`/update-user/${auth.userId}`}>
              <div className="dashboard-user-card">
                <div className="dashboard-img">
                  <img
                    src={`${process.env.REACT_APP_ASSET_URL}/${user.image}`}
                    alt="prof-icon"
                  />
                </div>
                <div className="dashboard-user-text">
                  <h1>{user.name}</h1>
                  <h2>{user.email}</h2>
                  <h3>{user.id}</h3>
                </div>
              </div>
            </Link>
          </Card>
        )}
      </div>
    </>
  );
};

export default Dashboard;
