import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <ul className="nav-links">
      {/* <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li> */}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/profile" exact>
            Profile
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/properties" exact>
            Properties
          </NavLink>
        </li>
      )}
      {/* only displayed for admins */}
      {auth.isLoggedIn && auth.admin && (
        <li>
          <NavLink to="/properties/new" exact>
            Add Properties
          </NavLink>
        </li>
      )}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
      )} */}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/signup">Get Started</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;

// IMPLEMENTING WHICH LINKS TO DISPLAY BASED ON AUTHENTICATED AND UN-AUTHENTICATED

// import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";
// import { AuthContext } from "../../context/auth-context";

// import "./NavLinks.css";

// const NavLinks = (props) => {
//   const auth = useContext(AuthContext);
//   return (
//     <ul className="nav-links">
//       <li>
//         <NavLink to="/" exact>
//           Home
//         </NavLink>
//       </li>
//       {auth.isLoggedIn && (
//         <li>
//           <NavLink to="/properties" exact>
//             Properties
//           </NavLink>
//         </li>
//       )}
//       {auth.isLoggedIn && (
//         <li>
//           <NavLink to="/properties/new" exact>
//             Add Properties
//           </NavLink>
//         </li>
//       )}
//       {auth.isLoggedIn && (
//         <li>
//           <NavLink to="/users">Users</NavLink>
//         </li>
//       )}
//       {!auth.isLoggedIn && (
//         <li>
//           <NavLink to="/login">Login</NavLink>
//         </li>
//       )}
//       {!auth.isLoggedIn && (
//         <li>
//           <NavLink to="/signup">Get Started</NavLink>
//         </li>
//       )}
//       {auth.isLoggedIn && (
//         <li>
//           <button onClick={auth.logout}>Logout</button>
//         </li>
//       )}
//     </ul>
//   );
// };

// export default NavLinks;
