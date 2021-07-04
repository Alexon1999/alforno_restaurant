import { Button } from "@material-ui/core";
import React from "react";
import ChoixCategorie from "./ChoixCategorie";

import "./menu.css";

const Menu = ({ reset_menu, detailMenu }) => {
  return (
    <div className='commander__container__compomenu'>
      <div className='commander__container__retour'>
        <Button
          className='commander__container__retour'
          variant='contained'
          color='primary'
          size='small'
          onClick={reset_menu}>
          <i className='fas fa-chevron-left'></i>
          <span className='commander__container__retour_span'>Retour</span>
        </Button>
      </div>

      <div className='commander__container__compomenu__header'>
        <h1 className='commander__container__compomenu__heading'>
          {detailMenu.nom}
        </h1>
        <img src={detailMenu.image_url} alt='menu' />
        <h1 className='commander__container__compomenu__header_prix'>
          {detailMenu.prix}€
        </h1>
        <p>{detailMenu.description}</p>
      </div>

      <ChoixCategorie
        categories_choix={detailMenu.categories_choix}
        produits={detailMenu.produits}
        prix={detailMenu.prix}
        nom={detailMenu.nom}
        reset_menu={reset_menu}
        plat_au_choix={detailMenu.plat_au_choix}
        details_plat_au_choix={detailMenu.details_plat_au_choix}
      />
    </div>
  );
};

export default Menu;
