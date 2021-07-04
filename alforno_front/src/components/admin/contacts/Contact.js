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

export default function Contact() {
  const classes = useStyles();
  const [contacts, setContacts] = useFetchData(
    "get",
    "restaurant/contacts/",
    null
  );

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow className={classes.rowConfig}>
            <TableCell className={classes.heading}>Nom</TableCell>
            <TableCell className={classes.heading} align='right'>
              Nom Societe
            </TableCell>
            <TableCell className={classes.heading} align='right'>
              Numéro Teléphone
            </TableCell>
            <TableCell className={classes.heading} align='right'>
              Email
            </TableCell>
            <TableCell className={classes.heading} align='right'>
              Message
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts?.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell component='th' scope='row'>
                {contact.nom}
              </TableCell>
              <TableCell align='right'>{contact.societe}</TableCell>
              <TableCell align='right'>{contact.telephone}</TableCell>
              <TableCell align='right'>{contact.email}</TableCell>
              <TableCell align='right'>{contact.message}</TableCell>
              {/* <TableCell
                align='right'
                className='text-light bg-danger text-center'
                onClick={deleteContact(contact.id)}>
                X
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
