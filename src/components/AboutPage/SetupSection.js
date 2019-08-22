import React from 'react';
import Section from '../Section';
import StyledList from './StyledList';
import StyledListItem from './StyledListItem';

const SETUP = [
  { label: 'Computer', name: 'Dell XPS 15' },
  { label: 'Monitor', name: 'LG 27UD88-W' },
  { label: 'Keyboard', name: 'Anne Pro2 / Logitech K780' },
  { label: 'Mouse', name: 'Logitech MX Master 2' },
  { label: 'Code Editor', name: 'Visual Studio Code' },
  { label: 'Font', name: 'Fira Code (with ligatures)' },
  { label: 'Theme', name: 'Monokai++ or Andromeda(Colorizer), depends on my mood' },
];

const SetupSection = () => {
  return (
    <Section header="SETUP">
      <StyledList>
        {SETUP.map(({ label, name }) => (
          <StyledListItem key={label}>
            <strong>{label}:</strong> {name}
          </StyledListItem>
        ))}
      </StyledList>
    </Section>
  );
};

export default SetupSection;
