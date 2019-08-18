import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { media } from '../styles/sizes';
import useCopy from '../hooks/useCopy';

const StyledCopyButton = styled.button`
  font-family: 'Roboto Condensed', 'Georgia', 'serif';
  font-size: 1.22rem;
  padding: 0;
  border: none;
  background: none;

  &:hover {
    cursor: pointer;
  }

  &:active,
  &:focus {
    outline: none;
  }

  ${media.sm`
    font-size: 1.33rem;
  `};
`;

const StyledCopyMessageWrapper = styled.div`
  margin-left: 10px;
  display: inline-block;
`;

const goTransparent = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledCopyMessage = styled.span`
  font-size: 0.88rem;
  animation: ${goTransparent} 1.5s linear;
`;

class CopyMessage extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  handleUnmount() {
    ReactDOM.unmountComponentAtNode(document.querySelector('#copy-message'));
  }

  render() {
    const { message } = this.props;
    return <StyledCopyMessage onAnimationEnd={this.handleUnmount}>{message}</StyledCopyMessage>;
  }
}

const CopyButton = ({ text, ...rest }) => {
  const { handleCopy } = useCopy();
  const copyMessageRef = React.createRef();

  const handleClick = () => {
    const message = handleCopy(text);
    if (copyMessageRef.current.querySelector('span')) {
      ReactDOM.unmountComponentAtNode(document.querySelector('#copy-message'));
    }
    ReactDOM.render(<CopyMessage message={message} />, document.querySelector('#copy-message'));
  };

  return (
    <div {...rest}>
      <StyledCopyButton type="button" aria-label="Copy email to clipboard" onClick={handleClick}>
        {text}
      </StyledCopyButton>
      <StyledCopyMessageWrapper ref={copyMessageRef} id="copy-message" />
    </div>
  );
};

CopyMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyButton;
