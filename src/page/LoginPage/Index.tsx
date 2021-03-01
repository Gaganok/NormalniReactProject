import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RegistrationForm from "../../component/authorization/RegistrationForm";
import LoginForm from "../../component/authorization/LoginForm";
import "./style.scss";
import LoginSlideComponent from "../../component/authorization/LoginSlideComponent";

type LoginProps = {};

const LoginPage: React.FunctionComponent<LoginProps> = ({}: LoginProps) => {
  const [isLogin, setLogin] = useState<boolean>(false);
  const [isPreload, setPreload] = useState<boolean>(true);

  const slideProps = {
    isLogin,
    isPreload,
    slideClickCallback: () => {
      isPreload && setPreload(false);
      setLogin(!isLogin);
    },
  };

  return (
    <div className="container">
      <div
        className={`container__content container__content--absolute container__content--${isLogin ? "shown" : "hidden"}`}
      >
        <LoginForm />
      </div>

      {isLogin || isPreload ? (
        <LoginSlideComponent
          title="Already Signed Up?"
          caption="Log in to your account so you can continue building and editing your stuff."
          buttonText="Log In"
          {...slideProps}
        />
      ) : (
        <LoginSlideComponent
          title="Don't Have an Account Yet?"
          caption="Let's get you all set up so you can start creating your first onboarding experience"
          buttonText="Sign Up"
          {...slideProps}
        />
      )}

      {/* <div className={`right login_content ${isLogin ? "hide" : "show"}`}> */}
      <div className={`container__content container__content--${!isLogin ? "shown" : "hidden"}`}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default LoginPage;
