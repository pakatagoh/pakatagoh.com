import React, { useState, useRef, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import { useTransition, animated, config } from 'react-spring';
import Button from '../../../../src/components/Button';
import { rhythm } from '../../../../src/utils/typography';
import useWindowSize from '../../../../src/hooks/useWindowResize';

const StyledBorder = styled.div(
  ({ theme }) => css`
    border: 1px solid ${theme.secondary.base};
    padding: ${rhythm(1)};
    margin-bottom: ${rhythm(1)};
  `
);

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

  const getComputedTranslationValue = element => {
    const barsContainerWidth = parseFloat(animatedDiv.current.getBoundingClientRect().width);

    const cs = getComputedStyle(element);

    const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);

    // Element width minus padding and border
    const translationAmount = element.getBoundingClientRect().width - paddingX - borderX - barsContainerWidth;
    return translationAmount;
  };

  useLayoutEffect(() => {
    setTranslationValue(getComputedTranslationValue(styledBorderRef.current));
  }, [size]);

  return (
    <StyledBorder ref={styledBorderRef}>
      <div style={{ width: '50px', height: '40px' }}>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={{ ...props, display: 'inline-block' }} ref={animatedDiv}>
                Yo
              </animated.div>
            )
        )}
      </div>
      <Button
        type="button"
        onClick={() => {
          setIsDisplay(prevState => !prevState);
        }}
      >
        Click to Animate
      </Button>
    </StyledBorder>
  );
};
export default DisappearingComponent;
