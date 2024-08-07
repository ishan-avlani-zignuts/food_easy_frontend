import React from "react";
import Headers from "../components/Headers";
import { Box } from "@mui/material";
import SimpleSlider from "../components/Carousel";
import Home from "./userviews/Home";

const Hero = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Headers />
      <Box>
        <SimpleSlider />
        <Home/>
      </Box>
    </Box>
  );
};

export default Hero;
