export default function Footer() {
  return (
    <footer className="bg-yellow-400 py-4 animate-fade-in">
      <p className="text-center text-black font-medium text-sm md:text-base">
        © {new Date().getFullYear()} <span className="font-bold">GolpoKuri.</span> All rights reserved.
      </p>
    </footer>
  );
}
