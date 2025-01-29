import { useEffect, useState } from "react";
import Tournament from "./Tournament";
import {
  Flex,
  Card,
  CardBody,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";
const Created = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:5000/home`);
      const tData = await res.json();
      setData(tData.post);
    };
    getData();
  }, []);
  return (
    <Box width="100vw" minHeight={"100vh"} margin>
      <Tournament />
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 2 }}
        spacing={10}
        width={{ base: "100%", md: "70%", lg: "60%" }}
      >
        {" "}
        {data &&
          data.map((elem, ind) => {
            return (
              <Card key={ind}>
                {elem.participents.length === 0 ? (
                  <Flex
                    as={"h1"}
                    fontSize={"20px"}
                    color={"hsl(233deg 27% 24%);"}
                    flexDirection={"column"}
                  >
                    <Text>{elem.tournament_name.toUpperCase()}</Text>
                    Sorry no team participated in this tournaments.
                  </Flex>
                ) : (
                  elem.participents.map((e, i) => {
                    console.log(e);
                    return (
                      <CardBody>
                        <Flex flexDirection={"column"} key={i}>
                          <Text>{elem.tournament_name.toUpperCase()}</Text>
                          <p>Team: {e.team_name}</p>
                          <p>Captain: {e.captain}</p>
                          <p>Contact: {e.contact}</p>
                        </Flex>
                      </CardBody>
                    );
                  })
                )}
              </Card>
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default Created;
