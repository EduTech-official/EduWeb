import React from "react";
import { Text, Box } from "@chakra-ui/react";

type FormDetailProps = {
  details: string;
};

const FormDetail: React.FC<FormDetailProps> = ({ details }) => {
  return (
    <Box mb={4}>
      <Text fontSize="md" textAlign="center" className="text-white" >
        {details}
      </Text>
    </Box>
  );
};

export default FormDetail;
