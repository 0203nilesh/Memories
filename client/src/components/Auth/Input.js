import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const Input = ({ name, label ,handleChange, handleShowPassword, autoFocus,type, half }) => {
  return (
    <>
      <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
          name={name}
          label={label}
          onChange={handleChange} 
          variant="outlined"
          autoFocus={autoFocus}
          required
          xs={6}
          type={type}
          InputProps={name=== 'password' ? {
              endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                        {type==='password'? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            )
        }: null }
        fullWidth={true}
        />
      </Grid>
    </>
  );
};
