import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useFetchData from "../../../hooks/useFetchData";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    maxWidth: 1200,
    width: "100%",
  },

  heading: {
    fontWeight: "bold",
  },

  rowConfig: {
    borderWidth: 3,
  },
});

export default function Clients() {
  const classes = useStyles();
  const [clients, setClients] = useFetchData("get", "paiement/clients", null);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow className={classes.rowConfig}>
            <TableCell className={classes.heading}>Nom</TableCell>
            <TableCell className={classes.heading} align='right'>
              Prenom
            </TableCell>
            <TableCell className={classes.heading} align='right'>
              Numéro téléphone
            </TableCell>
            <TableCell className={classes.heading} align='right'>
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients?.map((client) => (
            <TableRow key={client.id}>
              <TableCell component='th' scope='row'>
                {client.nom}
              </TableCell>
              <TableCell align='right'>{client.prenom}</TableCell>
              <TableCell align='right'>{client.telephone}</TableCell>
              <TableCell align='right'>{client.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
