import { easeInOut } from "motion"

export const scrollReveal = {
  initial: {
    opacity: 0,
    y: 40,
    filter: "blur(6px)",
    rotateX: -6,
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: easeInOut,
    },
  },
}

export const hoverTilt = {
  rest: { rotateX: 6, rotateY: -6 },
  hover: {
    rotateX: 0,
    rotateY: 0,
    transition: { duration: 0.5, ease: easeInOut },
  },
}