import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { swiperComponentProps } from "./type";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SwiperComponent({ pictures }: swiperComponentProps) {
  return (
    <div className="w-full h-[400]">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        direction="horizontal"
        className="h-full"
      >
        {pictures.map((picture, index) => (
          <SwiperSlide key={`${picture}-${index.toString()}`} className="p-4">
            <div className="h-full aspect-video relative mx-auto">
              <Image src={picture} alt={`Slide ${index + 1}`} fill />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
