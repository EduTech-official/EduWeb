import * as React from "react";
import { formimage } from "./../assets/index";
import { Box, Button, Image, Text, Flex, VStack } from "@chakra-ui/react";

const UpcomingEvents = () => {
  const Events = [
    {
      link: "/form",
      title: "Career Clash: Battle of Professions",
      Image: formimage,
      desc: `Get ready to dive into the ultimate showdown of intellect and passion at EduMinerva's Career Clash – Battle of Professions! 🌟 Challenge yourself with a Kahoot quiz testing your career knowledge, then unleash your debating skills in a high-energy debate defending various professions. There's an exciting prize pool of ₹3000 waiting for the winner. Secure your place in this thrilling clash of careers by registering now and prepare to showcase your talents on the big stage!
`,
    },
  ];

  return (
    <Box p={{ base: 2, md: 4 }}>
      <VStack spacing={{ base: 4, md: 6 }} align="stretch">
        {Events.map((event, index) => (
          <Flex
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="gray.800"
            p={{ base: 2, md: 4 }}
            align="center"
            direction={{ base: "column", md: "row" }} // Image left, text right on desktop
            w="100%"
          >
            <Image
              src={event.Image}
              alt={event.title}
              borderRadius="xl"
              objectFit="cover"
              // Updated image size for responsiveness
              boxSize={{ base: "100%", md: "30%" }}  // Full width on mobile, smaller on desktop
              height={{ base: "300px", md: "400px" }} // Adjust height for different screen sizes
              margin={"auto"}
            />
            <VStack
              align="center"
              spacing={2}
              p={{ base: 2, md: 4 }} // Adjust padding for mobile
              w={{ base: "100%", md: "50%" }}
            >
              <Text
                fontSize={{ base: "xl", md: "2xl" }} // Reduced font size on mobile
                fontWeight="bold"
                color="white"
                textAlign="center"
              >
                {event.title}
              </Text>
              <Text
                color="gray.400"
                fontSize={{ base: "sm", md: "md" }} // Adjust font size for mobile
                textAlign="center"
              >
                {event.desc}
              </Text>
              <Button
                as="a"
                href={event.link}
                colorScheme="teal"
                size={{ base: "sm", md: "md" }} // Adjust button size for mobile
                w="full"
              >
                Register Now
              </Button>
            </VStack>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default UpcomingEvents;
