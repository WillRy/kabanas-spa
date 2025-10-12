import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Button from "../ui/button/Button.jsx";
import FormRow from "../ui/form/FormRow.jsx";
import Input from "../ui/form/Input.jsx";
import { api } from "../service/api.js";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Alert from "../ui/alert/Alert.jsx";
import { useNavigate } from "react-router";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: async (data) => {
      return api.post("/auth/login", data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      const message = error?.body?.message || "An error occurred during login.";
      toast.error(message);
    },
  });

  function handleForm(data) {
    mutate(data);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col p-6 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-8">Log in to your account</h1>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="bg-white rounded-md p-8 shadow-sm w-md space-y-4"
      >
        {error && (
          <Alert type="error" align="center">
            {error?.body?.message || "An error occurred during login."}
          </Alert>
        )}
        <FormRow label="Email" error={errors.email?.message}>
          <Input type="email" {...register("email")} />
        </FormRow>
        <FormRow label="Password" error={errors.password?.message}>
          <Input type="password" {...register("password")} />
        </FormRow>

        <Button disabled={isPending} type="submit" full>
          Log In
        </Button>
      </form>
    </div>
  );
}

export default Login;
