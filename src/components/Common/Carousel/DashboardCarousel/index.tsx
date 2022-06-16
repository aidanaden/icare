import Carousel from "..";
import ShadowBox from "../../ShadowBox";

export default function index() {
  return (
    <ShadowBox>
      <Carousel images={["img_3.jpg", "img_1.jpg", "img_2.jpg"]} />
    </ShadowBox>
  );
}
