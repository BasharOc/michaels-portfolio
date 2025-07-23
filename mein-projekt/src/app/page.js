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

      <SpeechBubble delay={0.5} animate={true}>
        Schau dir meine Projekte an!
      </SpeechBubble>
    </>
  );
}
