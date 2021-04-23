import React, { useState, useEffect, useContext, useCallback } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import PropertyList from "../../properties/components/PropertyList";

const UsersPropertiesPage = (props) => {
  const auth = useContext(AuthContext);
  console.log(auth);

  const [loadedProperties, setLoadedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  getCurrentUser();
  console.log(getCurrentUser());
  let user = getCurrentUser();
  console.log(user);

  // REMOVES THE ERROR MODAL
  const errorModalHandler = () => {
    setError("");
  };

  // DELETE PROPERTY METHOD
  const propertyDeleteHandler = (deletePropertyId) => {
    setLoadedProperties((prevProperties) =>
      prevProperties.filter((property) => {
        return property.id !== deletePropertyId;
      })
    );
  };

  // // MAKE REQUEST FOR ALL PROPERTIES
  // const getProperties = () => {
  //   setIsLoading(true);
  //   fetch(`http://localhost:4000/api/admin/users/${auth.userId}`, {
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
  //           setIsLoading(false);
  //           console.log(res);
  //           console.log(res.user.properties);
  //           const loadedProperties = res.user.properties;
  //           setLoadedProperties(loadedProperties);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           console.log(typeof err);
  //           setIsLoading(false);
  //           setError(
  //             err.message || "You are not Authorized to view this page!"
  //           );
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //       setError(err.msg || "Error occured , please try again!");
  //     });
  // };

  // useEffect(() => {
  //   // // MEMORY LEAK ISSUES HERE
  //   // getProperties();
  //   // MEMORY LEAK ISSUES HERE
  //   let isMounted = true;
  //   if (isMounted) {
  //     getProperties();
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [getProperties]);

  const getProperties = useCallback(() => {
    // setIsLoading(true);
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
            // setIsLoading(false);
            console.log(res);
            console.log(res.user.properties);
            const loadedProperties = res.user.properties;
            setLoadedProperties(loadedProperties);
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
      // setIsLoading(true);
    }
    getProperties();
  }, [auth.token, getProperties]);

  return (
    <>
      <ErrorModal error={error} onClear={errorModalHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <PropertyList
        items={loadedProperties}
        onDeleteProperty={propertyDeleteHandler}
      />
    </>
  );
};

export default UsersPropertiesPage;
