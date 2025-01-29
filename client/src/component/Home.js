import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../component/css/Home.css";
import { Typewriter } from "react-simple-typewriter";
import {
  Flex,
  Box,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Select,
} from "@chakra-ui/react";
import Loader from "./Loader";

export default function Home() {
  const navigate = useNavigate();

  const [myData, setMyData] = useState([]);
  const [dataId, setDataId] = useState([]);
  const [sportType, setSportType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tournamentData = async () => {
      const res = await fetch(`http://localhost:5000/home`);
      const tData = await res.json();
      const finalData = tData.post;
      setDataId(finalData);
      setLoading(false);
    };
    tournamentData();
  }, []);

  console.log(dataId);

  useEffect(() => {
      setMyData(
        dataId.filter((e) => {
          const type = e.Sports.toLowerCase();
          console.log("array type", type);
          console.log("prop type", sportType);

          return sportType
            ? type === sportType : true;
        })
      );
  }, [dataId, sportType]);
  const getData = (e) => {
    myData.find({ id: e.id });
    dataId.find({ id: e.id });
  };

  return (
    <>
      <Box marginBottom={"5vh"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          bg={"#C9D6DF"}
          height={"8em"}
        >
          <Box
            id="typography"
            textColor={"hsl(233deg 27% 24%);"}
            fontWeight={"bold"}
            textAlign={"left"}
            paddingLeft={"1%"}
            paddingTop={"20px"}
            marginLeft={"2%"}
          >
            <Typewriter
              words={[
                " Place where talents meets opportunity.",
                " Discover the champion within.",
                " Experience  the  thrill of victory.",
                "Are you ready for the challenge?",
                " Find your edge.",
              ]}
              loop={25}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={90}
              delaySpeed={50}
            />
          </Box>
          <Flex
            display={{ base: "none", md: "flex", lg: "flex" }}
            id="search-button-pc"
            flexDirection={"row"}
            alignItems={"center"}
            bg={"white"}
            paddingLeft="1vw"
            width={"10%"}
            height={"38%"}
            marginRight={"2%"}
          >
            <Select
              sportType={sportType}
              setSportType={setSportType}
              onChange={(e) => {
                setSportType(e.target.value);
              }}
              ml={"0px"}
              placeholder="All sports"
              color={"black"}
              bg={"whiteAlpha.900"}
              border={"0px white"}
              _focusVisible={{}}
              width={"100%"}
            >
              <option value="archery">Archery</option>
              <option value="athletics">Athletics</option>
              <option value="badminton">Badminton</option>
              <option value="basketball">Basketball</option>
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="handball">Handball</option>
              <option value="hockey">Hockey</option>
              <option value="kabaddi">Kabaddi</option>
              <option value="Kho-kho">Kho-kho</option>
              <option value="vollyball">Vollyball</option>
            </Select>
            
          </Flex>
        </Box>
        <Box position={"absolute"} zIndex={"-1"} width={"100%"}>
        </Box>
        <Box
          textColor={"blackAlpha.800"}
          fontSize={"25"}
          fontWeight={"bold"}
          fontStyle={"normal"}
          textAlign={"left"}
          paddingTop={3}
          margin={"1%"}
          marginLeft={"3%"}
        >
          Upcoming Tournament
        </Box>

        <SimpleGrid
          padding={"15px"}
          spacing={10}
          minChildWidth={"250px"}
          marginLeft={"2%"}
          marginRight={"1%"}
        >
          {loading ? (
            <Loader color="hsl(233deg 27% 24%)" />
          ) : (
            <>
              {" "}
              {myData.length == 0 ? (
                <Flex
                  as={"h1"}
                  fontSize={"50px"}
                  color={"hsl(233deg 27% 24%);"}
                >
                  Sorry no tournament found.
                </Flex>
              ) : (
                myData.map((data, index) => {
                  return (
                    <Card
                      id={data.id}
                      onClick={getData}
                      key={index}
                      height={"220px"}
                      margin="1%"
                      bg={"whiteAlpha.900"}
                      maxW={"350px"}
                      boxShadow={"0px 3px 8px -2px #9d9d9d"}
                      _hover={{
                        // border: "1px solid black",
                        transform: "scale(1.05)",
                        boxShadow: "0px 0px 30px 1px rgba(0, 255, 117, 0.30)",
                        transition: "all .3s",
                      }}
                    >
                      <CardBody>
                        <Link to={`/detail/${data._id}`}>
                          <Box key={index} bg={"white"}>
                            <Box
                              textColor={"purple.700"}
                              fontSize={"25"}
                              fontWeight={"bold"}
                              fontStyle={"oblique"}
                              bg="blue.50"
                            >
                              <Image
                                h="110px"
                                w={"250px"}
                                rounded={"5px"}
                                src={data.image}
                                border={"1px solid hsl(233deg 27% 24%)"}
                              />
                            </Box>
                            <Flex
                              justifyContent={"flex-start"}
                              flexDirection={"column"}
                            >
                              <Text
                                textAlign={"left"}
                                textColor={"blackAlpha.800"}
                                fontSize={"20"}
                                fontWeight={"bold"}
                                fontStyle={"normal"}
                                marginTop={"0.5em"}
                              >
                                {data.tournament_name}
                              </Text>
                              <Text
                                textAlign={"left"}
                                textColor={"blackAlpha.750"}
                                fontSize={"16"}
                                fontWeight={"medium"}
                                fontStyle={"normal"}
                                opacity={"0.7"}
                              >
                                {data.city}
                              </Text>
                            </Flex>
                          </Box>
                        </Link>
                      </CardBody>
                      <Box />
                    </Card>
                  );
                })
              )}
            </>
          )}
          {}
        </SimpleGrid>
      </Box>
    </>
  );
}