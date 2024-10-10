import React from "react";
import { Box, Text } from "@chakra-ui/react";

type FormHeadingProps = {
  text: string;
};

const FormHeading: React.FC<FormHeadingProps> = ({ text }) => {
  return (
    <Box mb={4}>
      <Text
        textAlign="center"
        className="text-4xl bg-gradient-to-r brightness-150 font-semibold from-[#0CF996] to-[#E61AA1] bg-clip-text text-transparent mt-3"
      >
        {text}
      </Text>
    </Box>
  );
};

export default FormHeading;
