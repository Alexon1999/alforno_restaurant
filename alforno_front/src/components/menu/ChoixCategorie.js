import React, { useEffect, useState } from "react";
import ChoixCategorieProduit from "./ChoixCategorieProduit";
import { useDispatch } from "react-redux";
import { addMenu } from "../../app/Redux-slices/basketsSlice";
import { addAlert } from "../../app/Redux-slices/alertsSlice";
import { v4 as uuidv4 } from "uuid";
import axios from "../../axios";
import { menuCanBeAdded } from "../../utilities";

const ChoixCategorie = ({
  categories_choix,
  produits,
  prix,
  nom,
  plat_au_choix,
  details_plat_au_choix,
  image_url,
  reset_menu,
}) => {
  const [compoMenu, setCompoMenu] = useState(() => {
    const obj = {};
    categories_choix.forEach((categ) => {
      obj[categ.categorie.nom] = null;
    });

    if (
      plat_au_choix &&
      details_plat_au_choix &&
      details_plat_au_choix.categories.length > 0
    )
      obj["Plat"] = null;

    return obj;
  });
  const [errors, setErrors] = useState(null);
  const [produitPlatsChoix, setProduitPlatsChoix] = useState(null);

  const dispatch = useDispatch();

  const valider_menu = () => {
    const err = {};
    Object.entries(compoMenu).forEach(([key, value]) => {
      value?.forEach((produit, i) => {
        if (produit == null) {
          if (value.length > 1) {
            err[key] = `Veuillez à bien Choisir vos ${value.length} ${key}s`;
          } else {
            err[key] = "Veuillez à bien Choisir votre " + key;
          }
        }
      });
    });

    if (Object.keys(err).length > 0) {
      setErrors(err);
    } else {
      // tout est ok, ajouter dans le panier
      setErrors(null);

      if (nom === "Menu Midi") {
        if (menuCanBeAdded(11, 14.3)) {
          dispatch(
            addMenu({
              id: uuidv4(),
              nom,
              prix,
              quantite: 1,
              composition: compoMenu,
            })
          );
          dispatch(addAlert({ nom, id: uuidv4() }));
          reset_menu();
        }
      } else {
        dispatch(
          addMenu({
            id: uuidv4(),
            nom,
            prix,
            quantite: 1,
            composition: compoMenu,
          })
        );
        dispatch(addAlert({ nom, id: uuidv4() }));
        reset_menu();
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // console.log(details_plat_au_choix.categories.map((i) => i.id));
      const { data } = await axios.post(
        "restaurant/produits-categories/",

        { categories: details_plat_au_choix.categories.map((i) => i.id) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProduitPlatsChoix(data);
    };

    if (plat_au_choix && details_plat_au_choix) {
      fetchData();
    }
  }, []);

  return (
    <div className='choixCategorie'>
      {plat_au_choix &&
        details_plat_au_choix &&
        details_plat_au_choix.categories.length > 0 && (
          <div className='choixCategorie__container'>
            <h2>Plat</h2>
            <div className='error'>{errors?.["Plat"]}</div>

            <ChoixCategorieProduit
              setCompoMenu={setCompoMenu}
              compoMenu={compoMenu}
              categorie={{ nom: "Plat" }}
              quantite={details_plat_au_choix.quantite}
              produits={produitPlatsChoix}
              plat_au_choix={plat_au_choix}
              categories_filtres={details_plat_au_choix.categories}
            />
          </div>
        )}

      {categories_choix.map((categorie_choix) => {
        return (
          <div
            className='choixCategorie__container'
            key={categorie_choix.categorie.id}>
            <h2>{categorie_choix.categorie.nom}</h2>
            <div className='error'>
              {errors?.[categorie_choix.categorie.nom]}
            </div>

            <ChoixCategorieProduit
              setCompoMenu={setCompoMenu}
              compoMenu={compoMenu}
              categorie={categorie_choix.categorie}
              quantite={categorie_choix.quantite}
              produits={produits.filter(
                (produit) =>
                  produit.categorie.id === categorie_choix.categorie.id
              )}
            />
          </div>
        );
      })}

      <div className='choixCategorie__ajouter_btn_container'>
        <button className='choixCategorie__ajouter_btn' onClick={valider_menu}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default ChoixCategorie;
