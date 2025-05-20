import backgroundBanner from "../../assets/images/background_banner.png";
import Left from "./Left";
import Right from "./Right";

export default function Banner() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        width: "100%",
      }}
      className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-10 animate-fade-in"
    >
      <Left />
      <Right />
    </div>
  );
}
