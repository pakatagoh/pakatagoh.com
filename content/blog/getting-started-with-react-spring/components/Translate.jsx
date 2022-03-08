import React, { useState, useRef, useLayoutEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import useWindowResize from "./useWindowResize";

const Translate = ({ children }) => {
  const styledBorderRef = useRef();
  const animatedDivRef = useRef();
  const size = useWindowResize();
  const [translationValue, setTranslationValue] = useState(0);
  const [translated, setTranslated] = useState(false);
  const spring = useSpring({
    from: {
      transform: `translate(${translationValue}px)`,
    },
    to: {
      transform: `translate(0px)`,
    },
    config: config.stiff,
    reverse: translated,
  });

  const getComputedTranslationValue = (element) => {
    const styledBorderWidth = parseFloat(
      animatedDivRef.current.getBoundingClientRect().width
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
      styledBorderWidth;
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
      <animated.div
        style={{
          ...spring,
          transformOrigin: "left top",
          display: "inline-block",
        }}
        ref={animatedDivRef}
      >
        {children}
      </animated.div>
      <div>
        <button
          type="button"
          onClick={() => {
            setTranslated((prevState) => !prevState);
          }}
        >
          Click to Translate
        </button>
      </div>
    </div>
  );
};

export default Translate;
