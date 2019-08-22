import React from 'react';
import Section from '../Section';
import InlineLink from '../InlineLink';
import StyledList from './StyledList';
import StyledListItem from './StyledListItem';

const TALKS = [
  {
    name: 'Hooked on Hooks: Intro to React Hooks',
    href: 'https://www.youtube.com/watch?v=7tcf20ItkA0',
  },
];

const SetupSection = () => {
  return (
    <Section header="TALKS">
      <StyledList>
        {TALKS.map(({ href, name }) => (
          <StyledListItem key={name}>
            <InlineLink href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
              {name}
            </InlineLink>
          </StyledListItem>
        ))}
      </StyledList>
    </Section>
  );
};

export default SetupSection;
