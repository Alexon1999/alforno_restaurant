import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changenouvelleCommandeLength } from "../../../app/Redux-slices/adminSlice";
import { sendRequest } from "../../../utilities";
import ProductList from "../product/ProductList";

const NouvelleCommande = () => {
  const dispatch = useDispatch();
  const [commandes, setCommandes] = useState([]);
  const history = useHistory();

  const fetchCommandes = async () => {
    const [data, error] = await sendRequest(
      "get",
      "http://localhost:8000/paiement/nouvelle-commande",
      null,
      () => history.push("/login")
    );
    if (!error) {
      setCommandes(data);
    }
  };

  useEffect(() => {
    // a chaque fois que commande change, on met a jour la longueur de nouvelle commande
    dispatch(changenouvelleCommandeLength(commandes.length));
  }, [commandes, dispatch]);

  useEffect(() => {
    let timeoutId;
    function getLatestCommandes() {
      fetchCommandes();

      // wait for the response from fetchCommandes , before we recall it (delay of 1minute)
      timeoutId = setTimeout(getLatestCommandes, 1000 * 60);
    }
    getLatestCommandes();

    return () => {
      clearTimeout(timeoutId);
      setCommandes([]);
    };
  }, []);

  const commande_est_vue = async (id) => {
    await axios.put("http://localhost:8000/paiement/update-commande", {
      id,
      est_vue: true,
    });

    fetchCommandes();
  };
  // console.log(commandes);
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
