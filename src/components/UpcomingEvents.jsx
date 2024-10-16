import * as React from "react";
import { BBattles } from "./../assets/index";
import { Box, Button, Image, Text, Flex, VStack } from "@chakra-ui/react";

const UpcomingEvents = () => {
  const Events = [
    {
      link: "/form",
      title: "Career Clash: Battle of Professions",
      Image: BBattles,
      desc: `The event is a two-round competition focused on career paths and professions.\n
  Round 1:\n
  An all-embracing quiz will test participants' knowledge of various careers and serve as the shortlisting round. The top 16 teams (2 members each) advance to the next round.\n
  Round 2:\n
  A swift debate where teams are assigned professions to defend. They’ll have 1 minute to prepare and then engage in a 3-minute debate with another team. Three judges will cast votes, and the team with the majority advances. The quiz ranking determines matchups, with high performers facing lower scorers first.\n
  The event progresses through elimination until one team is crowned the winner.`,
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
              boxSize={{ base: "100%", md: "60%" }} // Adjust image size for mobile and desktop
              objectFit="cover"
            />
            <VStack
              align="center"
              spacing={2}
              p={{ base: 2, md: 4 }} // Adjust padding for mobile
              w={{ base: "100%", md: "60%" }}
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
