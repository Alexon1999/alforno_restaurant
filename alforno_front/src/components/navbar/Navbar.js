import React, { useRef, useMemo, useState } from "react";
import "./navbar.css";

import { Link, useLocation, useHistory } from "react-router-dom";
import NavMobile from "./mobile/NavMobile";

import { getNombresArticles, smoothScroll } from "../../utilities";
import { useNavBarStateValue } from "../../contexts/Navbar/NavBarState";
import { SET_ACTIVE } from "../../contexts/Navbar/actiontypes";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { useSelector } from "react-redux";
import { selectBaskets } from "../../app/Redux-slices/basketsSlice";
import { selectInfoRestaurant } from "../../app/Redux-slices/infoRestaurantSlice";
import { IconButton } from "@material-ui/core";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Logo from "../logo";

const NavBar = () => {
  const nav = useRef(null);
  const location = useLocation();
  const history = useHistory();
  const currentPage = useMemo(() => location.pathname, [location.pathname]);
  // const [activeButton, setActiveButton] = useState("home");
  const { state, dispatch } = useNavBarStateValue();
  const [showBgNavBar, setShowBgNavBar] = useState(false);
  const baskets = useSelector(selectBaskets);
  const infoRestaurant = useSelector(selectInfoRestaurant);
  const nb_articles = getNombresArticles(baskets);

  const changeBackground = () => {
    // console.log(window.scrollY);
    if (window.scrollY >= 80) {
      setShowBgNavBar(true);
    } else {
      setShowBgNavBar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const IsActiveButton = (id) => (e) => {
    // setActiveButton(id);
    dispatch({
      id,
      type: SET_ACTIVE,
    });
    smoothScroll(id)(e);
  };

  const pushToHome = (id) => (e) => {
    history.push("/");
    IsActiveButton(id)(e);
    // smoothScroll(id)(e);
  };

  const regex = /^\/(admin|login)/g;
  if (!location.pathname.match(regex)) {
    return (
      <nav
        onMouseEnter={() => setShowBgNavBar(true)}
        onMouseLeave={() => setShowBgNavBar(false)}
        className={`navbar ${showBgNavBar ? "active" : ""} ${
          location.pathname !== "/" ? "sticky" : ""
        }`}
        ref={nav}
        id='navbar'>
        <div className='navbar__container'>
          <div className='navbar__logo-container'>
            {location.pathname === "/" ? (
              <a href='#home' onClick={IsActiveButton("home")}>
                <Logo className='navbar__logo' />
              </a>
            ) : (
              <Link to='/' onClick={pushToHome("home")}>
                <Logo className='navbar__logo' />
              </Link>
            )}
            {/*OUVERTURE FERMETURE*/}
            {infoRestaurant.data && (
              <div className='navbar__restaurant-disponibility-container'>
                <div className='navbar__restaurant-disponibility-content'>
                  <div
                    className={
                      infoRestaurant.data.ouvert
                        ? "navbar__restaurant-disponibility-open"
                        : "navbar__restaurant-disponibility-close"
                    }></div>
                </div>
                <p className='navbar__restaurant-disponibility-indication'>
                  {infoRestaurant.data.ouvert ? "Ouvert" : "Fermé"}
                </p>
              </div>
            )}
          </div>
          <div className='navbar__links'>
            {state.map((link) => {
              if (link.isBasket) {
                return (
                  <div
                    key={link.path}
                    className={`${
                      location.pathname === link.path ? "active " : ""
                    }navbar__links-basket`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <Link
                      to={link.path}
                      className={`${
                        location.pathname === link.path ? "active " : ""
                      }basket`}>
                      <i className='fas fa-shopping-basket'></i> Panier
                      <span>{nb_articles}</span>
                    </Link>
                    <OverlayTrigger
                      trigger={baskets.length ? ["click"] : ["hover", "focus"]}
                      placement='bottom'
                      rootClose={true} // when we click outside , we can close the overlay
                      overlay={
                        <Popover>
                          <Popover.Title as='h3' className='text-center'>
                            Votre panier {!nb_articles && "est vide"}
                          </Popover.Title>
                          {/* quand le panier est remplie*/}
                          {!!nb_articles && (
                            <Popover.Content>
                              {baskets.produits
                                .concat(baskets.menus)
                                .map((item) => (
                                  <div
                                    key={item.id}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "10px 0",
                                    }}>
                                    <img
                                      src={item.img}
                                      alt=''
                                      style={{
                                        maxWidth: "50px",
                                        objectFit: "contain",
                                      }}
                                    />
                                    <p
                                      style={{
                                        margin: "0 5px 0",
                                      }}>
                                      {item.nom} x{item.quantite}
                                    </p>
                                  </div>
                                ))}
                            </Popover.Content>
                          )}
                        </Popover>
                      }>
                      <IconButton>
                        <ArrowDropDownIcon />
                      </IconButton>
                    </OverlayTrigger>
                  </div>
                );
              }

              // if (link.estDansHome) {
              //   if (location.pathname === "/") {
              //     return (
              //       <a
              //         href={"#" + link.id}
              //         key={link.path}
              //         className={link.active ? "active" : undefined}
              //         onClick={pushToHome(link.id)}>
              //         {link.nom}
              //       </a>
              //     );
              //   }
              //   return null;
              // }

              // return jsx
              // console.log(location.pathname);
              return (
                <Link
                  to={link.path}
                  key={link.path}
                  className={
                    location.pathname === link.path ? "active" : undefined
                  }>
                  {link.nom}
                </Link>
              );
            })}
          </div>

          <NavMobile
            currentPage={currentPage}
            IsActiveButton={IsActiveButton}
            // activeButton={activeButton}
          />
        </div>
      </nav>
    );
  }

  return null;
};

export default NavBar;
