import { Flex, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAttachScripts } from "~/app/hooks/useAttachScripts";

type Props = {};

const HomePage = (props: Props) => {
  useAttachScripts();
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
