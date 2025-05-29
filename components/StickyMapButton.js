// components/StickyMapButton.js

export default function StickyMapButton() {
    return (
      <a
        href="https://www.google.com/maps?q=33.88216,35.537215&z=17&hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[20px] left-3 z-50  p-2  "
      >
        <img
          src="https://res.cloudinary.com/dmj4o6pc1/image/upload/v1748535852/images-removebg-preview.png"
          alt="Google Maps"
          className="w-16 h-16 object-contain"
        />
      </a>
    );
  }
  