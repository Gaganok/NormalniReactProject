import React from 'react'
import { Button, Container, Grid, Input, InputProps, Paper, TextField, Typography } from '@material-ui/core';


export default () => {

    return(
        <div>
            <Container maxWidth="xs">
                <Paper elevation={12}>
                    <Grid container alignContent='center' spacing={3} alignItems="flex-start" direction="column" >                    
                        <Grid item>
                            <TextField id="first_name" label="First Name" />
                            <TextField id="last_name" label="Last Name" />
                        </Grid>

                        <Grid item >
                            <TextField id="email" label="Email" type='email' />
                        </Grid>

                        <Grid item >
                            <TextField id="password" label="Password" type='password' />
                        </Grid>
                        
                        <Grid item >
                            <Button 
                                variant="contained" 
                                size='small' 
                                color='primary'>Submit</Button>  
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    )
}

