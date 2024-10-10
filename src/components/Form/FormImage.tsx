import React from "react";
import { Image, Box } from "@chakra-ui/react";

type FormImageProps = {
  imageSrc: string;
  altText: string;
};

const FormImage: React.FC<FormImageProps> = ({ imageSrc, altText }) => {
  return (
    <Box my={4} textAlign="center" width="100%">
      <Image
        src={imageSrc}
        alt={altText}
        objectFit="cover"
        borderRadius="lg"
        width="100%"
        height={"200px"}
      />
    </Box>
  );
};

export default FormImage;
