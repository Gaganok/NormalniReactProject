import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RegistrationForm from "../../component/authorization/RegistrationForm";
import LoginForm from "../../component/authorization/LoginForm";
import "./style.scss";

type LoginProps = {};

const LoginPage: React.FunctionComponent<LoginProps> = ({}: LoginProps) => {
  const [isLogin, setLogin] = useState<boolean>(false);
  const [isPreload, setPreload] = useState<boolean>(true);

  return (
    <div className="login_page">
      <div className={`login_content login_form ${isLogin ? 'show' : 'hide'}`}>
        <LoginForm />
      </div>

      <div id='slide' className={`login_content left ${isPreload ? "" : isLogin ? 'slide_right' : 'slide_left'}`}>
        <Typography>Already Signed Up?</Typography>

        <Typography>
          Log in to your account so you can continue building and editing your
          stuff.
        </Typography>

        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => {
              isPreload && setPreload(false)
              setLogin(!isLogin)
          }}
        >
          Log In
        </Button>
   
      </div>

      <div className={`right login_content ${isLogin ? 'hide' : 'show'}`}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default LoginPage;
