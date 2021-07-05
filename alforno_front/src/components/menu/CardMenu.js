import React from "react";
import burger from "../../images/cosa-nostra.png";

const CardMenu = ({
  produit,
  change_choixProduits,
  idx,
  active,
  setExpanded,
  expanded,
}) => {
  return (
    <div
      onClick={() => {
        change_choixProduits(idx, produit);
        setExpanded(!expanded);
      }}
      style={{
        width: "150px",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: "white",
        boxShadow: "rgb(200 200 200) 0px 0px 10px 0px",
        border: active ? "2px solid black" : "",
        cursor: produit.disponibilite ? "pointer" : "not-allowed",
        pointerEvents: produit.disponibilite ? "all" : "none",
        opacity: produit.disponibilite ? 1 : 0.6,
      }}>
      <h3 style={{ fontSize: "0.9rem", textAlign: "center" }}>{produit.nom}</h3>
      <img
        src={produit.image_url || burger}
        alt={produit.nom}
        style={{ maxHeight: "100px", maxWidth: "150px", objectFit: "contain" }}
      />
    </div>
  );
};

export default CardMenu;
