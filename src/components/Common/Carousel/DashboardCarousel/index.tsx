import Carousel from "..";
import ShadowBox from "../../ShadowBox";

export default function index() {
  return (
    <ShadowBox>
      <Carousel images={["scenery.jpg", "scenery2.jpg", "scenery3.jpg"]} />
    </ShadowBox>
  );
}
