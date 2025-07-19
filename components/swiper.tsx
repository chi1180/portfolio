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
    <div className="w-full h-full sm:h-[400]">
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
          <SwiperSlide
            key={`${picture}-${index.toString()}`}
            className="p-2 sm:p-4"
          >
            <div className="h-full aspect-video relative mx-auto">
              {(picture.split(".").at(-1) === "png" ||
                picture.split(".").at(-1) === "jpg" ||
                picture.split(".").at(-1) === "gif") && (
                <Image src={picture} alt={`Slide ${index + 1}`} fill />
              )}

              {picture.split(".").at(-1) === "mp4" && (
                <video
                  src={picture}
                  controls
                  className="w-full h-full"
                  autoPlay={false}
                >
                  <track
                    kind="captions"
                    src={picture.replace(".mp4", ".vtt")}
                  />
                </video>
              )}

              {picture.split(".").at(-1) === "pdf" && (
                <iframe
                  src={picture}
                  title={picture}
                  className="w-full h-full"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
