import useFetchCommandes from "../../../hooks/useFetchCommandes";
import { sendRequest } from "../../../utilities";

import ProductList from "../product/ProductList";

const CommandeEnCours = () => {
  const { commandes, fetchCommandes, fail_fn } = useFetchCommandes(
    "get",
    "paiement/commande-encours",
    null
  );

  const commande_est_livre = async (id) => {
    await sendRequest(
      "put",
      "paiement/update-commande",
      { id, est_livre: true },
      fail_fn
    );

    fetchCommandes();
  };

  return (
    <div className='commande-en-cours admin__container'>
      <h1 className='heading'>
        Vos Commandes en cours {commandes.length ? "" : "sont vide"}
      </h1>
      <ProductList
        commandes={commandes}
        action={commande_est_livre}
        btn={"Remise au client"}
        estPrisConnaissance
      />
    </div>
  );
};

export default CommandeEnCours;
