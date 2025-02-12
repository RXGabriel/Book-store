import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { news } from "../../data/news";

const News = () => {
  return (
    <div className="py-8 px-3 sm:px-6 md:px-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-5 text-center sm:text-left">
        Notícias
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 35 },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white shadow-md p-3 sm:p-4 rounded-lg min-h-[350px] md:min-h-[300px] sm:min-h-[250px]">
              <div className="w-full sm:w-1/3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 md:h-32 sm:h-24 object-cover rounded-md"
                />
              </div>

              <div className="w-full sm:w-2/3 text-center sm:text-left flex flex-col justify-between h-full">
                <div>
                  <Link to="/">
                    <h3 className="text-base md:text-sm sm:text-xs font-medium hover:text-blue-500 mb-2">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="w-10 h-[3px] bg-blue-500 mb-2 mx-auto sm:mx-0"></div>
                </div>
                <p className="text-sm md:text-xs sm:text-[10px] text-gray-600 flex-grow">
                  {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
