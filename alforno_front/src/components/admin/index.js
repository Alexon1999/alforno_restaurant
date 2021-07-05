import React, { useEffect, useMemo } from "react";

import "./adminPage.css";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectAdmin,
  changePage,
  changenouvelleCommandeLength,
} from "../../app/Redux-slices/adminSlice";
import AdminNav from "./menu/Menu";
import NouvelleCommande from "./nouvelleCommande/NouvelleCommande";
import Suivi from "./suivi/Suivi";
import Disponibilte from "./disponibilite/Disponibilite";
import HistoriqueCommande from "./historiqueCommande/HistoriqueCommande";
import CommandeEnCours from "./commandeEnCours/CommandeEnCours";
import Contact from "./contacts/Contact";
import bellUrl from "./sounds/bell.mp3";
import useFetchCommandes from "../../hooks/useFetchCommandes";
import Clients from "./bddClient/Clients";
import DjangoAdmin from "./DjangoAdmin/DjangoAdmin";

const AdminPage = () => {
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const haveLength = useMemo(
    () => admin.nouvelleCommandeLength > 0,
    [admin.nouvelleCommandeLength]
  );
  const { commandes, setCommandes, fetchCommandes } = useFetchCommandes(
    "get",
    "paiement/nouvelle-commande",
    null,
    false,
    true
  );

  // console.log(path, url); //  /admin

  useEffect(() => {
    dispatch(changePage(admin.currentPage));
    history.push(path + "/nouvelles-commandes");
  }, []);

  useEffect(() => {
    // a chaque fois que commande change, on met a jour la longueur de nouvelle commande
    dispatch(changenouvelleCommandeLength(commandes.length));
  }, [commandes, dispatch]);

  return (
    <div className='adminPage'>
      {/* <IconButton className={classes.root}>
        <ExitToAppIcon style={{ fontSize: 40 }} />
      </IconButton> */}

      {haveLength && <audio src={bellUrl} autoPlay loop></audio>}

      <div className='adminPage__container'>
        <AdminNav />
        <div style={{ flex: 1, padding: "1rem", width: "100%" }}>
          <Switch>
            <Route exact path={path + "/nouvelles-commandes"}>
              <NouvelleCommande
                commandes={commandes}
                fetchCommandes={fetchCommandes}
              />
            </Route>
            <Route exact path={path + "/commande-en-cours"}>
              <CommandeEnCours />
            </Route>
            <Route exact path={path + "/historiques"}>
              <HistoriqueCommande />
            </Route>
            <Route exact path={path + "/suivi-activites"}>
              <Suivi />
            </Route>
            <Route exact path={path + "/disponibles-plats"}>
              <Disponibilte />
            </Route>
            <Route exact path={path + "/fichiers-contacts"}>
              <Contact />
            </Route>
            <Route exact path={path + "/clients"}>
              <Clients />
            </Route>
            <Route exact path={path + "/adminer"}>
              <DjangoAdmin />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
