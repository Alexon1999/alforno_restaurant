import useFetchCommandes from "../../../hooks/useFetchCommandes";

import ProductList from "../product/ProductList";

const HistoriqueCommande = () => {
  const { commandes } = useFetchCommandes(
    "get",
    "paiement/historique-commande",
    null
  );

  return (
    <div className='historiqueCommande admin__container'>
      <ProductList commandes={commandes} />
    </div>
  );
};

export default HistoriqueCommande;
