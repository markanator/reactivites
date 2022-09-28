import { Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Heading mb={4}>HomePage</Heading>
      <Link to="/activities">Go to Activites</Link>
    </Flex>
  );
};

export default HomePage;
