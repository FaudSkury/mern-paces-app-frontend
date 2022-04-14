import React from "react";

import Card from "../../shared/components/UIComponents/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import classes from "./PlaceList.module.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={`${classes["place-list"]} center`}>
        <Card>
          <h2>No places found. Maybe create a new one</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className={classes["place-list"]}>
      {props.items.map((item) => {
        return (
          <PlaceItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            address={item.address}
            creatorId={item.creator}
            coordinates={item.location}
            onDelete={props.onDeletePlace}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
