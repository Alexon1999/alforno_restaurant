import React from "react";

import useForm from "../../../hooks/useForm";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "../../../axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "3rem auto",
  },
  margin: {
    margin: theme.spacing(4, 1),
  },
}));

const Login = () => {
  const classes = useStyles();
  // const [admin, setAdmin] = useState(false);

  const { state, handleInputChange, errors, setErrors } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const { username, email, password } = state;

  const history = useHistory();

  // useEffect(() => {
  //   const unSubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setAdmin(authUser);
  //     } else {
  //       setAdmin(null);
  //     }
  //   });
  //   return () => {
  //     unSubscribe();
  //   };
  // }, []);

  const seConnecter = async (e) => {
    e.preventDefault();

    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .catch((err) => alert(err.message));

    if (username && password) {
      await axios({
        url: "restaurant/api/token",
        method: "post",
        //headers: {'Access-Control-Allow-Origin': '*'},
        data: { username, password },
      })
        .then((res) => {
          // extract token from res.data
          const { access, refresh } = res.data;
          // store the token in the localStorage
          localStorage.setItem("jwtToken", access);
          localStorage.setItem("jwtTokenRefresh", refresh);
          // set our token in header ***
          // decode token on React
          // // const decoded = jwt_decode(token);
          // dispatch to our securityReducer
          history.push("/admin");
        })
        .catch((err) => {
          setErrors(err.response.data);
        });
    }
  };

  return (
    <div
      style={{
        height: "92vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <form
        noValidate
        autoComplete='off'
        className={classes.root}
        onSubmit={seConnecter}>
        {/* <FormControl fullWidth className={classes.margin}>
              <InputLabel>Adresse Mail</InputLabel>
              <Input
                type='email'
                name='email'
                onChange={handleInputChange}
                value={email}
                required
              />
            </FormControl> */}
        <FormControl fullWidth className={classes.margin}>
          <InputLabel>Utilisateur</InputLabel>
          <Input
            type='username'
            name='username'
            onChange={handleInputChange}
            value={username}
            required
          />
        </FormControl>

        <FormControl fullWidth className={classes.margin}>
          <TextField
            id='filled-password-input'
            name='password'
            label='Password'
            type='password'
            autoComplete='current-password'
            variant='filled'
            onChange={handleInputChange}
            value={password}
            required
          />
        </FormControl>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          style={{
            display: "flex",
            margin: "10px auto",
            textAlign: "center",
            background: "rgb(77, 76, 76)",
          }}>
          Se connecter
        </Button>

        <div
          className='error'
          style={{ textAlign: "center", marginTop: "1rem" }}>
          {errors.detail}
        </div>
      </form>
    </div>
  );
};

export default Login;
