import ReadButton from "../buttons/ReadButton";
import WriteButton from "../buttons/WriteButton";

export default function Left() {
  return (
    <div className="max-w-xl text-center md:text-left animate-slide-left">
      <h1 className="font-bold text-white text-4xl md:text-[52px] leading-tight">
      Make Your Day <br /> With GolpoKuri
      </h1>
      <p className="text-white mt-4 text-md md:text-2xl">
      Discover pure happiness through <br /> learning and awaken your soul
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center md:justify-start">
        <ReadButton label="Read Story" />
        <WriteButton label="Write Story" />
      </div>
    </div>
  );
}
