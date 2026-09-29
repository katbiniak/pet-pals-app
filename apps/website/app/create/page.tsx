"use client";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from "@/components/atoms/Field";
import { Input } from "@/components/atoms/Input";
import { NavHeader } from "@/components/molecules/NavHeader";
import { Select, SelectContent, SelectTrigger, SelectGroup, SelectItem, SelectValue, } from "@/components/atoms/Select";
import { useGetAnimalTypes, minDate, useCreateBooking, Booking, useGetPricing } from '@pet-pals/shared'
import { Button } from "@/components/atoms/Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

export default function Create() {
  const { animalTypes, fetchError } = useGetAnimalTypes();
  const { fetchError:priceFetchError, calculateTotalPrice, totalPrice, setTotalPrice } = useGetPricing();
  const { fetchError:createFetchError, createBooking } = useCreateBooking();

  const createBookingSchema = z.object({
    firstName: z.string().min(1, 'Please enter your First Name'),
    lastName: z.string().min(1, 'Please enter your Last Name'),
    petName: z.string().min(1, 'Please enter your Pet\'s Name'),
    animalType: z.enum(animalTypes, 'Please select your pet\'s animal type.'),
    hours: z.coerce.number<number>().min(2, "Please enter a number between 2 - 8.").max(8, "Please enter a number between 2 - 8."),
    date: z.coerce.date<Date>().min(new Date(minDate()), "Please select a date in the future." )
  })

  type BookingFormData = z.infer<typeof createBookingSchema>;

  // Known type issue, used to fix controlled input error but not force placeholder values
  const form = useForm({
      resolver: zodResolver(createBookingSchema),
      mode: "onChange",
      defaultValues: {
        firstName: "",
        lastName: "",
        petName: "",
        animalType: "",
        hours: "",
        date: ""
      },
  });

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    if (!priceFetchError && totalPrice && totalPrice > 0) {
      const dateToString = data.date.toISOString().split('T')[0];

      const formData:Omit<Booking, "id">= {
        'first_name': data.firstName,
        'last_name': data.lastName,
        'animal_name': data.petName,
        'animal_type': data.animalType,
        hours: data.hours,
        'service_date': dateToString,
        'total_price': totalPrice,
        completed: false
      }
      await createBooking(formData);

      if (createFetchError) {
        console.warn("Booking failed to be created: ", createFetchError);
        return;
      }

      form.reset(); // Clear the form
      setTotalPrice(0);
    }
  };

  React.useEffect(() => {
    const totalPriceSubscribe = form.subscribe({
      name: ['animalType', 'hours'],
      formState: {
        values: true
      },
      callback: ({ values }) => {
        // Calculate the total price once animal type and hours are selected
        // Update price each time they are changed getting the latest values
        const currentAnimalType = values["animalType"];
        const currentHours = values["hours"];
        if (currentAnimalType && currentHours && currentHours <= 8 && currentHours >= 2) {
          calculateTotalPrice(currentAnimalType, currentHours);
        }
      }
    })

    return () => totalPriceSubscribe()
  },[form.subscribe])

  return (
    <main className="w-full h-full pb-8">
      <NavHeader />
      <div className="w-full h-full flex justify-center">
        <div  className="w-full max-w-240 px-8 lg:px-0 flex flex-col gap-6">
          <h1 className="text-charcoal text-4xl text-center pt-6">Create New Booking</h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet className="w-full gap-6">
              <FieldTitle>Owner Info</FieldTitle>
              <FieldGroup>
                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field >
                      <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                      <Input {...field} id="firstName" type="text" placeholder="" />
                      {fieldState.invalid && (
                        <FieldError error={fieldState.error?.message || ''} />
                      )}
                    </Field>
                    )}
                />
                <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <Input {...field} id="lastName" type="text" placeholder="" />
                    {fieldState.invalid && (
                        <FieldError error={fieldState.error?.message || ''} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldSeparator />
              <FieldTitle>Pet Info</FieldTitle>
              <FieldGroup>
                <Controller
                  name="petName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="petName">Pet Name</FieldLabel>
                      <Input {...field} id="petName" type="text" placeholder="" />
                    {fieldState.invalid && (
                        <FieldError error={fieldState.error?.message || ''} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="animalType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Animal Type</FieldLabel>
                      <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!!fetchError || animalTypes.length === 0}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose pet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {animalTypes.length > 0 &&
                              animalTypes.map((animalType) => (
                                <SelectItem key={animalType} value={animalType}>
                                  {animalType.charAt(0).toUpperCase() + animalType.slice(1)}
                                </SelectItem>
                              ))
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError error={fieldState.error?.message || ''} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldSeparator />
              <FieldTitle>Booking Info</FieldTitle>
              <FieldGroup>
                <Controller
                  name="hours"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="hours">Hours Requested</FieldLabel>
                      <Input {...field}
                        id="hours"
                        type="number"
                        placeholder="Min 2 hrs, Max 8 hrs"
                        maxLength={1}
                        min={2}
                        max={8}
                        />
                      {fieldState.invalid && (
                        <FieldError error={fieldState.error?.message || ''} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="date">Date of Service</FieldLabel>
                      <Input
                        {...field} 
                        id="date"
                        type="date"
                        placeholder=""
                        min={minDate()}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split('T')[0]
                            : field.value
                        }
                        />
                      {fieldState.invalid && (
                        <FieldError error={fieldState.error?.message || ''} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldSeparator />
              <FieldGroup className="flex-col md:flex-row md:justify-between items-center">
                <div className="flex flex-row justify-between shrink-0 text-charcoal text-2xl gap-8">
                  <p className="shrink-0">Total Price:</p>
                  {!priceFetchError && totalPrice && totalPrice > 0 && <p>{`$${totalPrice}` || ''}</p> }
                </div>
                <Field className="w-fit">
                  <Button type="submit" buttonVariant="primary">Submit</Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </div>
      </div>
    </main>
  );
}