import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: lightgreen;
`;

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };
  const handleDecrease = () => {
    setCount(prevCount => prevCount - 1);
  };
  return (
    <Wrapper>
      Count: {count}
      <button type="button" onClick={handleIncrease}>
        INCRE
      </button>
      <button type="button" onClick={handleDecrease}>
        DECR
      </button>
    </Wrapper>
  );
};

export default Counter;
