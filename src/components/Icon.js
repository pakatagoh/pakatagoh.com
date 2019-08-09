import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledIconLink = styled.a`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.secondary.hover};
    box-shadow: ${({ theme }) => theme.shadow.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.secondary.pressed};
    box-shadow: ${({ theme }) => theme.shadow.pressed};
  }
`;

const StyledIconWrapper = styled.div`
  width: 27px;
  height: 27px;
`;

const StyledIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const Icon = ({ icon }) => {
  return (
    <StyledIconLink href={icon.to} target="_blank" rel="noreferrer noopener">
      <StyledIconWrapper>
        <StyledIcon src={icon.src} alt={icon.name} />
      </StyledIconWrapper>
    </StyledIconLink>
  );
};

Icon.propTypes = {
  icon: PropTypes.shape({
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
};

export default Icon;
