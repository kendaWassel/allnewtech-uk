"use client";
import Image from "next/image";
import { getImageUrl } from "@/config/api";

const LatestNewsBlogClient = ({ news }) => {
  const imageSrc = getImageUrl(news?.image || "");

  return (
    <section className="">
        <div className="md:px-[var(--inline-padding)] md:pt-[6rem] w-full">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="News image"
                width={420}
                height={160}
                className="w-full h-[160px] md:h-[500px] object-cover"
                sizes="(min-width: 768px) calc(100vw - 12rem), 100vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
        </div>

        <div className="px-[3.5rem] md:px-[var(--inline-padding)] pt-[2rem] pb-[3.5rem] md:py-[6rem]">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-[2.5rem] mb-[1.5rem]">
            {news.title}
          </h1>
          <p className="text-base md:text-2xl whitespace-pre-line">
            {news.content}
          </p>
        </div>
    </section>
  );
};

export default LatestNewsBlogClient;
