import bannerImage from '../../assets/images/banner_image.png';

export default function Right() {
  return (
    <div className="animate-bounce-slow">
      <img src={bannerImage} alt="banner_image" className="w-[350px] md:w-[620px]" />
    </div>
  );
}
