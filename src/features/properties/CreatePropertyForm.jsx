import { useForm } from "react-hook-form";
import FormRow from "../../ui/form/FormRow.jsx";
import Input from "../../ui/form/Input.jsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "../../ui/form/TextArea.jsx";
import FileInput from "../../ui/form/FileInput.jsx";
import Button from "../../ui/button/Button.jsx";
import { useCreateProperty } from "./useCreateProperty.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import useEditProperty from "./useEditProperty.js";

const schema = yup.object({
  name: yup.string().required("Property name is required"),
  maxCapacity: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Max capacity is required")
    .min(1, "At least 1"),
  regularPrice: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Regular price is required")
    .min(1, "At least 1"),
  discount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, "At least 0")
    .default(0)
    .nullable(),
  description: yup.string().required("Description is required"),
  image: yup.mixed().nullable(),
});

export default function CreatePropertyForm({
  propertyToEdit = {},
  onCloseModal,
}) {
  const { id: editId, ...editValues } = propertyToEdit;

  const isEditSession = Boolean(editId);


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isEditSession ? editValues : {},
  });

  const { createProperty, isCreatingProperty } = useCreateProperty();
  const { editProperty, isEditingProperty } = useEditProperty();

  const isWorking = isCreatingProperty || isEditingProperty;

  function handleForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image?.[0];

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      let val = value || "";

      if (key === "image" && image instanceof File) {
        formData.append(key, image);
      }

      if (key !== "image") formData.append(key, val);
    });

    if (isEditSession) {
      editProperty(
        { data: formData, id: editId },
        {
          onSuccess() {
            onCloseModal?.();
          },
        }
      );
      return;
    }

    createProperty(
      { data: formData },
      {
        onSuccess() {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <div className="w-[30rem]">
      <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
        <FormRow label={"Property Name"} error={errors.name?.message}>
          <Input name="name" {...register("name")} />
        </FormRow>
        <FormRow label={"Maximum Capacity"} error={errors.maxCapacity?.message}>
          <Input name="maxCapacity" {...register("maxCapacity")} />
        </FormRow>
        <FormRow label={"Regular Price"} error={errors.regularPrice?.message}>
          <Input name="regularPrice" {...register("regularPrice")} />
        </FormRow>
        <FormRow label={"Discount"} error={errors.discount?.message}>
          <Input name="discount" {...register("discount")} />
        </FormRow>
        <FormRow label={"Description"} error={errors.description?.message}>
          <TextArea name="description" {...register("description")} />
        </FormRow>
        <FormRow label={"Image"} error={errors.description?.image}>
          <FileInput name="image" accept="image/*" {...register("image")} />
        </FormRow>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="secondary"
            className="basis-[100px]"
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="basis-[100px]"
            disabled={isWorking}
          >
            {isWorking && <SpinnerMini />}Save
          </Button>
        </div>
      </form>
    </div>
  );
}
