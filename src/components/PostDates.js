import React from 'react';
import PropTypes from 'prop-types';
import Small from './Small';
import formatDate from '../utils/formatDate';

const PostDates = ({ createdAt, updatedAt }) => {
  return (
    <>
      <Small>Posted: </Small>
      <Small as="time" dateTime={createdAt}>
        {formatDate(createdAt)} /{' '}
      </Small>
      {updatedAt && (
        <>
          <Small>Updated: </Small>
          <Small as="time" dateTime={updatedAt}>
            {formatDate(updatedAt)} /{' '}
          </Small>
        </>
      )}
    </>
  );
};

PostDates.propTypes = {
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
};

export default PostDates;
