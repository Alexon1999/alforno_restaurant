import { useEffect, useState } from "react";

import Carte from "../components/Carte";
import Card from "../components/Carte/card";
import Menu from "../components/menu/Menu";
import "./commander.css";

import { IconButton } from "@material-ui/core";
import axios from "axios";
const Commander = () => {
  const [active, setActive] = useState(1);
  const [activeCarte, setActiveCarte] = useState(false);
  const [datas, setDatas] = useState([]);
  const [choosedMenu, setChoosedMenu] = useState(null);
  const [detailMenu, setDetailMenu] = useState(null);

  useEffect(() => {
    if (activeCarte) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [activeCarte]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/restaurant/carte/" + active + "/"
      );
      setDatas(data);
    };

    fetchData();
  }, [active]);

  useEffect(() => {
    const fetchDetailMenu = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/restaurant/menu/" + choosedMenu + "/"
      );
      setDetailMenu(data);
    };

    if (choosedMenu) {
      fetchDetailMenu();
    }
  }, [choosedMenu]);

  const reset_menu = () => {
    setDetailMenu(null);
    setChoosedMenu(null);
  };

  return (
    <div className='commander'>
      <div className='commander__container'>
        <Carte
          active={active}
          setActive={setActive}
          activeCarte={activeCarte}
          setActiveCarte={setActiveCarte}
          reset_menu={reset_menu}
        />

        {!choosedMenu && (
          <div className='commander__container__cards'>
            {datas.data?.map((data) => {
              return (
                <Card
                  key={data.id}
                  {...data}
                  est_menu={datas.est_menu}
                  setChoosedMenu={setChoosedMenu}
                />
              );
            })}
          </div>
        )}

        {choosedMenu && detailMenu && (
          <Menu reset_menu={reset_menu} detailMenu={detailMenu} />
        )}

        <div className={"commander__carte " + (activeCarte ? "white" : null)}>
          <IconButton onClick={() => setActiveCarte(() => !activeCarte)}>
            <i
              className={
                "fas fa-arrow-" + (activeCarte ? "left" : "right")
              }></i>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Commander;
