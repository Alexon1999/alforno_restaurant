import axios from "axios";
import "./suivi.css";
import { useEffect, useState } from "react";
import { splitPrix } from "../../../utilities";
const Suivi = () => {
  const [aujourdhui_ca, setAujourdhuiCa] = useState(null);
  const [calendar, setCalendar] = useState(new Date().toLocaleDateString());
  const [calendar_ca, setCalendarCa] = useState(null);

  const aujourdhui = new Date().toLocaleDateString(); //// 11/03/2021

  const get_suivi_jour = async (debut, fin, setState) => {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/paiement/stripe/transactions",
      {
        date: {
          gte: debut,
          lte: fin,
        },
      }
    );

    console.log(data);
    setState(data);
  };

  const get_time_debut_fin = (date) => {
    const debut = new Date(date.toDateString() + " 00:01").getTime() / 1000;
    const fin = new Date(date.toDateString() + " 23:59").getTime() / 1000;

    return { debut, fin };
  };

  const get_ca_by_calendar = (e) => {
    // console.log(e.target.valueAsNumber);
    // console.log(e.target.valueAsDate);
    // console.log(new Date(e.target.valueAsNumber)); ////Thu Apr 22 2021 02:00:00 GMT+0200 (heure d’été d’Europe centrale)
    // console.log(new Date(e.target.valueAsNumber).toDateString()); //// Tue Mar 09 2021
    // console.log(new Date(e.target.valueAsNumber).toLocaleDateString()); //// 23/04/2021
    console.log(new Date().toLocaleDateString()); //// 23/04/2021

    setCalendar(new Date(e.target.valueAsNumber).toLocaleDateString());

    const { debut, fin } = get_time_debut_fin(new Date(e.target.valueAsNumber));
    get_suivi_jour(debut, fin, setCalendarCa);
  };

  useEffect(() => {
    const { debut, fin } = get_time_debut_fin(new Date());

    get_suivi_jour(debut, fin, setAujourdhuiCa);
  }, []);

  useEffect(() => {
    const { debut, fin } = get_time_debut_fin(new Date());

    get_suivi_jour(debut, fin, setCalendarCa);
  }, []);

  //timestamp :  new Date("Sat 7 mars 2021").getTime() / 1000

  return (
    <div className='suivi_activite admin__container'>
      <div className='suivi_activite__jour'>
        <div className='suivi_activite__jour__CA'>
          <p className='suivi_activite__jour__CA-heading'>
            CA (<span>TTC</span>) du jour
          </p>
          <p className='suivi_activite__jour__CA-date'>{aujourdhui}</p>

          <div className='suivi_activite__jour__CA__card'>
            <h1>{splitPrix(aujourdhui_ca?.amount || 0)}</h1>
          </div>
        </div>
        <div className='suivi_activite__jour__commandes'>
          <p className='suivi_activite__jour__commandes-heading'>
            Total commandes du jour
          </p>
          <p className='suivi_activite__jour__commandes-date'>{aujourdhui}</p>

          <div className='suivi_activite__jour__commandes__card'>
            <h1>{aujourdhui_ca?.nb_commandes || 0}</h1>
          </div>
        </div>
      </div>

      <div className='suivi_activite__jour_exacte'>
        {/* TODO: Pour les date précise , afficher une date picker */}

        <div className='suivi_activite__jour_exacte-calendrier'>
          <label>Calendrier: </label>
          <input type='date' onChange={get_ca_by_calendar} />
        </div>
        <div className='suivi_activite__jour'>
          <div className='suivi_activite__jour__CA'>
            <p className='suivi_activite__jour__CA-heading'>
              CA (<span>TTC</span>)
            </p>
            <p className='suivi_activite__jour__CA-date'>{calendar}</p>

            <div className='suivi_activite__jour__CA__card'>
              <h1>{splitPrix(calendar_ca?.amount || 0)}</h1>
            </div>
          </div>
          <div className='suivi_activite__jour__commandes'>
            <p className='suivi_activite__jour__commandes-heading'>
              Total commandes
            </p>
            <p className='suivi_activite__jour__commandes-date'>{calendar}</p>

            <div className='suivi_activite__jour__commandes__card'>
              <h1>{calendar_ca?.nb_commandes || 0}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className='suivi_activite__stripe'>
        <h1>
          Cliquez sur le bouton ci-dessous pour accéder à votre tableau de bord
        </h1>
        <a href='https://dashboard.stripe.com' target='blank' className='link'>
          <svg
            viewBox='0 0 60 25'
            xmlns='http://www.w3.org/2000/svg'
            width='60'
            height='25'
            className='UserLogo variant-- '>
            <title>Stripe logo</title>
            <path
              fill='var(--userLogoColor, #fff)'
              d='M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z'
              fillRule='evenodd'></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Suivi;
