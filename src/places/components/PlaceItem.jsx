import React, { useState, Fragment, useContext } from "react";

import { useHttpClient } from "../../hooks/use-http";
import Card from "../../shared/components/UIComponents/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIComponents/Modal";
import ErrorModal from "../../shared/components/UIComponents/ErrorModal";
import LoadingSpinner from "../../shared/components/UIComponents/LoadingSpinner";
import Map from "../../shared/components/UIComponents/Map";
import AuthContext from "../../context/auth-context";
import classes from "./PlaceItem.module.css";

const PlaceItem = (props) => {
  const authCtx = useContext(AuthContext);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMap = () => {
    setShowMap(true);
  };
  const closeMap = () => {
    setShowMap(false);
  };
  const showDeleteWarning = () => {
    setShowConfirmModal(true);
  };
  const closeDeleteWarning = () => {
    setShowConfirmModal(false);
  };
  const confirmDeletePlace = async () => {
    setShowConfirmModal(false);
    await sendRequest(
      process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
      "DELETE",
      null,
      {
        Authorization: "Bearer " + authCtx.token,
      }
    );
    props.onDelete(props.id);
  };

  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentClass={classes["place-item__modal-content"]}
        footerClass={classes["place-item__modal-actions"]}
        footer={<Button onClick={closeMap}>CLOSE</Button>}
      >
        <div className={classes["map-container"]}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={closeDeleteWarning}
        header="Are you sure"
        footerClass={classes["place-item__modal-actions"]}
        footer={
          <Fragment>
            <Button inverse onClick={closeDeleteWarning}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeletePlace}>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>If you delete a place it can`t be undone</p>
      </Modal>
      <li className={classes["place-item"]}>
        <Card className={classes["place-item__content"]}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className={classes["place-item__image"]}>
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className={classes["place-item__info"]}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={classes["place-item__actions"]}>
            <Button onClick={openMap} inverse>
              VIEW ON MAP
            </Button>
            {authCtx.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {authCtx.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarning}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
