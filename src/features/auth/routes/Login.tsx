import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
// import Header from "../../../components/Header";

// import CompanyModel from "../../company/types/Company";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Close, TimesOneMobiledata } from "@mui/icons-material";
// import { login } from "../../../services/auth.service";
import { UserModel } from "../types";
import { useLogin } from "../../../lib/auth";
import { Helmet } from "react-helmet-async";
import Header from "../../../components/Header";
// import { useLogin, useUser } from "../../../lib/auth";

export function Login() {
  // const loginHook = useLogin();
  const loginMutation = useLogin();
  const [snack, setSnack] = useState(false);

  const { register, handleSubmit, watch, formState, reset, control } =
    useForm<UserModel>({
      mode: "onBlur",
    });

  const onSubmit: SubmitHandler<UserModel> = (data) => {
    loginMutation.mutate({ username: data.username, password: data.password });
  };

  return (
    <>
      <Helmet title="Fleeticket | Login" />
      {/* <Header title={"Login"} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack my={18} sx={{ maxWidth: "sm" }} mx="auto" spacing={5}>
          <Typography
            variant="h1"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            color="primary"
            mx="auto"
          >
            FLEETICKET
          </Typography>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                variant="outlined"
                error={!!formState.errors.username}
                helperText={formState.errors.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Mot de passe"
                variant="outlined"
                {...register("password")}
                error={!!formState.errors.password}
                helperText={formState.errors.password?.message}
              />
            )}
          />
          <Button type="submit" color="primary" variant="contained">
            se connecter
          </Button>
        </Stack>
      </form>
    </>
  );
}
