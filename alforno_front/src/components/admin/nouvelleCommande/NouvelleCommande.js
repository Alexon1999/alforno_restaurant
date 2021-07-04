import axios from "axios";
import { useHistory } from "react-router-dom";
import { sendRequest } from "../../../utilities";
import ProductList from "../product/ProductList";

const NouvelleCommande = ({ commandes, fetchCommandes }) => {
  const history = useHistory();

  const commande_est_vue = async (id) => {
    await sendRequest(
      "put",
      "paiement/update-commande",
      { id, est_vue: true },
      () => history.push("/login")
    );

    fetchCommandes();
  };

  // console.log(commandes);

  // useEffect(() => {
  //   let idtimeout;
  //   if (commandes.length > 0) {
  //     idtimeout = setTimeout(() => {
  //       dispatch(changenouvelleCommandeLength(0));
  //     }, 1000 * 5);
  //   }

  //   return () => {
  //     clearTimeout(idtimeout);
  //   };
  // }, [commandes, dispatch]);

  return (
    <div className='nouvelleCommande admin__container'>
      <h1 className='heading'>
        {commandes.length
          ? "Vos Nouvelles Commandes"
          : "Pas de Nouvelles commandes"}
      </h1>

      <ProductList
        nouvelleCommande
        commandes={commandes}
        action={commande_est_vue}
        btn='confirmer'
      />
    </div>
  );
};

export default NouvelleCommande;
