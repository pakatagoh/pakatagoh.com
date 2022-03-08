import React, { useState, useRef, useLayoutEffect } from "react";
// import styled, { css } from "styled-components";
import { useSpring, animated, config } from "react-spring";
import Button from "../../../../src/components/Button";
// import { rhythm } from "../../../../src/utils/typography";
import useWindowResize from "../../../../src/hooks/useWindowResize";

// const StyledBorder = styled.div(
//   ({ theme }) => css`
//     border: 1px solid ${theme.secondary.base};
//     padding: ${rhythm(1)};
//     margin-bottom: ${rhythm(1)};
//   `
// );

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
        <Button
          type="button"
          onClick={() => {
            setTranslated((prevState) => !prevState);
          }}
        >
          Click to Translate
        </Button>
      </div>
    </div>
  );
};

export default Translate;
