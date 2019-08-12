import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';

const StyledListWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.gray3};
`;

const StyledListHeader = styled.h3`
  font-family: 'Roboto Condensed', 'Georgia', 'serif';
  font-size: 1.2rem;
  font-weight: normal;
  margin: 0;
  text-align: center;

  ${media.sm`
    font-size: 1.3rem;
  `};
`;

const StyledList = styled.ul`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;

  & li {
    font-size: 0.8rem;
    text-align: center;

    &:last-of-type {
      margin: 0;
    }

    ${media.sm`
      font-size: 1rem;
    `};
  }
`;

const BorderList = ({ header, iconClassName, items }) => {
  return (
    <StyledListWrapper>
      <StyledListHeader>
        {iconClassName && <i className={`${iconClassName} icon-md`} />} {header}
      </StyledListHeader>
      <StyledList>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </StyledList>
    </StyledListWrapper>
  );
};

BorderList.propTypes = {
  header: PropTypes.string.isRequired,
  iconClassName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BorderList;
