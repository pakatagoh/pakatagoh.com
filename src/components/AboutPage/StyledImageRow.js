import styled from 'styled-components';
import Row from '../Row';
import { media } from '../../styles/sizes';
import { rhythm } from '../../utils/typography';

const StyledImageRow = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${rhythm(1)};

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.md`
    flex-wrap: nowrap;
  `}
`;

export default StyledImageRow;
