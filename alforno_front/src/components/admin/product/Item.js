import React, { useState } from "react";
import { splitPrix } from "../../../utilities";
import Modal, { ModalCanBeClosed } from "../../MyModal/Modal";

const Item = ({ item, isMenu }) => {
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    if (ModalCanBeClosed(e)) {
      setShow(false);
    }
  };

  return (
    <div className='commande__product-container'>
      <div className='commande__product-details'>
        <h2 className='commande__product-quantite'>{item.quantite}x</h2>
        <h2 className='commande__product-nom'>{item.nom}</h2>
        {isMenu && (
          <span
            className='commande__product-plus'
            onClick={() => setShow(true)}>
            <i className='fas fa-plus'></i>
          </span>
        )}
      </div>
      <h2>{splitPrix(item.prix * item.quantite)}</h2>
      {isMenu && (
        <Modal
          showModal={show}
          setShowModal={setShow}
          handleClose={handleClose}>
          <Modal.Header>Composition du menu</Modal.Header>
          <Modal.Body>
            {Object.entries(JSON.parse(item.composition)).map(
              ([key, value]) => (
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
              )
            )}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Item;
