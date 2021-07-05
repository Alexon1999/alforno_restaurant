import React from "react";
import { apiUrl } from "../../../config";

const DjangoAdmin = () => {
  return (
    <div className='admin__container'>
      {/* <iframe
        width='100%'
        height='100%'
        sandbox
        src={apiUrl + "/admin"}
        title='Django Admin'></iframe> */}

      <a
        style={{ fontSize: "1.2rem" }}
        href={apiUrl + "/admin"}
        alt='adminer'
        target='_blank'
        rel='noreferrer'>
        Adminer
      </a>
    </div>
  );
};

export default DjangoAdmin;
