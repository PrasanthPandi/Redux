import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.jpg";

const images = [image1, image2];

const Carousel = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Using custom arrows
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "auto",
        
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`Slide ${index + 1}`}
            sx={{
              width: "100%",
              height: {
                xs: "300px", // Small screens (sm)
                md: "450px", // Medium screens (md)
                lg: "400px", // Default height for large screens and above
              }, // Fixed height for all images
              objectFit: "cover", // Ensure images fit nicely without distortion
              borderRadius: "8px",
            }}
          />
        ))}
      </Slider>

      {/* Custom Navigation Arrows */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "grey.300" },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "grey.300" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default Carousel;
