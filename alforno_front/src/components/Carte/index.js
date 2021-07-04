import { useEffect, useState } from "react";
import carteImg from "../../images/carte.png";
import axios from "../../axios";
import "./carte.css";

const Carte = ({
  setActive,
  active,
  activeCarte,
  setActiveCarte,
  reset_menu,
}) => {
  const [carte, setCarte] = useState([]);

  const fetch_categs = async () => {
    const { data } = await axios.get("restaurant/categories");
    setCarte(data);
  };

  useEffect(() => {
    fetch_categs();
  }, []);

  return (
    <div className={"carte " + (activeCarte ? "active" : null)}>
      <div className='carte__image-container'>
        <img src={carteImg} alt='carte_img' />
      </div>

      <div className='carte__items'>
        {carte.map((carte) => (
          <p
            key={carte.id}
            className={`carte__item ${active === carte.id ? "active" : ""}`}
            onClick={() => {
              setActive(carte.id);
              setActiveCarte(false);
              reset_menu();
            }}>
            {carte.nom}s
          </p>
        ))}
      </div>
    </div>
  );
};

export default Carte;
