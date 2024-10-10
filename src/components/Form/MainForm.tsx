import React, { useState } from "react";
import FormHeading from "./FormHeading";
import FormDetail from "./FormDetail";
import FormImage from "./FormImage";
import eventImage from "../../assets/form-image.png";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Schema for form validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  rollNumber: z.string().min(1, { message: "Roll Number is required" }),
  contactNumber: z
    .string()
    .min(10, { message: "Contact number must be 10 digits" })
    .max(10, { message: "Contact number must be 10 digits" }),
  branch: z.string().min(1, { message: "Branch is required" }),
  year: z.enum(["1", "2", "3", "4"], { message: "Year is required" }),
  queries: z.string().optional(),
});

const MainForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Box position={"relative"} marginBlockStart={20} marginX={1}>
      <FormImage imageSrc={eventImage} altText="Event" />
      <FormHeading text="BVEST 2024" />
      <FormDetail details="Join us for an exciting event filled with insightful sessions and networking opportunities." />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          <FormErrorMessage>
            {errors.name?.message && typeof errors.name.message === "string"
              ? errors.name.message
              : ""}
          </FormErrorMessage>
        </FormControl>

        {/* Email */}
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <FormErrorMessage>
            {errors.email?.message && typeof errors.email.message === "string"
              ? errors.email.message
              : ""}
          </FormErrorMessage>
        </FormControl>

        {/* Roll Number */}
        <FormControl isInvalid={!!errors.rollNumber}>
          <FormLabel>Roll Number</FormLabel>
          <Input
            type="text"
            placeholder="Enter your roll number"
            {...register("rollNumber")}
          />
          <FormErrorMessage>
            {errors.rollNumber?.message &&
            typeof errors.rollNumber.message === "string"
              ? errors.rollNumber.message
              : ""}
          </FormErrorMessage>
        </FormControl>

        {/* Contact Number */}
        <FormControl isInvalid={!!errors.contactNumber}>
          <FormLabel>Contact Number (Whatsapp)</FormLabel>
          <Input
            type="text"
            placeholder="Enter your contact number"
            {...register("contactNumber")}
          />
          <FormErrorMessage>
            {errors.contactNumber?.message &&
            typeof errors.contactNumber.message === "string"
              ? errors.contactNumber.message
              : ""}
          </FormErrorMessage>
        </FormControl>

        {/* Branch */}
        <FormControl isInvalid={!!errors.branch}>
          <FormLabel>Branch</FormLabel>
          <Select placeholder="Select branch" {...register("branch")}>
            <option value="CSE-AI ML">CSE-AI ML</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="ICE">ICE</option>
          </Select>
          <FormErrorMessage>
            {errors.branch?.message && typeof errors.branch.message === "string"
              ? errors.branch.message
              : ""}
          </FormErrorMessage>
        </FormControl>

        {/* Year */}
        <FormControl isInvalid={!!errors.year}>
          <FormLabel>Year</FormLabel>
          <Select placeholder="Select year" {...register("year")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Select>
          <FormErrorMessage>
            {errors.year?.message && typeof errors.year.message === "string"
              ? errors.year.message
              : ""}
          </FormErrorMessage>
        </FormControl>

        {/* Any Queries */}
        <FormControl>
          <FormLabel>Any Queries</FormLabel>
          <Textarea placeholder="Enter your queries" {...register("queries")} />
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" colorScheme="teal" size="md">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default MainForm;
