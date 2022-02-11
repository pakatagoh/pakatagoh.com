import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useTrail, animated } from 'react-spring';
import Button from '../../../../src/components/Button';
import { rhythm } from '../../../../src/utils/typography';

const StyledBorder = styled.div(
  ({ theme }) => css`
    border: 1px solid ${theme.secondary.base};
    padding: ${rhythm(1)};
    margin-bottom: ${rhythm(1)};
  `
);

const BarsContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
`;

const colors = ['red', 'green', 'blue', 'orange', 'purple', 'yellow'];

const StaggeredBars = () => {
  const [expanded, setExpanded] = useState(true);
  const trailSprings = useTrail(colors.length, {
    from: { height: expanded ? '80px' : '5px' },
    to: { height: expanded ? '5px' : '80px' },
  });

  return (
    <StyledBorder>
      <BarsContainer>
        {trailSprings.map((spring, index) => (
          <animated.div
            key={colors[index]}
            style={{
              ...spring,
              width: '20px',
              marginRight: '10px',
              transformOrigin: 'bottom',
              backgroundColor: colors[index],
            }}
          />
        ))}
      </BarsContainer>
      <Button
        type="button"
        onClick={() => {
          setExpanded((prevState) => !prevState);
        }}
      >
        Click to Animate
      </Button>
    </StyledBorder>
  );
};

export default StaggeredBars;
