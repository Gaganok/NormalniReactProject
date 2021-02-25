import { Button, Container, TextField, Typography } from '@material-ui/core'
import React from 'react'
import RegistrationForm from '../../component/authorization/RegistrationForm'
import './style.scss'

type LoginProps = {

}

const LoginPage: React.FunctionComponent<LoginProps>  = ({}: LoginProps) =>{
    return(
        <div className='login_page'>
            <div className='left'>
                <Typography>
                    Already Signed Up?
                </Typography>

                <Typography>
                    Log in to your account so you can continue
                    building and editing your stuff.
                </Typography>

                <Button 
                    variant="contained" 
                    size='small' 
                    color='primary'>
                    Log In
                </Button>
            </div>

            <div className='right'>
                <Typography>
                    Sign Up for an Account 
                </Typography>

                <Typography>
                    Lets get started!
                </Typography>


                <RegistrationForm/>              

            </div>
        </div>
    )
}  

export default LoginPage;

// {
//     /*
//     LeftSide:{
//         <Typography Title>Already Signed Up </Typography>
//         <Typography Captcha> ... </Typography>
//         <Button>Log In</Button>
//     }
//     RightSide:{
//         <Typography Title>Sign Up for an Account</Typography>
//         <Typography Captcha>...</Typography>
//         <RegistrationForm> {
//             firsname surname
//             username
//             email
//             password
//             accept term and condition 
//             <Button>
//         }
//         <GoogleFacebookTwitter>


//         <Button>Log In</Button>
//     }


//     */
// }