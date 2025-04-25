"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

const prizes = [
  { text: "5% Discount", code: "xyz123" },
  { text: "10% Discount", code: "abcd12345" },
  { text: "Free Delivery", code: "uuu2025" },
];

const imageURL = "https://res.cloudinary.com/dqzzfskhw/image/upload/v1745434477/pngtree-spin-wheel-vector-illustration-png-image_6606505_bnuqjd.png";

export default function SpinGame() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [prize, setPrize] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showGame, setShowGame] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const played = localStorage.getItem("spinGamePlayed");
    const closed = localStorage.getItem("spinGameClosed");

    if (closed) {
      setShowGame(false);
      return;
    }

    if (played) {
      const storedPrize = JSON.parse(localStorage.getItem("spinGamePrize"));
      setPrize(storedPrize);
      setHasPlayed(true);
    }
  }, []);

  const handleSpin = () => {
    if (hasPlayed || isSpinning) return;

    setIsSpinning(true);
    const segmentAngle = 360 / prizes.length;
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const fullRotations = 5;
    const newRotation = fullRotations * 360 + randomIndex * segmentAngle + (Math.random() * segmentAngle);

    setRotation(newRotation);

    setTimeout(() => {
      const result = prizes[randomIndex];
      setPrize(result);
      setHasPlayed(true);
      localStorage.setItem("spinGamePlayed", "true");
      localStorage.setItem("spinGamePrize", JSON.stringify(result));
      setIsSpinning(false);
    }, 4000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(prize.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeGame = () => {
    localStorage.setItem("spinGameClosed", "true");
    setShowGame(false);
  };

  if (!showGame) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl relative shadow-lg text-center max-w-lg w-full">
        {/* Close */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={closeGame}
        >
          <X size={20} />
        </button>

        {!hasPlayed ? (
          <>
            <h2 className="text-2xl font-bold mb-4">🎯 Spin the Wheel</h2>
            <div className="relative w-72 h-72 mx-auto">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-4xl z-10">🔻</div>

              {/* Wheel image */}
              <img
                src={imageURL}
                alt="Spin Wheel"
                className="w-full h-full transition-transform duration-[4s] ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`mt-6 px-6 py-3 rounded-lg font-bold text-white ${
                isSpinning ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isSpinning ? "Spinning..." : "Spin Now"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">🎉 You won: {prize.text}!</h2>
            <p className="text-lg mb-3">Use this code:</p>
            <div className="flex items-center justify-center gap-2 relative">
              <span className="bg-gray-100 px-4 py-2 border rounded text-xl font-mono">{prize.code}</span>
              <button
                onClick={copyCode}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
              >
                Copy
              </button>
              {copied && (
                <span className="absolute -bottom-6 flex items-center gap-1 text-green-600 text-sm">
                  <CheckCircle2 size={16} /> Copied!
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
