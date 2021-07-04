import React from "react";

import "./product.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { getPrixAvecTTC, splitPrix } from "../../../utilities";
import ExpandedIcon from "./ExpandedIcon";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightMedium,
    color: "black",
    width: "20%",
  },
  table: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  accordion: {
    marginTop: "30px",
    position: "relative",
  },
  p: {
    fontWeight: "bold",
    margin: 0,
    width: "20%",
  },
}));

const Product = ({
  commande,
  action = () => {},
  btn = null,
  estPrisConnaissance = false,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Accordion
        className={classes.accordion}
        key={commande.id}
        onChange={(e, expand) => setExpanded(expand)}>
        <AccordionSummary
          className={classes.accordion}
          // expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          {!expanded ? (
            <div className={classes.table}>
              <p className={classes.p + " Product__date"}>
                {new Date(commande.date_commande).toLocaleDateString()}
              </p>
              <p className={classes.p}>
                {new Date(commande.date_commande)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join("h")}
              </p>
              {/* <p className={classes.p}>{commande.reference}</p> */}
              <p className={classes.p + " Product__client"}>
                {commande.client.nom[0] + "." + commande.client.prenom}
              </p>
              <p className={classes.p}>{commande.mode || "Livraison"}</p>
              <p className={"commande__prix " + classes.p}>
                {/* 10% de TVA Pour les activités de restauration rapide, le taux de TVA applicable aux produits alimentaires est également égal à 10%*/}
                {getPrixAvecTTC(commande.prix_totale, 0)}€
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}>
              <p style={{ marginRight: "10px" }}>
                {new Date(commande.date_commande).toLocaleDateString()},{" "}
              </p>
              <p>
                {new Date(commande.date_commande)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join("h")}
              </p>
            </div>
          )}

          <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
        </AccordionSummary>
        <AccordionDetails>
          <div className='product__container'>
            {/* <CommandeList commandeItem={commande.panier.produits} /> */}
            <div className='commande__product'>
              {commande.panier.menus.map((menu) => (
                <Item
                  key={commande.id.toString() + menu.id.toString()}
                  item={menu}
                  isMenu
                />
              ))}
              {commande.panier.produits.map((produit) => (
                <Item
                  key={commande.id.toString() + produit.id.toString()}
                  item={produit}
                />
              ))}
            </div>

            <div className='commande__totale'>
              <div className='commande__totale__sous-totale'>
                <p>Sous Total HT </p>
                <p>{splitPrix(commande.prix_totale)}</p>
              </div>

              <div className='commande__totale-details'>
                <div className='commande__totale-mode__container'>
                  <p className='commande__totale-mode'>
                    {commande.methode_vente}
                  </p>
                  <p className='commande__ref'>{commande.reference}</p>
                </div>

                <div className='commande__totale-ttc'>
                  <p>
                    Total <span>TTC</span>
                  </p>
                  <p>{splitPrix(getPrixAvecTTC(commande.prix_totale, 0))}</p>
                </div>
              </div>
            </div>

            <div className='commande__client'>
              <p className='commande__client__nom'>
                {commande.client.nom + " " + commande.client.prenom}
              </p>
              <p className='commande__client__adresse'>
                {commande.client.adresse}, {commande.client.code_postale}{" "}
                {commande.client.ville}
              </p>
              <p className='commande__client__telephone'>
                {commande.client.telephone}
              </p>
            </div>

            {btn && (
              <button
                className={[
                  "commande__valider_btn",
                  estPrisConnaissance ? "terminer" : "",
                ].join(" ")}
                variant='contained'
                color='primary'
                onClick={() => action(commande.id)}>
                {btn}
              </button>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Product;
