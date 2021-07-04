import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandedIcon from "./ExpandedIcon";
import CardMenu from "./CardMenu";

const ChoixProduits = ({
  produits,
  choosed,
  change_choixProduits,
  idx,
  categorie,
  plat_au_choix = false,
  categories_filtres = [],
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeCateg, setActiveCateg] = useState(categories_filtres[0]?.id);

  return (
    <Accordion
      style={{
        borderLeft: expanded
          ? "none"
          : choosed.produit
          ? "5px solid #18c939"
          : "5px solid black",
        marginBottom: "10px",
      }}
      onChange={(e, expand) => setExpanded(expand)}
      expanded={expanded}>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
        aria-controls='panel1a-content'
        id='panel1a-header'>
        {choosed.produit ? (
          <>{choosed.produit.nom}</>
        ) : (
          <>Choisissez votre {categorie.nom}</>
        )}

        <ExpandedIcon
          expanded={expanded}
          setExpanded={setExpanded}
          idx={idx}
          choosedProduit={choosed.produit}
          change_choixProduits={change_choixProduits}
        />
      </AccordionSummary>
      <AccordionDetails>
        {plat_au_choix && categories_filtres.length > 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}>
            <select
              style={{ padding: "0.5rem 1rem" }}
              onChange={(e) => {
                // console.log(e.target.value);
                setActiveCateg(+e.target.value);
              }}>
              {categories_filtres.map((categ) => (
                <option key={categ.id} value={categ.id}>
                  {categ.nom}
                </option>
              ))}
            </select>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
          {!plat_au_choix ? (
            <>
              {produits?.map((produit) => (
                <CardMenu
                  key={produit.id}
                  produit={produit}
                  idx={idx}
                  active={produit.id === choosed.produit?.id}
                  change_choixProduits={change_choixProduits}
                  setExpanded={setExpanded}
                  expanded={expanded}
                />
              ))}
            </>
          ) : (
            <>
              {produits
                ?.filter((prod) => prod.categorie.id === activeCateg)
                .map((produit) => (
                  <CardMenu
                    key={produit.id}
                    produit={produit}
                    idx={idx}
                    active={produit.id === choosed.produit?.id}
                    change_choixProduits={change_choixProduits}
                    setExpanded={setExpanded}
                    expanded={expanded}
                  />
                ))}
            </>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ChoixProduits;
