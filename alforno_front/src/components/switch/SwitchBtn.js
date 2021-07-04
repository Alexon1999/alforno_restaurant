import React from "react";
import { useState } from "react";
import "./switch.css";

const SwitchBtn = ({
  val = true,
  action,
  item = {},
  hide = true,
  style = {},
  noAction = false,
}) => {
  const [open, setOpen] = useState(() => val);

  // TODO: donner onChange function au props

  return (
    <div className='switch__container' style={style}>
      {!hide && (
        <p className='switch__container-indication '>
          {open ? "ouvert" : "fermé"}
        </p>
      )}
      <div
        className={["switch", open ? "active" : ""].join(" ")}
        onClick={() => {
          if (!noAction) {
            if (action) {
              action(item.id, !open);
            }
            setOpen(!open);
          }
        }}>
        <div className='switch-round'></div>
      </div>
    </div>
  );
};

export default SwitchBtn;
