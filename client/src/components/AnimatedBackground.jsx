import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function AnimatedBackground() {
  const particlesInit = async (engine) => {
    // load slim bundle for smaller footprint
    await loadSlim(engine);
  };

  const particlesOptions = {
    background: { color: { value: "#0b1220" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: false },
        onHover: { enable: false },
        resize: true,
      },
    },
    particles: {
      color: { value: "#a855f7" },
      links: {
        color: "#a855f7",
        distance: 140,
        enable: true,
        opacity: 0.25,
        width: 1,
      },
      move: { enable: true, speed: 0.8 },
      number: { value: 45 },
      opacity: { value: 0.45 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 4 } },
    },
    detectRetina: true,
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
           {" "}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
         {" "}
    </div>
  );
}
