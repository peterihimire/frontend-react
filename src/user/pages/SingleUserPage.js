import React, { useCallback, useState, useEffect, useContext } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import PropertyList from "../../properties/components/PropertyList";

const SingleUserPage = (props) => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const [userId, setUserId] = useState();
  const [loadedProperties, setLoadedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  console.log(props);
  console.log(userId);

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

  useEffect(() => {
    setUserId(props.match.params.userId);
  }, [props.match.params.userId]);

  const getProperties = useCallback(() => {
    setIsLoading(true);
    // This code solved the userId undefined error
    if (!userId || userId === "" || userId === undefined) {
      return setIsLoading(true);
    }
    fetch(`http://localhost:4000/api/admin/users/${userId}`, {
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
  }, [auth.token, userId]);

  useEffect(() => {
    //  THIS METHOD MAKES SURE THAT IF NO USER-ID THEN LOADING SPINNER ELSE THE METHOD WORKS, THE DEPENDENCY IS AUTH.USERID
    if (!userId || userId === "" || userId === undefined) {
      setIsLoading(true);
    }
    getProperties();
  }, [auth.token, getProperties, userId]);

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

export default SingleUserPage;
