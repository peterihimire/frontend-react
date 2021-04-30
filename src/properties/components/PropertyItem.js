import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
// import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./PropertyItem.css";

const PlaceItem = (props) => {
  console.log(props);
  console.log(props.image);

  const history = useHistory();
  console.log(history);

  const auth = useContext(AuthContext);
  console.log(auth);
  console.log(auth.userId);

  const [showMap, setShowMap] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  // console.log(isLoading);

  // const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("Property Deleted...");

    fetch(`${process.env.REACT_APP_ADMIN_URL}/properties/${props.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        response
          .json()
          .then((res) => {
            console.log(res);
            console.log(props);
            if (!response.ok) {
              throw new Error(res.msg);
            }

            setIsLoading(false);
            console.log(response);
            props.onDelete(props.id);
            history.push("/properties");
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            setError(
              err.message || "You are not Authorized to view this page!"
            );
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "You are not Authorized to view this page!");
      });
  };

  // REMOVES THE ERROR MODAL
  const errorModalHandler = () => {
    setError("");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorModalHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          {/* <Map center={props.coordinates} zoom={16} /> */}
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>Do you want to delete this property? Action is not reversible...</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            {/* prepended the image url */}
            <img
              src={`${process.env.REACT_APP_ASSET_URL}${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.name}</h2>
            <h3>{props.location}</h3>
            <h3>{props.amount} million</h3>
            <h3>{props.completion} completion</h3>
            {/* <p>{props.description}</p> */}
          </div>
          <div className="place-item__actions">
            {/* <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button> */}

            <Button to={`/properties/detail/${props.id}`}>INFO</Button>
            {auth.userId === props.creator || auth.admin ? (
              <Button to={`/properties/${props.id}`}>EDIT</Button>
            ) : null}
            {auth.userId === props.creator || auth.admin ? (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            ) : null}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
