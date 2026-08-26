"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const VIDEO_ID = "CNOB3R1dfcs";
const VIDEO_URL = `https://youtu.be/${VIDEO_ID}`;

export function IntroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Section id="intro" className="overflow-hidden">
      <SectionHeading
        eyebrow="Quick introduction"
        title={
          <>
            The person behind <span className="text-gradient">the work.</span>
          </>
        }
        description="A short introduction to who I am, how I think, and the kind of products I love to build."
      />

      <Reveal className="mt-10 sm:mt-14">
        <div className="glass overflow-hidden rounded-3xl p-2 shadow-card sm:p-3">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-black">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title="Introduction video by Muhammad Huzaifa Awan"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Play introduction video"
                className="group absolute inset-0 w-full cursor-pointer overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
              >
                <Image
                  src="/intro-thumbnail.png"
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 1152px, (min-width: 640px) calc(100vw - 96px), calc(100vw - 40px)"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015] group-focus-visible:scale-[1.015] motion-reduce:transition-none"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20 group-focus-visible:bg-black/20"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-white shadow-glow transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none sm:h-20 sm:w-20">
                    <Play className="ml-1 h-7 w-7 fill-current sm:h-9 sm:w-9" />
                  </span>
                </span>
                <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-md sm:bottom-6 sm:left-6">
                  Play intro video
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Watch on YouTube
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
