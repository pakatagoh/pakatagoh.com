import React, { useState, useRef } from "react";
import {
  useTrail,
  animated,
  useSpring,
  useChain,
  config,
  useIsomorphicLayoutEffect,
  useSpringRef,
} from "@react-spring/web";
import useWindowSize from "./_useWindowResize";

const colors = ["red", "green", "blue", "orange", "purple", "yellow"];

const TranslateStaggeredBars = () => {
  const styledBorderRef = useRef();
  const animatedBarsContainerRef = useRef();
  const size = useWindowSize();

  const [translationValue, setTranslationValue] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const springRef = useSpringRef();
  const spring = useSpring({
    from: { transform: `translateX(${translationValue}px)` },
    to: { transform: `translateX(0px)` },
    ref: springRef,
    config: config.stiff,
    reverse: expanded,
  });

  const trailRef = useSpringRef();
  const trailSprings = useTrail(colors.length, {
    from: { height: "5px" },
    to: { height: "80px" },
    ref: trailRef,
    reverse: !expanded,
  });

  const getComputedTranslationValue = (element) => {
    const barsContainerWidth = parseFloat(
      animatedBarsContainerRef.current.getBoundingClientRect().width,
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

  useIsomorphicLayoutEffect(() => {
    setTranslationValue(getComputedTranslationValue(styledBorderRef.current));
  }, [size]);

  useChain([springRef, trailRef]);

  return (
    <div
      className="mb-3 border border-black p-3 dark:border-white"
      ref={styledBorderRef}
    >
      <animated.div
        className="mb-4 inline-flex h-[100px] items-end"
        style={spring}
        ref={animatedBarsContainerRef}
      >
        {trailSprings.map((trailSpring, index) => (
          <animated.div
            key={colors[index]}
            style={{
              ...trailSpring,
              width: "20px",
              marginRight: "10px",
              transformOrigin: "bottom",
              backgroundColor: colors[index],
            }}
          />
        ))}
      </animated.div>

      <div>
        <button
          type="button"
          onClick={() => {
            setExpanded((prevState) => !prevState);
          }}
        >
          Click to Animate
        </button>
      </div>
    </div>
  );
};

export default TranslateStaggeredBars;
