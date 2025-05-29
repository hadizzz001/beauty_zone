export default function Features() {
    const features = [
      {
        img: "https://res.cloudinary.com/dmj4o6pc1/image/upload/v1748515609/Cash_On_Delivery.png", // delivery person with package
        text: "Cash on Delivery",
      },
      {
        img: "https://res.cloudinary.com/dmj4o6pc1/image/upload/v1748515610/Quality_Guarantee.png", // badge or medal image
        text: "High Quality",
      },
      {
        img: "https://res.cloudinary.com/dmj4o6pc1/image/upload/v1748515611/Authorized_Seller.png", // handshake image
        text: "Authorized Seller",
      },
    ];
  
    return (
      <div className="flex justify-around items-center gap-1 py-8 flex-wrap">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center w-28">
            <img
              src={feature.img}
              alt={feature.text}
              className="h-34 w-34 object-contain grayscale"
            />
            <p className="mt-2 text-lg font-medium text-gray-700">{feature.text}</p>
          </div>
        ))}
      </div>
    );
  }
  