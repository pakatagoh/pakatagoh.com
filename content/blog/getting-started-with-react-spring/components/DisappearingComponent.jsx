import React, { useState, useRef, useLayoutEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import useWindowSize from "./useWindowResize";

const DisappearingComponent = () => {
  const styledBorderRef = useRef();
  const animatedDiv = useRef();
  const size = useWindowSize();

  const [isDisplay, setIsDisplay] = useState(true);
  const [translationValue, setTranslationValue] = useState(0);

  const transitions = useTransition(isDisplay, null, {
    from: { transform: `translateX(${translationValue}px)`, opacity: 0 },
    enter: { transform: `translateX(0px)`, opacity: 1 },
    leave: { transform: `translateX(${translationValue}px)`, opacity: 0 },
    config: config.molasses,
  });

  const getComputedTranslationValue = (element) => {
    const barsContainerWidth = parseFloat(
      animatedDiv.current.getBoundingClientRect().width
    );

    const cs = getComputedStyle(element);

    const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const borderX =
      parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);

    // Element width minus padding and border
    const translationAmount =
      element.getBoundingClientRect().width -
      paddingX -
      borderX -
      barsContainerWidth;
    return translationAmount;
  };

  useLayoutEffect(() => {
    setTranslationValue(getComputedTranslationValue(styledBorderRef.current));
  }, [size]);

  return (
    <div
      className="mb-3 border border-black p-3 dark:border-white"
      ref={styledBorderRef}
    >
      <div style={{ width: "50px", height: "40px" }}>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={{ ...props, display: "inline-block" }}
                ref={animatedDiv}
              >
                Yo
              </animated.div>
            )
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setIsDisplay((prevState) => !prevState);
        }}
      >
        Click to Animate
      </button>
    </div>
  );
};
export default DisappearingComponent;
