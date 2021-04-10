import React, { useState, useEffect, useContext, useCallback } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import PropertyList from "../components/PropertyList";

const PropertiesPage = (props) => {
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

  // MAKE REQUEST FOR ALL PROPERTIES
  // const getProperties = () => {
  //   setIsLoading(true);
  //   fetch("http://localhost:4000/api/properties", {
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
  //           console.log(res.properties);
  //           const loadedProperties = res.properties;
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
  // }, []);


  const getProperties = useCallback(() => {
    setIsLoading(true);
    fetch(`http://localhost:4000/api/properties`, {
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
            console.log(res.properties);
            const loadedProperties = res.properties;
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
  }, [auth.token]);

  useEffect(() => {
    //  THIS METHOD MAKES SURE THAT IF NO USER-ID THEN LOADING SPINNER ELSE THE METHOD WORKS, THE DEPENDENCY IS AUTH.USERID
    if (!auth.token) {
      setIsLoading(true);
    }
    getProperties();
  }, [auth.token, getProperties,]);

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

export default PropertiesPage;

// import React from "react";
// import { useParams } from "react-router-dom";
// import property1 from "../../assets/property-1.jpg";
// import property2 from "../../assets/property-2.jpg";

// import PropertyList from "../components/PropertyList";

// const DUMMY_PROPERTIES = [
//   {
//     id: "p1",
//     name: "fully furnished 4-bedroom semi-detached duplex",
//     slug: "property-1",
//     description:
//       " Vasiti is the place where good people, who want to make an honest living should be. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qu  esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deser unt utvoluptate aute id deserunt nisi. Amet minim mollit non deseruntullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consequat sunt nostrud amet",
//     // images:
//     //   "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
//     images: property1,
//     location: "phase 2, lekki",
//     completion: "72",
//     amount: "50",
//   },
//   {
//     id: "p2",
//     name: "fully furnished 3-bedroom semi-detached duplex",
//     slug: "property-2",
//     description:
//       " Vasiti is the place where good people, who want to make an honest living should be. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qu  esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deser unt utvoluptate aute id deserunt nisi. Amet minim mollit non deseruntullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consequat sunt nostrud amet",
//     images: property2,
//     completion: 42,
//     amount: 55,
//   },
//   // {
//   //   id: 'p2',
//   //   title: 'Emp. State Building',
//   //   description: 'One of the most famous sky scrapers in the world!',
//   //   imageUrl:
//   //     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//   //   address: '20 W 34th St, New York, NY 10001',
//   //   location: {
//   //     lat: 40.7484405,
//   //     lng: -73.9878584
//   //   },
//   //   creator: 'u2'
//   // }
// ];

// const PropertiesPage = () => {
//   // const userId = useParams().userId;
//   // const loadedProperties = DUMMY_PROPERTIES.filter(place => place.creator === userId);
//   const loadedProperties = DUMMY_PROPERTIES;

//   return <PropertyList items={loadedProperties} />;
// };

// export default PropertiesPage;

// HOW TO LOAD FROM SERVER
// .then((response) => {
//   return response.json();
// })
// .then((response) => {
//   setIsLoading(false);
//   console.log(response.properties);
//   const loadedProperties = response.properties;
//   console.log(loadedProperties);
//   return loadedProperties;
// })
// .then((response) => {
//   console.log(response);
//   setProperties(response);
// })
// .catch((err) => {
//   console.log(err);
//   setIsLoading(false);
//   setError(err.msg || 'Something went wrong!');
// });
