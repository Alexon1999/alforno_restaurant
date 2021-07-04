import axios from "axios";
import { useEffect, useState } from "react";
import TableBox from "../../table/Table";

const proprietes = ["Nom", "Catégorie", "Disponibilité"];

const Disponibilite = () => {
  const [items, setItems] = useState([]);

  const get_produits = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/restaurant/produit"
    );

    setItems(data);
  };

  const updateDisponibilite = async (id, disponibilite) => {
    await axios.put("http://localhost:8000/restaurant/disponibilitePlats/", {
      id,
      disponibilite,
    });
  };

  useEffect(() => {
    get_produits();

    return () => {
      setItems([]);
    };
  }, []);

  return (
    <div className='disponibilite admin__container'>
      <TableBox
        proprietes={proprietes}
        donnees={items}
        action={updateDisponibilite}
      />
    </div>
  );
};
export default Disponibilite;
