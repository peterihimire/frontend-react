import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    // <Link to={`http://localhost:4000/api/admin/users/`}>
      <li className="user-item">
        <Card className="user-item__content">
          <Link to={`users/${props.id}/`}>
            <div className="user-item__image">
              <Avatar image={props.image} alt={props.name} />
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
              <h3>
                {props.properties} {props.properties === 1 ? "Place" : "Places"}
              </h3>
            </div>
          </Link>
        </Card>
      </li>
    // {/* </Link> */}
  );
};

export default UserItem;
