// components/StickyMapButton.js

export default function StickyMapButton() {
    return (
      <a
        href="https://www.google.com/maps/place/Beirut,+Lebanon"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-1 z-50  p-2  "
      >
        <img
          src="https://res.cloudinary.com/dqzzfskhw/image/upload/v1744565634/images-removebg-preview_nybdle.png"
          alt="Google Maps"
          className="w-16 h-16 object-contain"
        />
      </a>
    );
  }
  