import { useState } from "react";
import "./card.css";

import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addProduct } from "../../app/Redux-slices/basketsSlice";
import { addAlert } from "../../app/Redux-slices/alertsSlice";
import { AnimatePresence, motion } from "framer-motion";

import { Button, IconButton } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { splitPrix } from "../../utilities";

import Modal, { ModalCanBeClosed } from "../MyModal/Modal";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ChoixTaille from "./ChoixTaille";
import burger from "../../images/cosa-nostra.png";

const Card = ({
  nom,
  prix,
  id,
  est_menu,
  categorie = {},
  description,
  ingredients,
  setChoosedMenu = () => {},
  image_url,
}) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  // const baskets = useSelector(selectBaskets)
  const [quantite, setQuantite] = useState(1);
  const [taille, setTaille] = useState("Senior");

  const handleClose = (e) => {
    if (ModalCanBeClosed(e)) {
      setShow(false);
      setShowButton(false);
    }
  };

  const addProduit = () => {
    if (categorie.nom === "Pizza") {
      let name = nom;
      name += " " + taille;
      dispatch(
        addProduct({
          nom: name,
          prix: taille === "Mega" ? prix + 3 : prix,
          id: id + taille,
          quantite: 1,
        })
      );
      dispatch(addAlert({ nom: name, id: uuidv4() }));
    } else {
      dispatch(
        addProduct({
          nom,
          prix,
          id,
          quantite: 1,
        })
      );
      dispatch(addAlert({ nom, id: uuidv4() }));
    }
    setShow(false);
    setShowButton(!showButton);
  };

  // const Prix = splitPrix(prix);

  const handleClick = () => {
    if (est_menu) {
      setChoosedMenu(id);
    } else {
      setShowButton(!showButton);
    }
  };
  return (
    <div
      className='card__item'
      onClick={handleClick}
      style={{ cursor: est_menu && "pointer" }}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}>
      <h1 className='card__item__heading'>{nom}</h1>
      <div className='card__item__image-container'>
        <img src={burger} alt={nom} />
      </div>
      {categorie.nom === "Pizza" && (
        <ChoixTaille taille={taille} setTaille={setTaille} />
      )}
      <div
        className='card__item__details'
        // style={{ justifyContent: est_menu ? "center" :"" }}
        style={{ justifyContent: est_menu && "center" }}>
        <p>
          {/* {Prix[0]}€{Prix[1]} */}
          {categorie.nom === "Pizza" ? (
            <>{splitPrix(taille === "Mega" ? prix + 3 : prix)}</>
          ) : (
            <>{splitPrix(prix)}</>
          )}
        </p>
        {!est_menu && (
          <>
            <AnimatePresence>
              {showButton && (
                <motion.div
                  variants={ajoutBtn}
                  initial='from'
                  animate='to'
                  exit='exit'
                  className='card__item__shopping-btn'
                  onClick={addProduit}>
                  <OverlayTrigger
                    placement='top'
                    delay={{ show: 250, hide: 300 }}
                    trigger={["hover", "focus"]}
                    overlay={<Tooltip>Ajouter au panier</Tooltip>}>
                    <IconButton
                      color='secondary'
                      style={{ padding: 0 }}
                      aria-label='add to shopping cart'>
                      <AddShoppingCartIcon style={{ fontSize: "25px" }} />
                    </IconButton>
                  </OverlayTrigger>
                </motion.div>
              )}
            </AnimatePresence>
            <i className='fas fa-eye' onClick={() => setShow(true)}></i>{" "}
          </>
        )}
      </div>

      <Modal showModal={show} setShowModal={setShow} handleClose={handleClose}>
        <Modal.Header>
          <h1>{nom}</h1>
          <img src={image_url} alt={nom} />
          <p>
            {categorie.nom === "Pizza" ? (
              <>{splitPrix(taille === "Mega" ? prix + 3 : prix)}</>
            ) : (
              <>{splitPrix(prix)}</>
            )}
          </p>
        </Modal.Header>
        <Modal.Body>
          {description && (
            <>
              <Modal.Body.Heading>Description</Modal.Body.Heading>
              <p> {description} </p>
            </>
          )}

          {!!ingredients?.length && (
            <>
              <Modal.Body.Heading>Ingredients utilisés</Modal.Body.Heading>
              {ingredients.map((i) => (
                <p key={i.id}>{i.nom}</p>
              ))}
            </>
          )}

          {}

          {categorie.nom === "Pizza" && (
            <>
              <Modal.Body.Heading>Taille</Modal.Body.Heading>
              <ChoixTaille taille={taille} setTaille={setTaille} />
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <div className='modal_footer_buttton_container'>
            <div
              style={{
                marginRight: "15px",
                display: "flex",
                alignItems: "center",
              }}>
              <IconButton
                style={{ margin: "0 5px" }}
                onClick={() => {
                  if (quantite > 0) {
                    setQuantite(quantite - 1);
                  }
                }}>
                <RemoveIcon />
              </IconButton>

              <span>{quantite}</span>

              <IconButton
                style={{ margin: "0 5px" }}
                onClick={() => setQuantite(quantite + 1)}>
                <AddIcon />
              </IconButton>
            </div>

            <Button
              disabled={quantite === 0}
              onClick={() => {
                addProduit();
                setQuantite(1);
              }}
              variant='contained'
              color='secondary'
              className='card__item__commander-btn'
              endIcon={<AddShoppingCartIcon style={{ fontSize: "25px" }} />}>
              Ajouter au panier
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const ajoutBtn = {
  from: {
    opacity: 0,
    y: 20,
  },
  to: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },

  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export default Card;
