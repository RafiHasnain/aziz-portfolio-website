import Image from "next/image";
import { Marquee } from "./marquee";

// Define the gallery items
const galleryItems = [
  {
    id: 1,
    src: "/images/pg-1.png",
    alt: "Skiing",
    category: "Sports",
  },
  {
    id: 2,
    src: "/images/pg-2.png",
    alt: "Motorcycle",
    category: "Adventure",
  },
  {
    id: 3,
    src: "/images/pg-3.png",
    alt: "Design Work",
    category: "Work",
  },
  {
    id: 4,
    src: "/images/pg-4.png",
    alt: "Car",
    category: "Automotive",
  },
  {
    id: 5,
    src: "/images/pg-5.png",
    alt: "Cricket",
    category: "Sports",
  },
  {
    id: 6,
    src: "/images/pg-1.png",
    alt: "Skiing",
    category: "Sports",
  },
  {
    id: 7,
    src: "/images/pg-2.png",
    alt: "Motorcycle",
    category: "Adventure",
  },
  {
    id: 8,
    src: "/images/pg-3.png",
    alt: "Design Work",
    category: "Work",
  },
  {
    id: 9,
    src: "/images/pg-4.png",
    alt: "Car",
    category: "Automotive",
  },
  {
    id: 10,
    src: "/images/pg-5.png",
    alt: "Cricket",
    category: "Sports",
  },
  {
    id: 11,
    src: "/images/pg-1.png",
    alt: "Skiing",
    category: "Sports",
  },
  {
    id: 12,
    src: "/images/pg-2.png",
    alt: "Motorcycle",
    category: "Adventure",
  },
  {
    id: 13,
    src: "/images/pg-3.png",
    alt: "Design Work",
    category: "Work",
  },
  {
    id: 14,
    src: "/images/pg-4.png",
    alt: "Car",
    category: "Automotive",
  },
  {
    id: 15,
    src: "/images/pg-5.png",
    alt: "Cricket",
    category: "Sports",
  },
  {
    id: 16,
    src: "/images/pg-1.png",
    alt: "Skiing",
    category: "Sports",
  },
  {
    id: 17,
    src: "/images/pg-2.png",
    alt: "Motorcycle",
    category: "Adventure",
  },
  {
    id: 18,
    src: "/images/pg-3.png",
    alt: "Design Work",
    category: "Work",
  },
  {
    id: 19,
    src: "/images/pg-4.png",
    alt: "Car",
    category: "Automotive",
  },
  {
    id: 20,
    src: "/images/pg-5.png",
    alt: "Cricket",
    category: "Sports",
  },
];

export function PersonalGallery() {
  return (
    <section className="py-20 ">
      <div>
        <h2 className="text-[32px] font-bold text-center mb-16">
          My Personal Gallery
        </h2>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="relative group">
              <div className="overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-xl flex items-end justify-start p-4">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div> */}
        <Marquee direction="right" speed={30} fade={false}>
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] h-[200px] bg-gray-100 rounded-lg overflow-hidden shadow-md mx-3"
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={`Portfolio item ${index + 1}`}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
