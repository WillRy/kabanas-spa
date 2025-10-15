import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUpdateUser } from "./useUpdateUser.js";
import Card from "../../ui/display/Card.jsx";
import FormRow from "../../ui/form/FormRow.jsx";
import Input from "../../ui/form/Input.jsx";
import Button from "../../ui/button/Button.jsx";

const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function UpdatePasswordForm() {
  const { updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  function handleUpdate(data) {
    const formData = new FormData();
    formData.append("password", data.password);
    updateUser(formData, {
        onSuccess: () => reset(),
    });
  }

  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold">Update password</h2>
      <Card>
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col gap-4"
        >
          <FormRow label={"Password"} error={errors?.password?.message}>
            <Input type="password" {...register("password")} />
          </FormRow>
          <FormRow
            label={"Confirm Password"}
            error={errors?.passwordConfirm?.message}
          >
            <Input type="password" {...register("passwordConfirm")} />
          </FormRow>
          <div className="flex items-center justify-end gap-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => reset()}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
