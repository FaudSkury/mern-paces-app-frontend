import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../../context/auth-context";
import classes from "./NavLinks.module.css";

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          to="/"
        >
          ALL USERS
        </NavLink>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to={`${authCtx.userId}/places`}
          >
            MY PLACES
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/places/new"
          >
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/auth"
          >
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={authCtx.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
