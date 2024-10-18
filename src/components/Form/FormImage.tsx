import React from "react";
import { Image, Box, useBreakpointValue } from "@chakra-ui/react";
import image1 from "../../assets/form-image.png"; // Import large image
import image2 from "../../assets/form-image2.png"; // Import small image

type FormImageProps = {
  altText: string;
};

const FormImage: React.FC<FormImageProps> = ({ altText }) => {
  // Dynamically select the image based on screen size
  const imageSrc = useBreakpointValue({
    base: image2, // Small screen (phones)
    md: image1,   // Medium and larger screens (tablets, desktops)
  });

  return (
    <Box my={4} textAlign="center" width="100%">
      <Image
        src={imageSrc} // Dynamically select based on breakpoint
        alt={altText}
        objectFit="fill"
        borderRadius="lg"
        width="100%"
        height={"400px"}
      />
    </Box>
  );
};

export default FormImage;
