import React from 'react'
import { Container, Grid, Input, InputProps, Paper, TextField, Typography } from '@material-ui/core';



type AuthorizationProps = {
    namePlaceHolder: string,
    passwordPlaceHolder?: string
}

export default ({namePlaceHolder, passwordPlaceHolder}: AuthorizationProps) => {

    let inputProps: InputProps = {
        color: 'primary',
        placeholder: namePlaceHolder
    }

    return(
        <div>
            <Container maxWidth="xs">
                <Paper elevation={12}>
                    <Grid container alignContent='center' spacing={3} alignItems="flex-start" direction="column" >                    
                        <Grid item>
                            <Typography align='center' color='primary' variant='h3'>
                                Login
                            </Typography>

                        </Grid>

                        <Grid item>
                            <TextField id="grid_input_username" label="User Name" />
                        </Grid>

                        <Grid item >
                            <TextField id="grid_input_password" label="Password" type='password' />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    )
}

