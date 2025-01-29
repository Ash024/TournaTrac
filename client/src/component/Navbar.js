import React from "react";
import {
  Flex,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  MenuDivider,
  Avatar,
  Center,
  Image,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import logo from "../assest/ttlogo.svg";

function Navbar({ input, setInput, sportType, setSportType }) {

  const navigate = useNavigate();
  const createTournament = () => {
    const name = sessionStorage.getItem("name");
    if (name) {
      navigate("/register");
    } else {
      navigate("/signin");
    }
  };

  const name = sessionStorage.getItem("name");
  const image = sessionStorage.getItem("image");
  const handelLogout = () => {
    sessionStorage.clear();
    navigate("/signin");
  };
  console.log(setInput);

  return (
    <>
      <Flex
        p={4}
        flexDirection={"row"}
        justifyContent={"space-between"}
        bg={"hsl(233deg 27% 24%)"}
        color={""}
        maxHeight={"5em"}
        paddingLeft={"2.5%"}
      >
        <Link to={"/"}>
          <Flex alignItems={"center"} color="white" ml={5} marginLeft={"1%"}>
            <Image height={50} src={logo} />
          </Flex>
        </Link>
        <Flex justifyContent={"flex-end"} mt="0.5em" marginRight={"2%"}>
          <Button
            css={{
              display: "inline-flex",
              marginBottom: "2em",
              alignItems: "center",
              color: "#fff",
              border: "1px solid #fff",
              minHeight: "40px",
              padding: "0 20px",
              fontSize: "20px",
              borderRadius: "0px",
              position: "relative",
              backgroundColor: "transparent",
              paddingBottom: "5px",
              marginRight: "2vw",

              "&::before": {
                backgroundColor: "#fff",
                width: "45px",
                height: "1px",
              },
              "&::after": {
                content: '""',
                backgroundColor: "#fff",
                display: "block",
                width: "0%",
                height: "100%",
                right: "0",
                top: "0",
                position: "absolute",
                zIndex: "-1",
                transition: "all 0.3s ease-out",
              },
              "&:hover": {
                color: "#232963",
                textDecoration: "none",
                transition: "all 0.3s ease-out",
              },
              "&:hover::after": {
                width: "100%",
                transition: "all 0.3s ease-out",
              },
              "&:hover::before": {
                backgroundColor: "#232963",
                transition: "all 0.3s ease-out",
              },
              // media query for small screens
              "@media screen and (max-width: 480px)": {
                fontSize: "16px",
                minHeight: "40px",
                padding: "0 10px",
              },
            }}
            onClick={() => createTournament()}
          >
            Create Tournament
          </Button>

          {name || image ? (
            <></>
          ) : (
            <Link to="./signin">
              <Button
                ml={2}
                marginRight={"1%"}
                bg={"white"}
                height="6vh"
                fontSize={{ base: "16px", md: "18px" }}
                padding={{ base: "0.5em 1.5em", md: "0.7em 2em" }}
                border="1px  black"
                borderRadius="1px"
                position="relative"
                boxShadow="0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1)"
                color="black"
                textDecoration="none"
                transition="0.3s ease all"
                zIndex="1"
                _before={{
                  transition: "0.5s all ease",
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  right: "50%",
                  bottom: 0,
                  opacity: 0,
                  content: '""',
                  backgroundColor: "hsl(233deg 27% 24%)",
                  zIndex: "-1",
                }}
                _hover={{
                  color: "white",
                  _before: { left: 0, right: 0, opacity: 1 },
                }}
                _active={{
                  transform: "scale(0.9)",
                  _before: { left: 0, right: 0, opacity: 1 },
                }}
              >
                Sign in/ register
              </Button>
            </Link>
          )}
          <Menu ml={6}>
            {name || image ? (
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar height={"6.5vh"} widht={"3vw"} src={image} />
              </MenuButton>
            ) : (
              <></>
            )}

            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar ml={5} size={"2xl"} src={image} />
              </Center>
              <br />
              <Center>
                <p>{name}</p>
              </Center>
              <br />
              <MenuDivider />
              <Link to="./tournament">
                <MenuItem>Tournaments</MenuItem>
              </Link>
              <Link to="./about">
                <MenuItem>About us</MenuItem>
              </Link>
              <MenuItem onClick={handelLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;
