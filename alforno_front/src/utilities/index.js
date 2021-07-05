import axios from "../axios";

const smoothScroll = (to) => (e) => {
  e.preventDefault();
  e.stopPropagation();

  const href = e.target.hash || "#" + to; // '#projects'
  const offsetTop =
    document.querySelector(href)?.offsetTop - 60 ||
    document.querySelector(href)?.scrollTop - 60;

  // console.log({ href, offsetTop });

  window.scroll({
    top: offsetTop || 0,
    behavior: "smooth",
  });
};

function debounce(cb, delay, fn) {
  let timeoutId;
  return function (...args) {
    fn();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function isIntersecting(el_id) {
  const element = document.getElementById(el_id);
  const scrollTop_el = element?.offsetTop || element?.scrollTop || 0;
  // const height_el = element?.clientHeight || 0; // element a la moitié
  // const height_window = window.innerHeight;
  const window_scrollTop = document.documentElement.scrollTop;

  // console.log(scrollTop_el);
  // console.log(height_el);
  // console.log(height_window);
  // console.log(window_scrollTop);

  if (scrollTop_el - 150 < window_scrollTop) {
    // console.log("active", element);
    // console.log(scrollTop_el, window_scrollTop, element);
    return true;
  }

  return false;
}

function calculTotal(baskets = []) {
  const price_produits = baskets.produits.reduce((total, product) => {
    total += product.quantite * product.prix;
    return total;
  }, 0);
  const price_menus = baskets.menus.reduce((total, menu) => {
    total += menu.quantite * menu.prix;
    return total;
  }, 0);
  const price = price_produits + price_menus;

  return +price.toFixed(2);
}

function calculPrixProduitAvecQuantite(product) {
  return +(product.quantite * product.prix).toFixed(2);
}

function splitPrix(prix = 0.0, splitOn = ".", joinWith = "€") {
  return parseFloat(prix).toFixed(2).toString().split(splitOn).join(joinWith);
}

function splitHeures(heures = 0, splitOn = ".") {
  const time = heures.toFixed(2).split(splitOn);
  return {
    heure: time[0],
    minute: time[1],
  };
}

function splitHeuresFormat(heures = 0, splitOn = ".") {
  const time = heures.toFixed(2).split(splitOn);
  return time[0] + "h" + time[1];
}

function joinHeures(hour, minute) {
  const time = hour + "." + minute;
  return parseFloat(time);
}

function getNombresArticles(baskets) {
  return (
    baskets.produits.reduce((total, product) => total + product.quantite, 0) +
    baskets.menus.reduce((total, menu) => total + menu.quantite, 0)
  );
}

// ttc : toutes taxes comprises
function getPrixAvecTTC(prixHT, TVA) {
  const montantTva = prixHT * (TVA / 100);
  const prixTTC = prixHT + montantTva;
  return +prixTTC.toFixed(2);
}

function validateByRestaurant(data, successFn) {
  const d = new Date();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const day = d.getDay();

  if (data) {
    const { ouvert } = data;

    const horaires = { ...data.horaires };

    Object.entries(horaires).forEach(([key, value]) => {
      if (value === 0 || value < 1) {
        const time = "24." + splitHeures(value).minute;
        horaires[key] = parseFloat(time);
      }
    });

    const now = joinHeures(
      hour === 0 ? 24 : hour,
      minutes < 10 ? "0" + minutes : minutes
    );

    //If the restaurant is closed
    if (!ouvert) {
      alert(
        "Nous sommes désolés, le restaurant est actuellement fermé, revenez bientôt !"
      );
    } else if (
      (now < horaires.debut_apres_midi || now > horaires.fin_apres_midi) &&
      (now < horaires.debut_soir || now > horaires.fin_soir)
    ) {
      const debut_soir = splitHeures(horaires.debut_soir);
      const fin_soir = splitHeures(horaires.fin_soir);
      const debut_apres_midi = splitHeures(horaires.debut_apres_midi);
      const fin_apres_midi = splitHeures(horaires.fin_apres_midi);
      alert(
        `Nous sommes désolés, il n'est possible de commander qu'entre ${
          debut_apres_midi.heure
        }h${debut_apres_midi.minute} à ${fin_apres_midi.heure}h${
          fin_apres_midi.minute
        } et ${debut_soir.heure}h${debut_soir.minute} à ${
          fin_soir.heure === "24" ? 0 : fin_soir.heure
        }h${fin_soir.minute}.`
      );
    } else {
      // ok
      successFn();
    }
  }
}

function menuCanBeAdded(debut, fin) {
  const d = new Date();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const day = d.getDay();

  const now = joinHeures(hour, minutes < 10 ? "0" + minutes : minutes);

  if (now < debut || now > fin) {
    alert(
      `Nous sommes désolés, il n'est possible de commander ce menu qu'entre ${splitHeuresFormat(
        debut
      )} et ${splitHeuresFormat(fin)}.`
    );
    return false;
  }
  return true;
}

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

// django with jwt authentication with access token and refresh token
// https://simpleisbetterthancomplex.com/tutorial/2018/12/19/how-to-use-jwt-authentication-with-django-rest-framework.html

async function sendRequest(method, url, data = null, fail_fn = () => {}) {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data || "",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(response.data);
    return [response.data, null];
  } catch (error) {
    // unauthorized
    if (error.response.status === 401) {
      if (error.response.data.code === "user_not_found") {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtTokenRefresh");
        delete axios.defaults.headers["Authorization"];
        fail_fn();
      }

      const refresh_token = localStorage.getItem("jwtTokenRefresh");
      if (refresh_token) {
        try {
          const response = await axios({
            method: "post",
            url: "restaurant/api/token/refresh",
            data: { refresh: refresh_token },
            headers: {
              "Content-Type": "application/json",
            },
          });
          localStorage.setItem("jwtToken", response.data.access);
          axios.defaults.headers["Authorization"] =
            "Bearer " + response.data.access;
          try {
            const response = await axios({
              method: method,
              url: url,
              data: data || "",
              headers: {
                "Content-Type": "application/json",
              },
            });
            return [response.data, null];
          } catch (error) {
            return [null, data];
          }
        } catch (error) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("jwtTokenRefresh");
          delete axios.defaults.headers["Authorization"];
          fail_fn();
        }
      } else {
        localStorage.removeItem("jwtToken");
        delete axios.defaults.headers["Authorization"];
        fail_fn();
      }
    }
    return [null, error];
  }
}

export {
  isIntersecting,
  debounce,
  smoothScroll,
  calculTotal,
  splitPrix,
  splitHeures,
  joinHeures,
  getNombresArticles,
  calculPrixProduitAvecQuantite,
  getPrixAvecTTC,
  validateByRestaurant,
  menuCanBeAdded,
  sendRequest,
  setAuthToken,
};
