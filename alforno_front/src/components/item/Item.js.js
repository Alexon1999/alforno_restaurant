import "./Item.css";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import {
  incrementQauntite,
  decrementQauntite,
} from "../../app/Redux-slices/basketsSlice";
import { IconButton } from "@material-ui/core";
import { splitPrix } from "../../utilities";
import Modal, { ModalCanBeClosed } from "../MyModal/Modal";
import { useState } from "react";

const Item = ({
  nom,
  prix,
  id,
  quantite,
  composition = {},
  isMenu = false,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleClose = (e) => {
    // console.log(e.target.classList);

    if (ModalCanBeClosed(e)) {
      setShowModal(false);
    }
  };

  return (
    <div className='Item'>
      <div className='Item--info'>
        <p className='Item--info-title'>{nom}</p>
        <p className='Item--info-prix'>{splitPrix(prix)}</p>
        {isMenu && (
          <p className='Item--info-details' onClick={() => setShowModal(true)}>
            <i className='fas fa-sticky-note'></i>
          </p>
        )}
      </div>

      <div className='Item--quantite'>
        <IconButton
          onClick={() => {
            if (quantite > 0) {
              if (!isMenu) {
                dispatch(decrementQauntite({ id, isMenu: false }));
              } else {
                dispatch(decrementQauntite({ id, isMenu: true }));
              }
            }
          }}>
          <RemoveIcon />
        </IconButton>

        <span>{quantite}</span>

        <IconButton
          onClick={() => {
            if (!isMenu) {
              dispatch(incrementQauntite({ id, isMenu: false }));
            } else {
              dispatch(incrementQauntite({ id, isMenu: true }));
            }
          }}>
          <AddIcon />
        </IconButton>
      </div>

      <div className='Item--prixQuantite'>
        {
          <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
            {splitPrix(prix * quantite)}
          </span>
        }
      </div>

      {isMenu && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleClose={handleClose}>
          <Modal.Header>Composition de votre menu</Modal.Header>
          <Modal.Body>
            {Object.entries(composition).map(([key, value]) => (
              <div key={key} style={{ marginBottom: "15px" }}>
                <Modal.Body.Heading style={{ marginBottom: "5px" }}>
                  {key}
                </Modal.Body.Heading>
                {value.map((produit) => (
                  <p key={produit.id} style={{ marginBottom: "5px" }}>
                    {produit.nom}
                  </p>
                ))}
              </div>
            ))}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Item;
