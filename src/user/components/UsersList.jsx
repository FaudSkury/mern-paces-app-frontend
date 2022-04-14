import React from "react";
import Card from "../../shared/components/UIComponents/Card";
import UsersItem from "./UserItem";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  if (props.items.lenght === 0) {
    return (
      <Card className="center">
        <h2>No users found</h2>
      </Card>
    );
  }
  return (
    <ul className={classes["users-list"]}>
      {props.items.map((user) => (
        <UsersItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
