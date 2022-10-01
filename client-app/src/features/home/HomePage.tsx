import { Flex, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStoreContext } from "~/stores/store";

type Props = {};

const HomePage = (props: Props) => {
  const {
    userStore: { isLoggedIn },
  } = useStoreContext();

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Heading mb={4}>Reactivities</Heading>
      {isLoggedIn ? (
        <>
          <Heading mb={4}>Welcome back</Heading>
          <Link to="/activities">Go to activities!</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </Flex>
  );
};

export default observer(HomePage);
