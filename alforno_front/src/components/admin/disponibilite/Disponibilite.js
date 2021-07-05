import TableBox from "../../table/Table";
import useFetchData from "../../../hooks/useFetchData";
import { sendRequest } from "../../../utilities";

const proprietes = ["Nom", "Catégorie", "Disponibilité"];

const Disponibilite = () => {
  const [items, setItems, fail_fn] = useFetchData(
    "get",
    "restaurant/produit/",
    null
  );

  const updateDisponibilite = async (id, disponibilite) => {
    await sendRequest(
      "put",
      "restaurant/disponibilitePlats/",
      {
        id,
        disponibilite,
      },
      fail_fn
    );
  };

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
