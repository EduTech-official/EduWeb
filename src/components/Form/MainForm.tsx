import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Text,
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
  const [submitStatus, setSubmitStatus] = useState<string | null>(null); // For showing success/error message
  const navigate = useNavigate(); // Hook for navigation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  function Submit(e) {
    const formEle = document.querySelector("form");
    const formData = new FormData(formEle);
    fetch(
      "https://script.google.com/macros/s/AKfycbwmTNe2dUfWm3HJUjvJaVZ2TmkkELw2XqifqupUDZ-CSLgo3bIHYixG_GM25TCGJVyhew/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.text()) // Google Script returns a plain text response
      .then((data) => {
        console.log(data);
        setSubmitStatus("Response Accepted");
        navigate("/thanks"); // Redirect to /thanks page
      })
      .catch((error) => {
        console.log(error);
        setSubmitStatus("Error occurred");
      });
  }

  return (
    <Box
      position={"relative"}
      marginBlockStart={20}
      marginX={1}
      paddingX={25} // Half of the original padding (was 50)
      paddingY={25} // Half of the original padding (was 50)
      pb={50} // More padding at the bottom below the form
    >
      <FormImage imageSrc={eventImage} altText="Event" />
      <FormHeading text="NOW YOU PITCH ME" />
      <FormDetail details="Join us for an exciting event filled with insightful sessions and networking opportunities." />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          Submit(e);
        }}
        className="space-y-4"
      >
        {/* Name */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel className="text-white">Name</FormLabel>
          <Input
            className="text-white"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            name="Name"
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        {/* Email */}
        <FormControl isInvalid={!!errors.email}>
          <FormLabel className="text-white">Email</FormLabel>
          <Input
            className="text-white"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            name="Email"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        {/* Roll Number */}
        <FormControl isInvalid={!!errors.rollNumber}>
          <FormLabel className="text-white">Roll Number</FormLabel>
          <Input
            className="text-white"
            type="text"
            placeholder="Enter your roll number"
            {...register("rollNumber")}
            name="Roll_no"
          />
          <FormErrorMessage>{errors.rollNumber?.message}</FormErrorMessage>
        </FormControl>

        {/* Contact Number */}
        <FormControl isInvalid={!!errors.contactNumber}>
          <FormLabel className="text-white">Contact Number (Whatsapp)</FormLabel>
          <Input
            className="text-white"
            type="text"
            placeholder="Enter your contact number"
            {...register("contactNumber")}
            name="Contact_No"
          />
          <FormErrorMessage>{errors.contactNumber?.message}</FormErrorMessage>
        </FormControl>

        {/* Branch */}
        <FormControl isInvalid={!!errors.branch}>
          <FormLabel className="text-white">Branch</FormLabel>
          <Select
            className="text-white"
            placeholder="Select branch"
            {...register("branch")}
            name="Branch"
          >
            <option className="text-black" value="CSE-AI ML">
              CSE-AI ML
            </option>
            <option className="text-black" value="CSE">
              CSE
            </option>
            <option className="text-black" value="IT">
              IT
            </option>
            <option className="text-black" value="ECE">
              ECE
            </option>
            <option className="text-black" value="EEE">
              EEE
            </option>
            <option className="text-black" value="ICE">
              ICE
            </option>
          </Select>
          <FormErrorMessage>{errors.branch?.message}</FormErrorMessage>
        </FormControl>

        {/* Year */}
        <FormControl isInvalid={!!errors.year}>
          <FormLabel className="text-white">Year</FormLabel>
          <Select
            className="text-white"
            placeholder="Select year"
            {...register("year")}
            name="Year"
          >
            <option className="text-black" value="1">
              1
            </option>
            <option className="text-black" value="2">
              2
            </option>
            <option className="text-black" value="3">
              3
            </option>
            <option className="text-black" value="4">
              4
            </option>
          </Select>
          <FormErrorMessage>{errors.year?.message}</FormErrorMessage>
        </FormControl>

        {/* Any Queries */}
        <FormControl>
          <FormLabel className="text-white">Any Queries</FormLabel>
          <Textarea
            className="text-white"
            placeholder="Leave Blank if no queries"
            {...register("queries")}
            name="Queries"
          />
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" colorScheme="teal" size="md">
          Submit
        </Button>

        {/* Display submission status */}
        {submitStatus && (
          <Text
            color={submitStatus === "Response Accepted" ? "green" : "red"}
            mt={4}
          >
            {submitStatus}
          </Text>
        )}
      </form>
    </Box>
  );
};

export default MainForm;
