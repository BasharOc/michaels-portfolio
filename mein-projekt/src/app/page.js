"use client";

import CardCarousel from "./components/CardCarousel";
import ProfilBild from "./components/ProfilBild";
import SpeechBubble from "./components/SprachBlase";
import Wave from "./components/Wave";
import WaveMobile from "./components/WaveMobile";

export default function Home() {
  return (
    <>
      {/* Nur auf Desktop sichtbar */}
      <div className="hidden sm:block">
        <Wave />
      </div>
      {/* Nur auf Mobile sichtbar */}
      <div className="block sm:hidden">
        <WaveMobile />
      </div>

      <ProfilBild />
      {/* <ProjectCarousel projects={projects} /> */}
      <CardCarousel />
    </>
  );
}
