import React from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center',
    display:'flex',
    justifyContent:'center',
    alignContent:"center"
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="xs" className={classes.root}>
        <Grid
          container
          xs={8}
          alignContent="center"
          spacing={2}
          alignItems="flex-start"
          justify="space-between"
          className={classes.root}
        >
          <Grid item xs={12}>
            <Typography>Sign Up for an Account </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>Lets get started!</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField id="first_name" label="First Name" />
          </Grid>

          <Grid item xs={6}>
            <TextField id="last_name" label="Last Name" />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              type="email"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              size='large'
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
