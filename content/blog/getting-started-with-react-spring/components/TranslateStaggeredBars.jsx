import React, { useState, useRef, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import { useTrail, animated, useSpring, useChain, config } from 'react-spring';
import Button from '../../../../src/components/Button';
import useWindowSize from '../../../../src/hooks/useWindowResize';
import { rhythm } from '../../../../src/utils/typography';

const StyledBorder = styled.div(
  ({ theme }) => css`
    border: 1px solid ${theme.secondary.base};
    padding: ${rhythm(1)};
    margin-bottom: ${rhythm(1)};
  `
);

const AnimatedBarsContainer = styled(animated.div)`
  height: 100px;
  display: inline-flex;
  align-items: flex-end;
  margin-bottom: 15px;
`;

const colors = ['red', 'green', 'blue', 'orange', 'purple', 'yellow'];

const TranslateStaggeredBars = () => {
  const styledBorderRef = useRef();
  const animatedBarsContainerRef = useRef();
  const size = useWindowSize();

  const [translationValue, setTranslationValue] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const springRef = useRef();
  const spring = useSpring({
    from: { transform: `translateX(${translationValue}px)` },
    to: { transform: `translateX(0px)` },
    ref: springRef,
    config: config.stiff,
    reverse: expanded,
  });

  const trailRef = useRef();
  const trailSprings = useTrail(colors.length, {
    from: { height: '5px' },
    to: { height: '80px' },
    ref: trailRef,
    reverse: !expanded,
  });

  const getComputedTranslationValue = (element) => {
    const barsContainerWidth = parseFloat(animatedBarsContainerRef.current.getBoundingClientRect().width);

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

  useChain(expanded ? [springRef, trailRef] : [trailRef, springRef]);

  return (
    <StyledBorder ref={styledBorderRef}>
      <AnimatedBarsContainer style={spring} ref={animatedBarsContainerRef}>
        {trailSprings.map((trailSpring, index) => (
          <animated.div
            key={colors[index]}
            style={{
              ...trailSpring,
              width: '20px',
              marginRight: '10px',
              transformOrigin: 'bottom',
              backgroundColor: colors[index],
            }}
          />
        ))}
      </AnimatedBarsContainer>
      <div>
        <Button
          type="button"
          onClick={() => {
            setExpanded((prevState) => !prevState);
          }}
        >
          Click to Animate
        </Button>
      </div>
    </StyledBorder>
  );
};

export default TranslateStaggeredBars;
