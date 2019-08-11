import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Button from './Button';

const StyledButtonLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

const StyledButtonText = styled.span`
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  margin-right: ${({ hasIcon }) => `${hasIcon ? 10 : 0}px`};
  text-transform: uppercase;

  ${media.sm`
    font-size: 14px;
  `};
`;

const ButtonLink = ({ href, color, iconClassName, iconSize, children }) => {
  const childrenIsString = React.Children.count(children) === 1 && typeof children === 'string';
  const hasIcon = iconClassName;

  return (
    <StyledButtonLink href={href} target="_blank" rel="noreferrer noopener">
      <Button color={color}>
        {childrenIsString ? (
          <div className="d-flex align-items-center">
            <StyledButtonText hasIcon={hasIcon}>{children}</StyledButtonText>
            {iconClassName && <i className={`${iconClassName} icon-${iconSize}`} />}
          </div>
        ) : (
          <>{children}</>
        )}
      </Button>
    </StyledButtonLink>
  );
};

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  color: PropTypes.string,
  iconClassName: PropTypes.string,
  iconSize: PropTypes.oneOf(['sm', 'md']),
};

export default ButtonLink;
