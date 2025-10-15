import { useForm } from "react-hook-form";
import Card from "../../ui/display/Card.jsx";
import FormRow from "../../ui/form/FormRow.jsx";
import Input from "../../ui/form/Input.jsx";
import Spinner from "../../ui/Spinner.jsx";
import { useSettings } from "./useSettings.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../ui/button/Button.jsx";
import { useEffect } from "react";
import { useUpdateSettings } from "./useUpdateSettings.js";

const schema = yup.object({
  minBookingLength: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(),
  maxBookingLength: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(),
  maxGuestsPerBooking: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(),
  breakfastPrice: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(),
});

function UpdateSettingsForm() {
  const { settings, isPending } = useSettings();

  const { updateSettings, isUpdating } = useUpdateSettings();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      minBookingLength: settings?.data?.minBookingLength || 1,
      maxBookingLength: settings?.data?.maxBookingLength || 3,
      maxGuestsPerBooking: settings?.data?.maxGuestsPerBooking || 10,
      breakfastPrice: settings?.data?.breakfastPrice || 0,
    },
  });

  useEffect (() => {
    if (settings?.data) {
      setValue('minBookingLength', settings.data.minBookingLength);
      setValue('maxBookingLength', settings.data.maxBookingLength);
      setValue('maxGuestsPerBooking', settings.data.maxGuestsPerBooking);
      setValue('breakfastPrice', settings.data.breakfastPrice);
    }
  }, [settings, setValue]);

  

  function handleUpdateSettings(data) {
    console.log(data);
    updateSettings(data);
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-3xl mb-4 font-semibold">Update hotel settings</h1>
      <Card
        className={
          "flex flex-col divide-y divide-gray-200 dark:divide-gray-700 max-w-4xl"
        }
      >
        <form onSubmit={handleSubmit(handleUpdateSettings)}>
          <div className="py-4">
            <FormRow
              label="Minimum nights/booking"
              error={errors.minBookingLength?.message}
            >
              <Input type="number" {...register("minBookingLength")} />
            </FormRow>
          </div>
          <div className="py-4">
            <FormRow
              label="Maximum nights/booking"
              error={errors.maxBookingLength?.message}
            >
              <Input type="number" {...register("maxBookingLength")} />
            </FormRow>
          </div>
          <div className="py-4">
            <FormRow
              label="Maximum guests/booking"
              error={errors.maxGuestsPerBooking?.message}
            >
              <Input type="number" {...register("maxGuestsPerBooking")} />
            </FormRow>
          </div>
          <div className="py-4">
            <FormRow
              label="Breakfast price"
              error={errors.breakfastPrice?.message}
            >
              <Input type="number" {...register("breakfastPrice")} />
            </FormRow>
          </div>
          <Button type="submit" disabled={isUpdating}>Submit</Button>
        </form>
      </Card>
    </div>
  );
}

export default UpdateSettingsForm;
