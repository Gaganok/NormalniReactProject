import React from 'react'
import { Container, Grid, Input, InputProps, Paper, TextField, Typography } from '@material-ui/core';

type LoginProps = {}

export default ({}: LoginProps) => {

    let inputProps: InputProps = {
        color: 'primary',
    }

    return(
        <div>
            <Container maxWidth="xs">
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
            </Container>
        </div>
    )
}

