import Logo from "../../../images/alforno.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, changePage } from "../../../app/Redux-slices/adminSlice";
import { useEffect, useState } from "react";

import "./menu.css";
import { IconButton } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import SwitchBtn from "../../switch/SwitchBtn";
import axios from "../../../axios";
import { sendRequest } from "../../../utilities";

const AdminNav = () => {
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  const [active, setActive] = useState(false);

  const [infoRestau, setInfoRestau] = useState(null);

  // active
  //   ? (window.document.body.style.overflow = "hidden")
  //   : (window.document.body.style.overflow = "auto");

  useEffect(() => {
    const getRestaurantInfo = async () => {
      const { data } = await axios("restaurant/info_restaurant/1/");
      setInfoRestau({ id: data.id, ouvert: data.ouvert });
    };
    getRestaurantInfo();

    return () => {
      setActive(false);
      setInfoRestau(null);
    };
  }, []);

  const updateOpenRestaurant = async (id, ouvert) => {
    await sendRequest(
      "put",
      "restaurant/update_info_restaurant/",
      { id, ouvert },
      () => history.push("/login")
    );
  };

  const seDeconnecter = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtTokenRefresh");
    delete axios.defaults.headers["Authorization"];
    history.push("/login");
  };

  return (
    <div className={"adminNav " + (active ? "active" : "")}>
      <div className='adminNav__header'>
        <img src={Logo} alt='olokoso' />
        <button
          className='adminNav__header_deconnexion'
          onClick={seDeconnecter}>
          <i className='fas fa-sign-out-alt'></i>
        </button>
      </div>
      {/* Switch pour ouvrir et fermer (close and open restaurant) */}
      {infoRestau && (
        <SwitchBtn
          hide={false}
          val={infoRestau.ouvert}
          action={updateOpenRestaurant}
          item={infoRestau}
        />
      )}
      <div className='adminNav__links'>
        {admin.pages.map((page) => (
          <button
            key={page.name}
            className={
              "adminNav__link " +
              (admin.currentPage === page.name ? "active" : "")
            }
            onClick={() => {
              dispatch(changePage(page.name));
              history.push(path + page.path);
              setActive(false);
            }}>
            <i className={"fas adminNav__link__icone " + page.icone}></i>{" "}
            <p>{page.libelle}</p>
            {page.name === "nouvelles_commandes" &&
              admin.nouvelleCommandeLength > 0 && (
                <div className='adminNav__nouvelles_commandes__indicator'>
                  {admin.nouvelleCommandeLength}
                </div>
              )}
          </button>
        ))}
      </div>
      <div className='adminNav__close'>
        <IconButton
          className='adminNav__close-btn'
          onClick={() => setActive(!active)}>
          <i
            className={
              "fas fa-" + (active ? "chevron-right" : "chevron-left")
            }></i>
        </IconButton>
      </div>

      <div className='adminNav__humburger'>
        <IconButton onClick={() => setActive(!active)}>
          <i className='fas fa-bars'></i>
        </IconButton>
      </div>
    </div>
  );
};

export default AdminNav;
