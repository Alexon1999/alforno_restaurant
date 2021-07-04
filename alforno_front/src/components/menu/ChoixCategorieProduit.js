import React, { useState, useEffect } from "react";
import ChoixProduits from "./ChoixProduits";

const ChoixCategorieProduit = ({
  produits,
  quantite,
  categorie,
  compoMenu,
  setCompoMenu,
  plat_au_choix = false,
  categories_filtres = [],
}) => {
  const [choixProduits, setChoixProduits] = useState(() => {
    return new Array(quantite).fill(null);
  });
  // const [Produits, setProduits] = useState(() => {
  //   return produits.map((prod) => ({
  //     active: false,
  //     data: prod,
  //     id: prod.id,
  //   }));
  // });

  // const verifier_si_sont_dans_choix = (id) => {
  //   if (choixProduits.find((prod) => prod.id === id)) return true;
  //   return false;
  // };

  // const addChoixProduit = (produit) => {
  //   if (choixProduits.length === quantite) {
  //     const idx = quantite - 1;
  //     if (idx < 0) return;
  //     const newArray = [...choixProduits];
  //     newArray[idx] = { ...produit.data };

  //     setChoixProduits(newArray);
  //   } else {
  //     const newArray = [...choixProduits];
  //     if (verifier_si_sont_dans_choix(produit.id)) {
  //       newArray.splice(
  //         choixProduits.findIndex((prod) => prod.id === produit.id),
  //         1
  //       );
  //     }
  //     setChoixProduits([...choixProduits, { ...produit.data }]);
  //   }
  // };

  // useEffect(() => {
  //   setProduits(
  //     Produits.map((product) => {
  //       if (choixProduits.find((prod) => prod.id === product.id)) {
  //         return {
  //           ...product,
  //           active: true,
  //         };
  //       }
  //       return { ...product, active: false };
  //     })
  //   );
  // }, [choixProduits]);

  useEffect(() => {
    setCompoMenu((prev) => ({ ...prev, [categorie.nom]: choixProduits }));
  }, [choixProduits, setCompoMenu, categorie.nom]);

  const change_choixProduits = (idx, produit) => {
    const newArray = [...choixProduits];
    newArray[idx] = produit ? { id: produit.id, nom: produit.nom } : produit;
    setChoixProduits(newArray);
  };

  // Array.from({length:quantite})
  return new Array(quantite).fill().map((_, i) => {
    return (
      <ChoixProduits
        key={i}
        idx={i}
        produits={produits}
        categorie={categorie}
        choosed={
          !!choixProduits[i] ? { produit: choixProduits[i] } : { produit: null }
        }
        change_choixProduits={change_choixProduits}
        plat_au_choix={plat_au_choix}
        categories_filtres={categories_filtres}
      />
    );
  });
};

export default ChoixCategorieProduit;
