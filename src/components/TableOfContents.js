import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
// import styled from 'styled-components';
import InlineLink from './InlineLink';

const TableOfContents = ({ items, path }) => {
  const renderLi = item => {
    return (
      <InlineLink as={Link} to={`${path}${item.url}`}>
        {item.title}
      </InlineLink>
    );
  };

  const createTOC = item => {
    if (item.items) {
      return (
        <li key={item.url}>
          {renderLi(item)}
          <ul>{item.items && item.items.map(createTOC)}</ul>
        </li>
      );
    }
    return <li key={item.url}>{renderLi(item)}</li>;
  };
  return <ul>{items.map(createTOC)}</ul>;
};

TableOfContents.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string,
      url: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          item: PropTypes.string,
          url: PropTypes.string,
          items: PropTypes.arrayOf(
            PropTypes.shape({
              item: PropTypes.string,
              url: PropTypes.string,
            })
          ),
        })
      ),
    })
  ),
  path: PropTypes.string.isRequired,
};

export default TableOfContents;
