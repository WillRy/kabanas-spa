import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { useSetErrors } from "../../hooks/useSetErrors.js";
import { api } from "../../service/api.js";
import Button from "../../ui/button/Button.jsx";
import Card from "../../ui/display/Card.jsx";
import AsyncSearch from "../../ui/form/AsyncSearch.jsx";
import DateRange from "../../ui/form/DateRange.jsx";
import FormRow from "../../ui/form/FormRow.jsx";
import TextArea from "../../ui/form/TextArea.jsx";
import Table from "../../ui/table/Table.jsx";
import { useBookingCreation } from "./useBookingCreation.js";

const schema = yup.object({
  property: yup.object().nullable().required("Property is required"),
  period: yup
    .array()
    .of(yup.date())
    .test("dateRange", "Start date and end date are required", (value) => {
      return value?.[0] && value?.[1];
    }),
  guests: yup.array().min(1, "At least one guest is required"),
  observations: yup
    .string()
    .optional()
    .nullable()
    .max(500, "Observations cannot exceed 500 characters"),
});

function BookingCreationForm() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, defaultValues },
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      property: null,
      dateRange: [null, null],
      guests: [],
      observations: "",
    },
  });
  const { replace: replaceGuests } = useFieldArray({
    control: control,
    name: "guests",
  });

  const guests = getValues("guests");

  const { createBooking, isCreating, error } = useBookingCreation();
  useSetErrors(error, setError, [["startDate", "period"], ["endDate", "period"]]);

  const [guest, setGuest] = useState(null);
  const [excludedDates, setExcludedDates] = useState([]);
  const guestSelectRef = useRef();

  const [isSearching, setIsSearching] = useState(false);


  async function loadGuests(inputValue) {
    try {
      setIsSearching(true);
      const response = await api.get(
        `/guest/autocomplete?search=${inputValue}`
      );

      return (response?.data || [])
        .map((guest) => ({
          value: guest.id,
          label: guest.name,
          ...guest,
        }))
        .filter((guest) => {
          return !getValues("guests").find((g) => g.name === guest.value);
        });
    } catch {
      return [];
    } finally {
      setIsSearching(false);
    }
  }

  async function loadProperties(inputValue) {
    try {
      setIsSearching(true);

      const response = await api.get(
        `/property/autocomplete?search=${inputValue}`
      );

      return (response?.data || []).map((property) => ({
        value: property.id,
        label: property.name,
      }));
    } catch {
      return [];
    } finally {
      setIsSearching(false);
    }
  }

  async function loadUnavaibleDates(property) {
    try {
      if (!property) return [];

      setIsSearching(true);

      const response = await api.get(
        `/property/${property.value}/unavailable-dates`
      );

      const unavailableDates = (response?.data || []).map(
        (dateStr) => new Date(dateStr)
      );

      setExcludedDates(unavailableDates);
    } catch {
      return [];
    } finally {
      setIsSearching(false);
    }
  }

  async function onSelectProperty(option) {
    setValue("period", [null, null]);

    await loadUnavaibleDates(option);
  }

  async function onSelectGuest(option) {
    if (!option) {
      return;
    }

    setGuest(option);

    if (!guests.find((g) => g.value === option.value)) {
      replaceGuests([...guests, option]);
    }

    setGuest(null);
  }

  function onSubmit(data) {
    createBooking(
      {
        startDate: data.period[0],
        endDate: data.period[1],
        observation: data.observations,
        numGuests: guests.length,
        guest_id: guests.map((guest) => guest.value)[0],
        property_id: data.property.value,
      },
      {
        onSuccess: () => {
          reset(defaultValues);
          setExcludedDates([]);
        },
      }
    );
  }

  function cancelCreation() {
    reset(defaultValues);
    setExcludedDates([]);
    navigate("/bookings");
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-4">
        <h1 className="text-3xl mb-4 font-semibold">New Booking</h1>
      </div>
      <div className="space-y-4">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 basis-[200px]">
                <FormRow label={"Properties"} error={errors.property?.message}>
                  <Controller
                    control={control}
                    name="property"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <AsyncSearch
                        load={loadProperties}
                        isClearable={true}
                        selected={value}
                        onBlur={onBlur}
                        ref={ref}
                        onChange={(option) => {
                          onSelectProperty(option);
                          onChange(option);
                        }}
                      />
                    )}
                  />
                </FormRow>
              </div>
              <div className="flex-1 basis-[200px]">
                <FormRow label={"Period"} error={errors.period?.message}>
                  <Controller
                    control={control}
                    name="period"
                    render={({ field: { onChange, value } }) => (
                      <DateRange
                        startDate={value?.[0]}
                        endDate={value?.[1]}
                        setDateRange={(range) => {
                          onChange(range);
                        }}
                        excludeDates={excludedDates}
                        selectsDisabledDaysInRange
                        disabled={isSearching}
                      />
                    )}
                  />
                </FormRow>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap space-y-4">
                <div className="w-full">
                  <FormRow label={"Add Guest"} error={errors.guests?.message}>
                    <AsyncSearch
                      ref={guestSelectRef}
                      load={loadGuests}
                      isClearable={true}
                      value={guest}
                      onChange={onSelectGuest}
                    />
                  </FormRow>
                </div>
                <div className="flex-1">
                  <Table columns={"1fr 1fr"}>
                    <Table.Header>
                      <div>Name</div>
                      <div>E-mail</div>
                    </Table.Header>
                    <Table.Body
                      data={guests || []}
                      render={(guest) => (
                        <Table.Row key={guest.value}>
                          <div>{guest.label}</div>
                          <div>{guest.email}</div>
                        </Table.Row>
                      )}
                    />
                  </Table>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <FormRow label={"Observations"}>
                <TextArea
                  {...register("observations")}
                  rows={4}
                  placeholder="Additional observations about the booking..."
                />
              </FormRow>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                type="button"
                onClick={cancelCreation}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                Save
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default BookingCreationForm;
