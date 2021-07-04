import React from "react";

const ChoixTaille = ({ setTaille, taille }) => {
  return (
    <div className='card__item__taille' style={{ margin: "8px auto" }}>
      <div>
        <input
          type='radio'
          onChange={(e) => {
            setTaille(e.target.value);
          }}
          value='Senior'
          checked={taille === "Senior"}
        />
        <label htmlFor='Senior' style={{ margin: "0 0 0 0.5rem" }}>
          Senior
        </label>
      </div>
      <div>
        <input
          onChange={(e) => {
            setTaille(e.target.value);
          }}
          value='Mega'
          type='radio'
          checked={taille === "Mega"}
        />
        <label htmlFor='Mega' style={{ margin: "0 0 0 0.5rem" }}>
          Méga
        </label>
      </div>
    </div>
  );
};

export default ChoixTaille;
