import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import NavBarContextProvider from "./contexts/Navbar/NavBarState";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import Commander from "./pages/Commander";
import Panier from "./pages/Panier";
import Contact from "./pages/Contact";
import Alerts from "./components/alert/Alerts";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// + Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Paiement from "./pages/Paiement";
import Felicitation from "./pages/Felicitation";
import Admin from "./components/admin";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addInfo } from "./app/Redux-slices/infoRestaurantSlice";
import Login from "./components/admin/login";
import SecuredRoute from "./components/SecuredRoute";
import { setAuthToken } from "./utilities";

// publish key c'est pour identifier votre compte stripe, ce n'est pas un secret key
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISH_KEY ||
    "pk_test_51IIvIiJnUZH8vWLUUchVy18GC4RMwtaLZPxLWWsroa6WPrml7zUkSHS1zqbo2nr9qIrgzZuBhjIiAfuecpbKWsqL00LTFHUPLH"
);

// if (localStorage.jwtToken) {
//   setAuthToken(localStorage.jwtToken);
// }

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const get_info_restaurant = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/restaurant/info_restaurant/1"
      );
      dispatch(addInfo(data));
    };

    let timeoutId;
    if (!pathname.includes("/admin")) {
      function getLatestData() {
        get_info_restaurant();

        // wait for the response from fetchCommandes , before we recall it (delay of 1minute)
        timeoutId = setTimeout(getLatestData, 1000 * 60);
      }
      getLatestData();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, pathname]);

  return (
    <div className='App'>
      <Alerts />
      <NavBarContextProvider>
        <NavBar />
      </NavBarContextProvider>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/commander' component={Commander} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/panier' component={Panier} />
        <Route exact path='/paiement'>
          <Elements stripe={stripePromise}>
            <Paiement />
          </Elements>
        </Route>
        <Route exact path='/felicitation' component={Felicitation} />
        <Route exact path='/login' component={Login} />
        <SecuredRoute path='/admin' component={Admin} />
        <Route exact component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
