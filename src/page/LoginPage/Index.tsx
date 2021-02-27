import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import RegistrationForm from "../../component/authorization/RegistrationForm";
import LoginForm from "../../component/authorization/LoginForm";
import "./style.scss";

type LoginProps = {};

// const loginFormRef: React.RefObject<HTMLDivElement> = React.createRef();
// const slideFormRef: React.RefObject<HTMLDivElement> = React.createRef();
// const registrationFormRef: React.RefObject<HTMLDivElement> = React.createRef();

const LoginPage: React.FunctionComponent<LoginProps> = ({}: LoginProps) => {
  const [isLogin, setLogin] = useState<boolean>(false);
  const [classes, setClasses] = useState<any>({
    registration: "right login_content",
    login: "login_content login_form",
    slide: "login_content left",
  })


//   let classes = {
//     registration: "right login_content",
//     login: "login_content login_form",
//     slide: "login_content left",
//   };

  

  function runAnimation(): void {
    const currentLoginState = !isLogin;

    console.log(classes)

    setClasses(currentLoginState
      ? {
          registration: "right login_content hide",
          login: "login_content login_form show",
          slide: "login_content left slide_right",
        }
      : {
          registration: "right login_content show",
          login: "login_content login_form hide",
          slide: "login_content left slide_left",
        });


    console.log(classes)
    setLogin(currentLoginState);

    // const loginDiv: HTMLDivElement = loginFormRef.current
    // const slideDiv: HTMLDivElement = slideFormRef.current
    // const registrationDiv: HTMLDivElement = registrationFormRef.current

    // loginDiv
  }

  return (
    <div className="login_page">
      <div className={classes["login"]}>
        <LoginForm />
      </div>

      <div className={classes["slide"]}>
        <Typography>Already Signed Up?</Typography>

        <Typography>
          Log in to your account so you can continue building and editing your
          stuff.
        </Typography>

        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            console.log("ddd");
            runAnimation();
          }}
        >
          Log In
        </Button>
   
      </div>

      <div className={classes["registration"]}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default LoginPage;
