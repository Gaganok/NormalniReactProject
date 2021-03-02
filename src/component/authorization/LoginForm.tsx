/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import {
  Container,
  Grid,
  Input,
  InputProps,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import SocialIcons from "../social/SocialIcons";

type LoginProps = {};

export default ({}: LoginProps) => {
  let inputProps: InputProps = {
    color: "primary",
  };

  return (
    <div>
      <Container maxWidth="xs">
        <Grid
          container
          alignContent="center"
          spacing={3}
          direction="column"
        >
          <Grid item>
            <Typography align="center" color="primary" variant="h3">
              Login
            </Typography>
          </Grid>

          <Grid item>
            <TextField id="grid_input_username" label="User Name" fullWidth/>
          </Grid>

          <Grid item>
            <TextField
              id="grid_input_password"
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item>
            <SocialIcons />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
