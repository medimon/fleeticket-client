import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Header from "../../../components/Header";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCreateTicket } from "../api/createTicket";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Helmet } from "react-helmet-async";

type CreateTicketDto = {
  title: string;
  description: string;
  deadline: Date;
};

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Ce champ est obligatoire")
    .min(5, "Le titre doit comporter au moins 5 caractères")
    .max(100, "Le titre est trop long"),
  description: yup
    .string()
    .required("Ce champ est obligatoire")
    .min(25, "La description est trop courte"),
  deadline: yup.date().required(),
});

export default function AddTicket() {
  const createTicketMutation = useCreateTicket();
  const { register, handleSubmit, watch, formState, reset, control } =
    useForm<CreateTicketDto>({
      mode: "all",
      resolver: yupResolver(schema),
    });

  const submitFn: SubmitHandler<CreateTicketDto> = (data) => {
    createTicketMutation.mutateAsync({ data });
  };

  return (
    <Box my={2} mx={"auto"} sx={{ maxWidth: "md" }}>
      <Helmet title="Fleeticket | Ajouter un nouveau ticket" />
      <Header title="Ajouter un nouveau ticket :" />

      <form onSubmit={handleSubmit(submitFn)}>
        <Box display="grid" gap="30px">
          <TextField
            label="Titre"
            {...register("title")}
            error={!!formState.errors.title}
            helperText={formState.errors.title?.message}
          />
          <TextField
            label="Description"
            {...register("description")}
            multiline
            rows={6}
            maxRows={9}
            error={!!formState.errors.description}
            helperText={formState.errors.description?.message}
          />
          <Controller
            name="deadline"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Deadline"
                onChange={onChange}
                value={dayjs(value)}
              />
            )}
          ></Controller>
          <Button type="submit" color="primary" variant="contained">
            Sauvegarder
          </Button>
        </Box>
      </form>
    </Box>
  );
}
