/* eslint-disable no-await-in-loop */
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const AnimatedDiv = styled(animated.div)`
  display: inline-block;
`;

const TranslateHorizontalWithColorChange = ({ children }) => {
  const translationSpring = useSpring({
    from: {
      transform: `translate(50px)`,
    },
    to: {
      transform: `translate(0px)`,
    },
    config: {
      mass: 50,
    },
  });
  const colorSpring = useSpring({
    from: {
      color: 'black',
    },
    to: async next => {
      // eslint-disable-next-line no-constant-condition
      while (1) {
        await next({ color: 'blue' });
        await next({ color: 'red' });
        await next({ color: 'green' });
        await next({ color: 'purple' });
        await next({ color: 'orange' });
      }
    },
  });

  return <AnimatedDiv style={{ ...translationSpring, ...colorSpring }}>{children}</AnimatedDiv>;
};

export default TranslateHorizontalWithColorChange;
