import React from "react";
import { Image, Box } from "@chakra-ui/react";
import image2 from "../../assets/FUNFAIR.png"; // Always use this image

type FormImageProps = {
  altText: string;
};

const FormImage: React.FC<FormImageProps> = ({ altText }) => {
  return (
    <Box my={4} textAlign="center" width="100%">
      <Image
        src={image2} // Always show image2
        alt={altText}
        objectFit="fill"
        borderRadius="lg"
        width="100%"
        height="400px"
      />
    </Box>
  );
};

export default FormImage;
