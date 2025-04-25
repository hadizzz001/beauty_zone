import { useState } from "react";

export default function VIPBox({ onClose }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("abcd12345").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">🎉 You are now a VIP! 🎉</h2>
                <p className="mb-2">Thanks for your loyalty! Enjoy your exclusive benefits.</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="bg-yellow-100 px-2 py-1 rounded text-yellow-700 font-mono">
                        abcd12345
                    </span>
                    <button
                        onClick={handleCopy}
                        className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
                <p className="text-green-600 font-semibold text-sm mb-4">Use this code for 10% OFF!</p>
                <button 
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
