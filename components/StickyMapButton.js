// components/StickyMapButton.js

export default function StickyMapButton() {
    return (
      <a
        href="https://www.google.com/maps?q=33.88216,35.537215&z=17&hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[90px] left-3 z-50  p-2  "
      >
        <img
          src="https://res.cloudinary.com/dqzzfskhw/image/upload/v1744565634/images-removebg-preview_nybdle.png"
          alt="Google Maps"
          className="w-16 h-16 object-contain"
        />
      </a>
    );
  }
  