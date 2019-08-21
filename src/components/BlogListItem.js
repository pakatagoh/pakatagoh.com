import React from 'react';
import PropType from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';
import formatDate from '../utils/formatDate';
import Small from './Small';

const StyledArticle = styled.article`
  margin-bottom: ${rhythm(1)};
`;

const StyledSmall = styled(Small)`
  color: ${({ theme }) => theme.gray2};
`;

const StyledPostTitle = styled.h2`
  margin-bottom: ${rhythm(1 / 5)};

  & a {
    font-size: 1em;
    color: ${({ theme }) => theme.black};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.primary.hover};
      border-bottom: 1px solid ${({ theme }) => theme.primary.hover};
      background-color: ${({ theme }) => theme.white2};
    }
    &:active {
      background-color: ${({ theme }) => theme.white};
      border-bottom: 1px solid ${({ theme }) => theme.primary.pressed};
      color: ${({ theme }) => theme.primary.pressed};
    }
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primary.base};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primary.hover};
    border-bottom: 1px solid ${({ theme }) => theme.primary.hover};
    background-color: ${({ theme }) => theme.white2};
  }
  &:active {
    background-color: ${({ theme }) => theme.white};
    border-bottom: 1px solid ${({ theme }) => theme.primary.pressed};
    color: ${({ theme }) => theme.primary.pressed};
  }
`;

const StyledExcerpt = styled.p`
  margin-bottom: 0;
`;

const BlogListItem = ({ slug, title, postTitleAs, excerpt, updatedAt, createdAt }) => {
  return (
    <StyledArticle>
      <StyledPostTitle as={postTitleAs}>
        <Link to={slug}>{title}</Link>
      </StyledPostTitle>
      <StyledExcerpt>
        {excerpt}
        <StyledLink to={slug}>
          READ POST <i className="icon-arrow_right_solid" />
        </StyledLink>
      </StyledExcerpt>
      <div>
        {createdAt && (
          <>
            <StyledSmall>Posted: </StyledSmall>
            <StyledSmall forwardedAs="time" dateTime={updatedAt}>
              {formatDate(createdAt)}
            </StyledSmall>
          </>
        )}
        {updatedAt && (
          <>
            <StyledSmall> / Updated: </StyledSmall>
            <StyledSmall forwardedAs="time" dateTime={updatedAt}>
              {formatDate(updatedAt)}
            </StyledSmall>
          </>
        )}
      </div>
    </StyledArticle>
  );
};

BlogListItem.propTypes = {
  title: PropType.string.isRequired,
  postTitleAs: PropType.string,
  slug: PropType.string.isRequired,
  createdAt: PropType.string,
  updatedAt: PropType.string,
  excerpt: PropType.string.isRequired,
};

export default BlogListItem;
