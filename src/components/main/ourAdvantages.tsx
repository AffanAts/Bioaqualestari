import { FC } from "react";
import Image from "next/image";

import lightbulbIcon from "../../app/assets/logo/lightbulb.svg";
import handshakeIcon from "../../app/assets/logo/handshake.svg";
import deliveryIcon from "../../app/assets/logo/delivery.svg";
import distributionIcon from "../../app/assets/logo/box.svg";
import { StaticImageData } from "../../../node_modules/next/image";

interface Advantage {
  title: string;
  text: string;
  imageUrl: StaticImageData; // Adjust according to Next.js Image type
}

const data: Advantage[] = [
  {
    title: "Innovation",
    text: "We strive to continuously create innovative applications and new quality products to meet market demands.",
    imageUrl: lightbulbIcon,
  },
  {
    title: "Commitment",
    text: "Maintaining and ensuring the consistency of our products in terms of quantity, quality, and flavor to achieve consumer satisfaction, as consumer satisfaction is our main commitment.",
    imageUrl: handshakeIcon,
  },
  {
    title: "Delivery",
    text: "Ensuring safe, fast, and accurate product delivery to the consumer's hands.",
    imageUrl: deliveryIcon,
  },
  {
    title: "Distribution",
    text: "We have a reliable national and international distribution network.",
    imageUrl: distributionIcon,
  },
];

const OurAdvantages: FC = () => {
  return (
    <div className="">
      <div className="container mx-auto py-12 px-10 text-black">
        <h1 className="text-4xl font-bold mb-8 text-center">Kelebihan Kami</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <div
              className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md"
              key={index}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-center">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurAdvantages;
