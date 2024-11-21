import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import AspectRatio from "@mui/joy/AspectRatio";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import { useNavigate } from "react-router-dom";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import { toast } from "react-toastify";

function ColorSchemeToggle({ onClick, ...props }) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("light");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {/* {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />} */}
    </IconButton>
  );
}

/**
 * This template uses [`Inter`](https://fonts.google.com/specimen/Inter?query=inter) font.
 */
export default function JoySignInSideTemplate() {
  const handleLogin = (data) => {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: "https://su-bitspilani.org/su/users/coordinator-login/",
      url: "https://onetap.su-bitspilani.org/su/users/coordinator-login/",
      headers: {
        "x-authorization":
          "048f1579b8b8f75f609f036ecb26623ddd0f58d4ff9193a14d4284ac4ff0c87b9093ed08947f25ea72cd141b23be5f2b12e10ccf4522c327f8172f76d1554fb6",
        "x-origin": "826bead8ad2ad9ce955028045788f371",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {

        localStorage.setItem("token", response.data.data.HTTP_X_COORD_ID);
        toast.info(response.data.message)
        localStorage.getItem("token") && navigate("/Laundromat-Frontend/Laundro_Items");
      })
      .catch(function (error) {
        if (error.response) {
          const errorMessage =
            error.response.data?.message || "An error occurred.";
          toast.error(errorMessage);
        } else if (error.request) {
          toast.error("No response from the server.");
        }
      });
  };




  // to login as a mock user
  // const handleLogin = (data) => {
  //   localStorage.setItem("token", "mock-token-for-dev");
  //   toast.info("Logged in as mock user");
  
  //   navigate("/Laundromat-Frontend/Laundro_Items");
  // };
  


  const navigate = useNavigate();

  return (
    <CssVarsProvider defaultMode="light" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "700px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontWeight="lg"
              startDecorator={
                <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
                  <img src="Logo.png" alt="Laundromat"></img>
                </AspectRatio>
              }
            ></Typography>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <div>
              <Typography component="h2" fontSize="xl2" fontWeight="lg">
                Laundromat Login
              </Typography>
              {/* <Typography level="body2" sx={{ my: 1, mb: 3 }}>
                Let&apos;s get started! Please enter your details.
              </Typography> */}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  username: formElements.username.value,
                  password: formElements.password.value,
                };
                handleLogin(data);
              }}
            >
              <FormControl required>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Enter your Username"
                  type="text"
                  name="username"
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input placeholder="••••••••" type="password" name="password" />
              </FormControl>
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  size="sm"
                  label="Remember for 30 days"
                  name="persistent"
                />
                <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
                  Forgot password
                </Link>
              </Box> */}
              <Button type="submit" fullWidth onClick={handleLogin}>
                Sign in
              </Button>
            </form>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © Students' Union Technical Team {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
