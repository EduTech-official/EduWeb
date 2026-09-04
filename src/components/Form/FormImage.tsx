import React from "react";
import { Image, Box } from "@chakra-ui/react";
import image2 from "../../assets/FUNFAIR.png"; // Always use this image

type FormImageProps = {
  altText: string;
};

const FormImage: React.FC<FormImageProps> = ({ altText }) => {
  return (
    <Box my={4} textAlign="center" width="100%">
      {/* objectFit was "fill" at a fixed 400px height, which stretched this
          poster out of its 2480x3508 aspect ratio. "contain" with a responsive
          max height keeps it undistorted on every screen. */}
      <Image
        src={image2}
        alt={altText}
        objectFit="contain"
        borderRadius="lg"
        width="100%"
        maxHeight={{ base: "260px", md: "380px", lg: "440px" }}
        mx="auto"
        loading="lazy"
      />
    </Box>
  );
};

export default FormImage;
