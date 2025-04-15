import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  FaWhatsapp,
  FaDiscord,
  FaSlack,
  FaUsers,
  FaUpload,
} from "react-icons/fa";

const platformStyles = {
  WhatsApp: {
    color: "bg-green-500",
    icon: <FaWhatsapp size={13} />,
  },
  Slack: {
    color: "bg-pink-500",
    icon: <FaSlack size={13} />,
  },
  Discord: {
    color: "bg-indigo-600",
    icon: <FaDiscord size={13} />,
  },
};

const descriptionsByHeight = {
  short: "Create. Connect. Grow.",
  medium: "Design. Develop.Think deeply. Learn. Repeat.",
  long: "Think deeply. Build boldly. Inspire others. Evolve endlessly.Design and Develop.",
};

const heightDescriptionMap = {
  "h-[270px]": "short",
  "h-[290px]": "medium",
  "h-[310px]": "medium",
  "h-[330px]": "long",
};

const cards = [
  {
    title: "Gemma's Design Space",
    platform: "WhatsApp",
    price: 22,
    learnWithFriends: { title: "Learn with friends" },
    shareWork: { title: "Share your designs" },
  },
  {
    title: "Dev Club",
    platform: "Discord",
    price: 8.99,
    learnWithFriends: { title: "Pair Programming" },
    shareWork: { title: "Showcase Projects" },
  },
  {
    title: "FBA Sellers Group",
    platform: "WhatsApp",
    price: 150,
    learnWithFriends: { title: "Seller Roundtables" },
    shareWork: { title: "Success Stories" },
  },
  {
    title: "Fitness Gang",
    platform: "Discord",
    price: 39.99,
    learnWithFriends: { title: "Workout Buddies" },
    shareWork: { title: "Progress Pics" },
  },
  {
    title: "Creative Space",
    platform: "Slack",
    price: 15,
    learnWithFriends: { title: "Creative Jams" },
    shareWork: { title: "Publish Together" },
  },
  {
    title: "Business Circle",
    platform: "Discord",
    price: 250,
    learnWithFriends: { title: "Live Strategy Sessions" },
    shareWork: { title: "Pitch Your Ideas" },
  },
  {
    title: "FBA Sellers Group",
    platform: "WhatsApp",
    price: 150,
    learnWithFriends: { title: "Seller Roundtables" },
    shareWork: { title: "Success Stories" },
  },
  {
    title: "Fitness Gang",
    platform: "Discord",
    price: 39.99,
    learnWithFriends: { title: "Workout Buddies" },
    shareWork: { title: "Progress Pics" },
  },
];

export default function CarouselComponent() {
  const scrollRef = useRef(null);

  const heights = ["h-[270px]", "h-[330px]", "h-[310px]", "h-[290px]"];
  const colors = [
    "bg-gradient-to-b from-white to-[#e0f7ff]",
    "bg-gradient-to-b from-[#fceaff] to-[#f9e3ff]",
    "bg-gradient-to-b from-[#fff8e1] to-[#ffeaa7]",
    "bg-gradient-to-b from-white to-[#f1f1f1]",
    "bg-gradient-to-b from-white to-[#fff0f0]",
    "bg-gradient-to-b from-white to-[#e6ffe6]",
  ];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollStep = 1;
    const speed = 20;

    const scrollInterval = setInterval(() => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollStep;
      }
    }, speed);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Side Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/70 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/70 to-transparent z-10" />

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-scroll whitespace-nowrap no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          className="flex gap-4 px-10 py-10 items-center"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {[...cards, ...cards].map((card, i) => {
            const platform = platformStyles[card.platform];
            const height = heights[i % heights.length];
            const bgColor = colors[i % colors.length];
            const descriptionType = heightDescriptionMap[height];
            const description = descriptionsByHeight[descriptionType];
            

            return (
              <motion.div
                key={i}
                className={`min-w-[200px] max-w-[150px] ${height} px-6 py-5 rounded-xl ${bgColor} shadow-xl text-center text-wrap text-gray-800 flex flex-col gap-1 items-center justify-center transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0.7, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <img
                  src={`https://picsum.photos/id/${i + 180}/200`}
                  alt={card.title}
                  className="w-14 h-14 mx-auto rounded-full object-cover shadow-md"
                />
                <h2 className="text-sm font-semibold text-purple-700">
                  {card.title}
                </h2>
                <p className="text-[10px] text-gray-600 font-medium leading-snug">{description}</p>


                <div>
                  <p className="text-xs text-purple-700 font-medium">
                    Access to
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span
                      className={`text-white ${platform.color} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}
                    >
                      {platform.icon} {card.platform}
                    </span>
                  </div>
                </div>

                <div className="text-left text-sm mb-2">
                  <div className="flex gap-2 items-start">
                    <span className="text-yellow-500 mt-1">
                      <FaUsers size={14} />
                    </span>
                    <p className="font-medium text-purple-700 text-xs">
                      {card.learnWithFriends.title}
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-yellow-500 mt-1">
                      <FaUpload size={14} />
                    </span>
                    <p className="font-medium text-purple-700 text-xs">
                      {card.shareWork.title}
                    </p>
                  </div>
                </div>

                <button
                  className={`${platform.color} hover:brightness-110 text-white text-xs py-2 rounded-full w-full font-medium text-nowrap`}
                >
                  Subscribe • ${card.price}/month
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}