import { IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const useStyles = makeStyles((theme) => ({
  expanIcon: {
    position: "absolute",
    right: 5,
    top: "50%",
    transform: "translateY(-50%)",
  },
}));
const ExpandedIcon = ({
  expanded,
  setExpanded,
  change_choixProduits,
  idx,
  choosedProduit,
}) => {
  const classes = useStyles();

  return (
    <IconButton
      className={"nouvelleCommande__expandIcon " + classes.expanIcon}
      onClick={() => {
        setExpanded(!expanded);
        if (choosedProduit) change_choixProduits(idx, null);
      }}>
      {expanded ? (
        <ExpandLessIcon style={{ color: "black" }} />
      ) : (
        <>
          {choosedProduit ? (
            <HighlightOffIcon style={{ color: "red" }} />
          ) : (
            <ExpandMoreIcon style={{ color: "black" }} />
          )}
        </>
      )}
    </IconButton>
  );
};

export default ExpandedIcon;
