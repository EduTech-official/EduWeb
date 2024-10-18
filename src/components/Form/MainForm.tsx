import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHeading from "./FormHeading";
import FormDetail from "./FormDetail";
import FormImage from "./FormImage";
import eventImage from "../../assets/form-image2.png";
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
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      { message: "Email must be in the format: name@organization.something" }
    ), // Custom email format validation
  rollNumber: z.string().min(1, { message: "Roll Number is required" }),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Contact number must be exactly 10 digits" }), // Updated to accept exactly 10 digits
  branch: z.string().min(1, { message: "Branch is required" }),
  year: z.enum(["1", "2", "3", "4"], { message: "Year is required" }),
  queries: z.string().optional(),
});

const MainForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<string | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions
  const navigate = useNavigate(); 

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
    setIsSubmitting(true); // Disable the submit button

    fetch(
      "https://script.google.com/macros/s/AKfycbwmTNe2dUfWm3HJUjvJaVZ2TmkkELw2XqifqupUDZ-CSLgo3bIHYixG_GM25TCGJVyhew/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.text()) 
      .then((data) => {
        console.log(data);
        setSubmitStatus("Response Accepted");
        navigate("/thanks"); 
      })
      .catch((error) => {
        console.log(error);
        setSubmitStatus("Error occurred");
        setIsSubmitting(false); // Re-enable the submit button in case of error
      });
  }

  return (
    <Box
      position={"relative"}
      marginBlockStart={20}
      marginX={1}
      paddingX={25}
      paddingY={25}
      pb={50}
    >
      <FormImage altText="Event" />
      <FormHeading 
        text="Career Clash: Battle of Professions"
        fontSize={["xl", "2xl", "3xl"]} // Responsive font sizes for different screens
      />
      <FormDetail
        details={`Get ready for an electrifying experience at the Career Clash! Here’s the lowdown on the action:\n\nRound 1:\nTeams will engage in an all-embracing quiz that tests your knowledge across various career paths, ensuring a fun and dynamic experience for everyone involved. \n\nRound 2:\nStep into the spotlight for a high-energy debate! You'll defend your assigned profession in a fast-paced showdown. This round will keep you on your toes as you navigate through different topics in a swift fashion, making it both exciting and intellectually stimulating.\n\nTo top it all off, there’s a fantastic prize pool of ₹3000 waiting to be claimed! Don’t miss out on the fun—Register Now!`}
        fontSize={["sm", "md", "lg"]} // Smaller font size on mobile
        // Ensure text has new lines with '\n'
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isSubmitting) {
            Submit(e);
          }
        }}
        className="space-y-4"
      >
        {/* Name */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel fontSize={["sm", "md"]} className="text-white">Name</FormLabel>
          <Input
            fontSize={["sm", "md"]} // Responsive font size
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
          <FormLabel fontSize={["sm", "md"]} className="text-white">Email</FormLabel>
          <Input
            fontSize={["sm", "md"]} // Responsive font size
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
          <FormLabel fontSize={["sm", "md"]} className="text-white">Roll Number</FormLabel>
          <Input
            fontSize={["sm", "md"]} // Responsive font size
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
          <FormLabel fontSize={["sm", "md"]} className="text-white">Contact Number (Whatsapp)</FormLabel>
          <Input
            fontSize={["sm", "md"]} // Responsive font size
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
          <FormLabel fontSize={["sm", "md"]} className="text-white">Branch</FormLabel>
          <Select
            fontSize={["sm", "md"]} // Responsive font size
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
          <FormLabel fontSize={["sm", "md"]} className="text-white">Year</FormLabel>
          <Select
            fontSize={["sm", "md"]} // Responsive font size
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
          <FormLabel fontSize={["sm", "md"]} className="text-white">Any Queries</FormLabel>
          <Textarea
            fontSize={["sm", "md"]} // Responsive font size
            className="text-white"
            placeholder="Leave Blank if no queries"
            {...register("queries")}
            name="Queries"
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          isDisabled={isSubmitting} // Disable when submitting
          isLoading={isSubmitting}
          loadingText="Submitting..."
          type="submit"
          colorScheme="blue"
        >
          Submit
        </Button>
        {submitStatus && <Text mt={2}>{submitStatus}</Text>}
      </form>
    </Box>
  );
};

export default MainForm;
