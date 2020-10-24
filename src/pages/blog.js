import React, { useState } from 'react';
import styled from 'styled-components';
import { matchSorter } from 'match-sorter';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import BlogListItem from '../components/BlogListItem';
import SEO from '../components/SEO';
import useBlogPageQuery from '../hooks/useBlogPageQuery';

const StyledInput = styled.input`
  width: 100%;
  padding: 2px 4px;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.black};
  border: 1px solid ${({ theme }) => theme.gray2};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.gray1};
  }

  &:hover {
    &::placeholder {
      color: ${({ theme }) => theme.black};
    }
    border-color: ${({ theme }) => theme.gray1};
  }

  &:focus {
    &::placeholder {
      color: ${({ theme }) => theme.black};
    }
    border-color: ${({ theme }) => theme.primary.pressed};
  }
`;

const Blog = () => {
  const data = useBlogPageQuery();

  const { edges } = data.allMdx;
  const blogPosts = React.useMemo(() => {
    return edges.map(({ node: post }) => {
      const { id, excerpt } = post;
      return {
        id,
        excerpt,
        ...post.fields,
        ...post.frontmatter,
      };
    });
  }, [edges]);
  const [posts, setPosts] = useState(blogPosts);
  const [filterVal, setFilterVal] = useState('');

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setFilterVal(searchTerm);

    if (!searchTerm) {
      setPosts(blogPosts);
      return;
    }
    const filteredPosts = matchSorter(blogPosts, searchTerm, {
      keys: ['title', 'keywords', { key: 'excerpt', threshold: matchSorter.rankings.CONTAINS }],
    });

    setPosts(filteredPosts);
  };

  return (
    <>
      <SEO title="Blog" />
      <Container>
        <PageTitle block>BLOG</PageTitle>
        <StyledInput type="text" value={filterVal} onChange={handleInputChange} placeholder="Search posts" />
        {posts.length > 0 ? (
          posts.map(({ id, excerpt, slug, title, createdAt, updatedAt }) => {
            const blogListItemProps = {
              excerpt,
              slug,
              title,
              createdAt,
              updatedAt,
            };
            return <BlogListItem key={id} {...blogListItemProps} />;
          })
        ) : (
          <p>
            No posts to show at the moment{' '}
            <span role="img" aria-label="sad face">
              😭
            </span>
          </p>
        )}
      </Container>
    </>
  );
};

export default Blog;
