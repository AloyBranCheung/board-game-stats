// next-navigate
import { useRouter } from "next/router";
// react-hook-form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// mui
import { Button, CircularProgress } from "@mui/material";
// components
import Input from "src/components/UI/form-components/Input";
import CopyIcon from "./UI/Icons/CopyIcon";
// custom hooks
import useFirebaseAuth from "src/hooks/useFirebaseAuth";
// types/validators
import { z } from "zod";
import loginSchema from "src/validators/LoginValidation";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, isError } = useFirebaseAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data.email, data.password);
    router.replace("/");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <form className="mb-12 flex flex-col items-center gap-5">
        <Input
          isError={
            typeof errors.email?.message === "string" || (isError && true)
          }
          errorMessage={errors.email?.message}
          name="email"
          control={control}
          label="Email"
        />
        <Input
          isError={
            typeof errors.password?.message === "string" || (isError && true)
          }
          errorMessage={errors.password?.message}
          name="password"
          inputType="password"
          control={control}
          label="Password"
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            onClick={handleSubmit(handleFormSubmit)}
            className="w-full bg-blue-600"
            variant="contained"
          >
            Login
          </Button>
        )}
      </form>
      <div className="flex flex-col gap-2 items-center justify-center">
        <p>Don&apos;t have an account? No worries use the demo account.</p>
        <div className="border-2 border-solid border-black rounded-xl p-1">
          <CopyIcon label="user: demo@demo.com" value="demo@demo.com" />
          <CopyIcon
            label="pass: IIBVT(jIjf,z,nyJR(Ez"
            value="IIBVT(jIjf,z,nyJR(Ez"
          />
        </div>
        <p>Want a personal one? Message me on Github.</p>
      </div>
    </div>
  );
}
