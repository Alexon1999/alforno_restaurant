import "./panier.css";
import { useDispatch, useSelector } from "react-redux";
import { selectBaskets } from "../app/Redux-slices/basketsSlice";
import {
  selectCommande,
  changeMethodeVente,
  changeCommentaire,
} from "../app/Redux-slices/commandeSlice";
import Empty from "../images/empty.svg";
import Item from "../components/item/Item.js.js";
import {
  calculTotal,
  getNombresArticles,
  validateByRestaurant,
} from "../utilities";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { selectInfoRestaurant } from "../app/Redux-slices/infoRestaurantSlice";

const Panier = () => {
  const history = useHistory();
  const baskets = useSelector(selectBaskets);
  const { methode_vente, commentaire } = useSelector(selectCommande);

  const dispatch = useDispatch();
  const infoRestaurant = useSelector(selectInfoRestaurant);

  const handleMethodeVenteChange = (e) => {
    dispatch(changeMethodeVente(e.target.value));
  };

  const handleCommentaireChange = (e) => {
    dispatch(changeCommentaire(e.target.value));
  };
  const prixTotale = calculTotal(baskets);

  // TODO: horaire restau, mettre dans la bdd les horaire d'ouverture

  const handleSubmit = () => {
    validateByRestaurant(infoRestaurant.data, () => {
      history.push("/paiement");
    });
  };

  return (
    <div className='panier'>
      {!(baskets.produits.length + baskets.menus.length) ? (
        <div className='panier__vide'>
          <h1>Votre panier est vide</h1>
          <img src={Empty} alt='empty basket' />
        </div>
      ) : (
        <div className='panier__container'>
          <h1>
            Détail de votre panier ( {getNombresArticles(baskets)} article
            {getNombresArticles(baskets) > 1 && "s"})
          </h1>
          {baskets.produits.map((product) => {
            return <Item key={product.nom} {...product} />;
          })}
          {baskets.menus.map((menu) => {
            return <Item key={menu.id} {...menu} isMenu={true} />;
          })}

          <div className='panier__container--prix'>
            <h1>TOTAL</h1>
            <p>{prixTotale} €</p>
          </div>

          <div className='panier__container_commentaire'>
            <label>
              Indiquez ici toute information complémentaire sur votre commande
            </label>
            <textarea
              placeholder='commentaire'
              value={commentaire}
              onChange={handleCommentaireChange}></textarea>
          </div>

          <div className='panier__container_methodeVente'>
            <div>
              <input
                type='radio'
                onChange={handleMethodeVenteChange}
                value='À emporter'
                checked={methode_vente === "À emporter"}
              />
              <label htmlFor='À emporter'>À emporter</label>
            </div>
            <div>
              <input
                type='radio'
                onChange={handleMethodeVenteChange}
                value='Livraison'
                checked={methode_vente === "Livraison"}
              />
              <label htmlFor='Livraison'>
                Livraison{" "}
                {infoRestaurant.data.prix_livraison
                  ? `(${infoRestaurant.data.prix_livraison}€)`
                  : "Gratuite"}
              </label>
            </div>
          </div>

          <Button
            disabled={prixTotale < infoRestaurant.data.prix_minimum}
            onClick={handleSubmit}
            type='submit'
            variant='contained'
            color='primary'
            className='panier__container--btn-valider'>
            Commander
          </Button>

          {prixTotale < infoRestaurant.data?.prix_minimum && (
            <div className='info'>
              Vous pouvez passer la commande qu'à partir de
              {infoRestaurant.data?.prix_minimum}€
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Panier;
