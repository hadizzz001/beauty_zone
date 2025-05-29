 

import Link from "next/link";

export default function Features() {
  return (
    <>  
      <div className="sywPaymentOptions text-center p-6">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .border-gray-400 {
                --tw-border-opacity: 1;
                border-color: rgb(156 163 175 / var(--tw-border-opacity)) !important;
              }
            `
          }}
        />

        {/* Title */}
        <div className="relative flex flex-col items-center py-5">
          <h2 className="text-2xl md:text-3xl font-serif mb-6">
          Do You Want To Compare Products?
          </h2>

          {/* Big Image under Title */}
          <img 
            src="https://res.cloudinary.com/dmj4o6pc1/image/upload/v1748515610/002.png"  
            className="w-28 h-28 object-contain"
            alt="Special Product"
          />

          {/* Optional divider line */}
     
        </div>

        {/* Button */}
        <Link href="specs">
          <button 
            type="button" 
            className="klaviyo_submit_button"
            style={{
              padding: "1em",
              minWidth: "10%",
              marginBottom: "3em",
            }}
          >
            Try it now!
          </button>
        </Link>
      </div>
    </>
  );
}
