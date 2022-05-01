import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";

export default function index({ images }: { images: string[] }) {
  return (
    <Carousel
      height={"400px"}
      indicators={false}
      animation="slide"
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.03), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
      }}
    >
      {images.map((image: string, i) => (
        <Box
          key={i}
          component="img"
          sx={{
            height: "400px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "12px",
            // maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src={image}
        />
      ))}
    </Carousel>
  );
}
