import { useForm } from "react-hook-form";
import Card from "../../ui/display/Card.jsx";
import FormRow from "../../ui/form/FormRow.jsx";
import Input from "../../ui/form/Input.jsx";
import { useUser } from "./useUser.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../ui/button/Button.jsx";
import FileInput from "../../ui/form/FileInput.jsx";
import { useUpdateUser } from "./useUpdateUser.js";

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
});
function UpdateUserDataForm() {
  const { user } = useUser();

  const {updateUser, isPending} = useUpdateUser();

  const userData = user.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      email: userData.email,
      name: userData.name,
    },
    resolver: yupResolver(schema),
  });

  function handleUpdate(data) {
    const image = data.avatar?.[0];
    const formData = new FormData();
    formData.append("name", data.name);
    if (image) {
      formData.append("avatar", image);
    }
    updateUser(formData);
  }

  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold">Update user data</h2>
      <Card>
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col gap-4"
        >
          <FormRow label={"Email"}>
            <Input type="email" disabled value={userData.email} />
          </FormRow>
          <FormRow label={"Full name"} error={errors?.name?.message}>
            <Input type="text" {...register("name")} />
          </FormRow>
          <FormRow label={"Avatar"} error={errors?.name?.avatar}>
            <FileInput {...register("avatar")} />
          </FormRow>
          <div className="flex items-center justify-end gap-4">
            <Button variant="secondary" type="button" onClick={() => reset()} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>Save</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default UpdateUserDataForm;
