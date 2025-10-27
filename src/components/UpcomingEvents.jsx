import * as React from "react";
import { formimage } from "./../assets/index";
import { Box, Button, Image, Text, Flex, VStack } from "@chakra-ui/react";

const UpcomingEvents = () => {
  const Events = [
    {
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdc5m0_hezFdCP7EvO4xNLIrPZxnwQMPeN_MZU8jW3PLhwWwA/viewform?pli=1 ",
      knowMoreLink: "/funfair", // Updated link for "Know More"
      title: "Funfair 3.0 — Let the Games Begin!",
      Image: formimage,
      desc: `🎪 Get ready for explosive fun! EduMinerva proudly presents Funfair 3.0 — the ultimate campus fiesta packed with laughter, thrills, and unforgettable memories. Join us for a day of friendly competition, hilarious challenges, and lighthearted chaos. Whether you're playing, cheering, or just soaking in the fun vibes, every moment promises excitement you won't want to miss! 💥

🗓️ Date: 30 October 2025
🕒 Time: 3:00 PM – 5:00 PM
📍 Venue: Ground and Basketball Court
💰 Entry: ₹30 for 3 games or ₹50 for all 6 games.

So round up your crew, pick your games, and let the energy take over! 🎉`,
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
              boxSize={{ base: "100%", md: "30%" }}
              height={{ base: "400px", md: "600px" }}
              margin={"auto"}
            />
            <VStack
              align="center"
              spacing={2}
              p={{ base: 2, md: 4 }}
              w={{ base: "100%", md: "50%" }}
            >
              <Text
                fontSize={{ base: "lg", md: "2xl" }}
                fontWeight="bold"
                color="white"
                textAlign="center"
              >
                {event.title}
              </Text>
              <Text
                color="gray.400"
                fontSize={{ base: "xs", md: "md" }}
                textAlign="center"
                whiteSpace="pre-line" // preserves newlines in description
              >
                {event.desc}
              </Text>
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={2}
                w="full"
                justify="center"
              >
                {/* Registration Button */}
                <Button
                  as="a"
                  href={event.link}
                  size={{ base: "sm", md: "md" }}
                  w={{ base: "full", md: "auto" }}
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  _hover={{ bgGradient: "linear(to-r, teal.500, blue.600)" }}
                  color="white"
                >
                  Register Now
                </Button>

                {/* Know More Button */}
                <Button
                  as="a"
                  href={event.knowMoreLink}
                  variant="outline"
                  size={{ base: "sm", md: "md" }}
                  w={{ base: "full", md: "auto" }}
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  _hover={{ bgGradient: "linear(to-r, blue.500, purple.600)" }}
                  color="white"
                >
                  Know More
                </Button>
              </Flex>
            </VStack>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default UpcomingEvents;
