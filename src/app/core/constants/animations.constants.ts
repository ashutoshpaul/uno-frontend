/**
 * Contains reusable animation configurations
 */

export const chooseColorDialogIncomingOptionsConstant = {
  keyframes: [
    { transform: "scale(0.6, 0.6)" },
    { transform: "scale(0.8, 0.8)" },
    { transform: "scale(1, 1)" },
  ],
  keyframeAnimationOptions: {
    easing: "ease-out",
    duration: 500,
  },
};

export const chooseColorDialogOutgoingOptionsConstant = {
  keyframes: [
    { transform: "scale(1, 1)" },
    { transform: "scale(1.1, 1.1)" },
    { transform: "scale(1.2, 1.2)" },
    { transform: "scale(1.3, 1.3)" },
    { transform: "scale(1, 1)" },
    { transform: "scale(0.8, 0.8)" },
    { transform: "scale(0.5, 0.5)" },
    { transform: "scale(0, 0)" },
  ],
  keyframeAnimationOptions: {
    easing: "ease-in-out",
    duration: 500,
  },
};

export const optionsDialogIncomingOptionsConstant = {
  keyframeAnimationOptions: {
    easing: "ease-in-out",
    duration: 300,
  },
};

export const optionsDialogOutgoingOptionsConstant = {
  keyframeAnimationOptions: {
    easing: "ease-in-out",
    duration: 300,
  },
};