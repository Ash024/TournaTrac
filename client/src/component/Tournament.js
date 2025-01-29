import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
const Tournament = () => {
  return (
    <Box>
      <Flex justifyContent={"space-around"} marginTop={"5"}>
        <Link to="/tournamentcreated">
          <Flex fontSize={"xx-large"}>Participated Teams in Tournament</Flex>
        </Link>
      </Flex>
    </Box>
  );
};

export default Tournament;
