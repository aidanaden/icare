import Carousel from "..";
import ShadowBox from "../../ShadowBox";

export default function index() {
  return (
    <ShadowBox>
      <Carousel images={["img_3.jpg", "img_4.jpg", "img_5.jpg"]} />
    </ShadowBox>
  );
}
