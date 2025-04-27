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
            Looking For a Special Product?
          </h2>

          {/* Big Image under Title */}
          <img 
            src="https://res.cloudinary.com/dqzzfskhw/image/upload/v1745694052/001_csu4hy.png"  
            className="w-28 h-28 object-contain"
            alt="Special Product"
          />

          {/* Optional divider line */}
     
        </div>

        {/* Button */}
        <Link href="/quiz">
          <button 
            type="button" 
            className="klaviyo_submit_button"
            style={{
              padding: "1em",
              minWidth: "10%",
              marginBottom: "3em",
            }}
          >
            Pickup a Product!
          </button>
        </Link>
      </div>
    </>
  );
}
