import { BASE_URL } from "@/constants";
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";

export default function index({ images }: { images: string[] }) {
  return (
    <Carousel
      indicators={false}
      animation="slide"
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.03), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
        height: "400px",
      }}
    >
      {images.map((image: string, i) => (
        <>
          <Box
            key={i}
            component="img"
            sx={{
              height: "400px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "12px",
              display: { xs: "none", sm: "block" },
            }}
            alt={`iCare image ${i}`}
            src={`${BASE_URL}/images/${image}`}
          />
          <Box
            key={i}
            component="img"
            sx={{
              height: "400px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "12px",
              display: { xs: "block", sm: "none" },
            }}
            alt={`iCare image mobile ${i}`}
            src={`${BASE_URL}/images/mobile_${image}`}
          />
        </>
      ))}
    </Carousel>
  );
}
