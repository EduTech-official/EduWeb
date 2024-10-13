import * as React from "react";
import { BBattles } from "./../assets/index";
import { Box, Button, Image, Text, Flex, VStack } from "@chakra-ui/react";

const UpcomingEvents = () => {
  const Events = [
    {
      link: "/form",
      title: "Baggage Battles",
      Image: BBattles,
      desc: "Think you have an eye for treasure? Baggage Battles is a competition where teams put their deduction skills to the test. Analyze clues from unclaimed baggage and uncover their hidden value! Can you strategize your bids and win big in the fast-paced auction round?",
    },
  ];

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        {Events.map((event, index) => (
          <Flex
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="gray.800"
            p={4}
            align="center"
            direction={{ base: "column", md: "row" }} // Image left, text right on desktop
            w="100%"
          >
            <Image
              src={event.Image}
              alt={event.title}
              borderRadius="xl"
              boxSize={{ base: "100%", md: "60%" }} // Adjust image size for mobile and desktop
              objectFit="cover"
            />
            <VStack
              align="center" 
              spacing={2}
              p={4}
              w={{ base: "100%", md: "60%" }}
            >
              <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center">
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
                size="sm"
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
