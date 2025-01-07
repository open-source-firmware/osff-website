import { gsap } from "../../utils/gsap-premium/index.js";
import { ScrollTrigger } from "../../utils/gsap-premium/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const decolineContainers = document.querySelectorAll(".decoline-container");

decolineContainers.forEach((container) => {
  gsap.fromTo(
    container.querySelectorAll(".decoline"),
    { x: "-20%" },
    {
      x: "0",
      duration: 1,
      stagger: 0.1,
      ease: "elastic.out",
      scrollTrigger: {
        trigger: container,
        start: "top 40%",
        end: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );
});
