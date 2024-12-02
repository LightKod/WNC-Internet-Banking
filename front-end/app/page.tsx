import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>Normal</div>
      <div className="text-sm">Small</div>
      <div className="text-xs">Xs</div>
      <div className="font-medium">Medium</div>
      <div className="font-semibold">Semi-bold</div>
      <div className="font-bold">Bold</div>
      <div className="font-bold">Overview</div>
      <div className="text-gray-500 text-sm">My Wallet</div>
      <div className="text-gray-950 text-2xl font-medium">$24,847,123 VND</div>
    </>
  );
}
