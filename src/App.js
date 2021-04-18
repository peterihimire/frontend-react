import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import HomePage from "./properties/pages/HomePage";
import PropertiesPage from "./properties/pages/PropertiesPage";
import UpdatePropertiesPage from "./properties/pages/UpdatePropertiesPage";
// import UpdateImage from "./properties/pages/UpdateImagePage";
import NewProperty from "./properties/pages/NewPropertyPage";
import UsersPage from "./user/pages/UsersPage";
import SingleUser from "./user/pages/SingleUserPage";
import PropertyDescription from "./properties/pages/PropertyDescriptionPage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import Auth from "./user/pages/Auth";
import LoginPage from "./user/pages/LoginPage";
import SignupPage from "./user/pages/SignupPage";
import Dashboard from "./user/pages/Dashboard";
import UsersPropertiesPage from "./user/pages/UsersPropertiesPage";
import { AuthContext } from "./shared/context/auth-context";
import UpdateImagePage from "./properties/pages/UpdateImagePage";
import UsersUpdatePage from "./user/pages/UsersUpdatePage";

let logoutTimer;

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState();

  const login = useCallback((uid, token, admin, expirationDate) => {
    // setIsLoggedIn(true);
    setToken(token);
    setUserId(uid);
    setAdmin(admin);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpiration(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        admin: admin,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    setAdmin(null);
    setTokenExpiration(null);
    // LOGS USER OUT AND CLEARS DATA
    localStorage.removeItem("userData");
  }, []);

  // IF TOKEN CHANGES, CAUSE IT IS A DEPENDENCY, THEN WE WILL WORK WITH OUR TIMER
  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  // MAKES SURE WHEN PAGE RELOADS THE USER IS LOGGED IN
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      storedData.admin &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.admin,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;

  // if (isLoggedIn) {
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/properties" exact>
          <PropertiesPage />
        </Route>
        <Route path="/property/new">
          <NewProperty />
        </Route>
        <Route
          path="/properties/:propertyId"
          exact
          component={UpdatePropertiesPage}
        />
        <Route
          path="/update-image/:propertyId"
          exact
          component={UpdateImagePage}
        />
        <Route path="/profile" exact component={Dashboard} />
        <Route
          path="/properties/detail/:id"
          exact
          component={PropertyDescription}
        />
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Route path="/users/properties/:userId" exact>
          <UsersPropertiesPage />
        </Route>
        <Route path="/users/:userId" exact component={SingleUser} />
        <Route path="/update-user/:userId" exact component={UsersUpdatePage} />

        {/* <Route></Route> */}
        <Redirect to="/profile" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        {/* <Route path="/" exact>
          <HomePage />
        </Route> */}
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        // isLoggedIn: isLoggedIn,
        isLoggedIn: !!token, // The double BANG [!!] returns true else it returns false
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        admin: admin,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
//
//
//
//
//
//
//

// import React, { useState, useCallback } from "react";
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Redirect,
//   Switch,
// } from "react-router-dom";
// import HomePage from "./properties/pages/HomePage";
// import PropertiesPage from "./properties/pages/PropertiesPage";
// import UpdatePropertiesPage from "./properties/pages/UpdatePropertiesPage";
// import NewProperty from "./properties/pages/NewPropertyPage";
// import UsersPage from "./user/pages/UsersPage";
// import SingleUser from "./user/pages/SingleUserPage";
// import PropertyDescription from "./properties/pages/PropertyDescriptionPage";
// import MainNavigation from "./shared/components/Navigation/MainNavigation";
// // import Auth from "./user/pages/Auth";
// import LoginPage from "./user/pages/LoginPage";
// import SignupPage from "./user/pages/SignupPage";
// import { AuthContext } from "./shared/context/auth-context";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState();

//   const login = useCallback(() => {
//     setIsLoggedIn(true);
//   }, []);

//   const logout = useCallback(() => {
//     setIsLoggedIn(false);
//   }, []);

//   let routes;

//   if (isLoggedIn) {
//     routes = (
//       <Switch>
//         <Route path="/" exact>
//           <HomePage />
//         </Route>
//         <Route path="/properties" exact>
//           <PropertiesPage />
//         </Route>
//         <Route path="/properties/new">
//           <NewProperty />
//         </Route>
//         <Route
//           path="/properties/:propertyId"
//           exact
//           component={UpdatePropertiesPage}
//         />
//         <Route
//           path="/properties/description/:slug"
//           exact
//           component={PropertyDescription}
//         />
//         <Route path="/users">
//           <UsersPage />
//         </Route>
//         <Route path="/users/:userId">
//           <SingleUser />
//         </Route>
//         {/* <Route></Route> */}
//         <Redirect to="/properties" />
//       </Switch>
//     );
//   } else {
//     routes = (
//       <Switch>
//         <Route path="/" exact>
//           <HomePage />
//         </Route>
//         <Route path="/login" component={LoginPage} />
//         <Route path="/signup" component={SignupPage} />
//         <Redirect to="/login" />
//       </Switch>
//     );
//   }
//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: isLoggedIn,
//         login: login,
//         logout: logout,
//       }}
//     >
//       <Router>
//         <MainNavigation />
//         <main>{routes}</main>
//       </Router>
//     </AuthContext.Provider>
//   );
// }

// export default App;

//
//
//
//
//
//
//
//
// import React, { useState, useCallback } from "react";
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Redirect,
//   Switch,
// } from "react-router-dom";
// import HomePage from "./properties/pages/HomePage";
// import PropertiesPage from "./properties/pages/PropertiesPage";
// import UpdatePropertiesPage from "./properties/pages/UpdatePropertiesPage";
// import NewProperty from "./properties/pages/NewPropertyPage";
// import UsersPage from "./user/pages/UsersPage";
// import SingleUser from "./user/pages/SingleUserPage";
// import PropertyDescription from "./properties/pages/PropertyDescriptionPage";
// import MainNavigation from "./shared/components/Navigation/MainNavigation";
// // import Auth from "./user/pages/Auth";
// import LoginPage from "./user/pages/LoginPage";
// import SignupPage from "./user/pages/SignupPage";
// import { AuthContext } from "./shared/context/auth-context";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = useCallback(() => {
//     setIsLoggedIn(true);
//   }, []);

//   const logout = useCallback(() => {
//     setIsLoggedIn(false);
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: isLoggedIn,
//         login: login,
//         logout: logout,
//       }}
//     >
//       <Router>
//         <MainNavigation />
//         <main>
//           <Switch>
//             <Route path="/" exact>
//               <HomePage />
//             </Route>
//             <Route path="/properties" exact>
//               <PropertiesPage />
//             </Route>
//             <Route path="/properties/new">
//               <NewProperty />
//             </Route>
//             <Route
//               path="/properties/:propertyId"
//               exact
//               component={UpdatePropertiesPage}
//             />
//             <Route
//               path="/properties/description/:slug"
//               exact
//               component={PropertyDescription}
//             />
//             <Route path="/users">
//               <UsersPage />
//             </Route>
//             <Route path="/users/:userId">
//               <SingleUser />
//             </Route>
//             {/* <Route path="/auth" component={Auth} /> */}
//             <Route path="/login" component={LoginPage} />
//             <Route path="/signup" component={SignupPage} />
//             <Redirect to="/" />
//           </Switch>
//         </main>
//       </Router>
//     </AuthContext.Provider>
//   );
// }

// export default App;
