import {
  Box,
  ColorModeProvider,
  CSSReset,
  Flex,
  Heading,
  IconButton,
  theme,
  ThemeProvider,
  useColorMode,
  ColorModeScript,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <LoginArea />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

const LoginArea = () => {
  return (
    <Flex
      minHeight={"100vh"}
      width="full"
      align={"center"}
      justifyContent="center"
    >
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <ThemeSelector />
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  );
};

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Flex>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading color={"hsl(233deg 27% 24%)"}>Sign in to your account</Heading>
    </Box>
  );
};
const LoginForm = () => {
  const [user, setUser] = useState({});  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      window.alert("inavlid Credentials");
    } else if (!email || !password) {
      window.alert("Please fill the required details");
    } else {
      window.alert("Login SuccessFull");
      // console.log("Encode Jwt token: "+response.credential)
      const userObject = jwt_decode(data.user);
      console.log(userObject);
      setUser(userObject);
      sessionStorage.setItem("name", userObject.name);
      navigate("/");
    }
  };
  return (
    <Box my={8} textAlign="left">
      <form>
        <FormControl>
          <FormLabel color={"hsl(233deg 27% 24%)"}>Email</FormLabel>
          <Input
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email Adress"
          />
        </FormControl>
        <FormControl>
          <FormLabel color={"hsl(233deg 27% 24%)"}>Password</FormLabel>
          <Input
            type={"password"}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        <Flex justifyContent="center" margin="2vh auto">
          {" "}
          <div id="signInDiv"></div>
        </Flex>
        <Stack isInline justifyContent={"space-between"}>
          <Box>
            <Link to="/signup">Create your account</Link>
          </Box>
        </Stack>
        <Button bg={"green.500"} width={"full"} mt={4} onClick={loginUser}>
          Sigin
        </Button>
      </form>
    </Box>
  );
};
export default Signin;
