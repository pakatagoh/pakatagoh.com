import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import { options } from '../utils/typography';
import { OFFSET_PADDING } from './LayerImage';
import Image from './Image';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import CopyButton from './CopyButton';
import SocialIconList from './SocialIconList';
import Block from './Block';

const IMAGE_SIZE = {
  sm: '125px',
  xs: '80px',
};

const CalloutBackground = styled.div`
  background-color: ${({ theme }) => theme.white2};
`;

const StyledParagraph = styled.p`
  font-size: ${9 / 10}rem;
  line-height: ${options.baseLineHeight * (8 / 10)};
  margin-bottom: ${options.baseLineHeight * (5 / 10)}rem;
`;

const StyledCopyButton = styled(CopyButton)`
  font-size: ${10 / 10}rem;
  margin-top: ${options.baseLineHeight * (3 / 10)}rem;
  margin-bottom: ${options.baseLineHeight * (3 / 10)}rem;
  margin-right: ${options.baseLineHeight * (3 / 10)}rem;

  ${media.sm`
    font-size: ${12 / 10}rem;
  margin-top: ${options.baseLineHeight * (4 / 10)}rem;
  margin-bottom: ${options.baseLineHeight * (4 / 10)}rem;
    margin-right: ${options.baseLineHeight * (4 / 10)}rem;
  `};
`;

const StyledWrapper = styled.div`
  padding-top: ${OFFSET_PADDING.xs}px;
  padding-left: ${OFFSET_PADDING.xs}px;

  ${media.sm`
    padding-top: ${OFFSET_PADDING.md}px;
    padding-left: ${OFFSET_PADDING.md}px
  `};
`;

const StyledBackgroundLayer = styled.div`
  width: ${IMAGE_SIZE.xs};
  height: ${IMAGE_SIZE.xs};
  background-color: ${({ theme }) => theme.secondary.base};
  box-shadow: ${({ theme }) => theme.shadow.hover};

  ${media.sm`
  width: ${IMAGE_SIZE.sm}
  height: ${IMAGE_SIZE.sm}
  `};
`;

const StyledImageWrapper = styled.div`
  width: ${IMAGE_SIZE.xs};
  height: ${IMAGE_SIZE.xs};
  transform: translate(-${OFFSET_PADDING.xs}px, -${OFFSET_PADDING.xs}px);

  ${media.sm`
  width: ${IMAGE_SIZE.sm}
  height: ${IMAGE_SIZE.sm}
  transform: translate(-${OFFSET_PADDING.sm}px, -${OFFSET_PADDING.sm}px);
  `};
`;

const StyledCol = styled(Col)`
  flex: 1 1 auto;
`;

const Callout = () => {
  const data = useStaticQuery(graphql`
    query calloutImageQuery {
      calloutImage: file(relativePath: { eq: "pg-headshot.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const { fluid } = data.calloutImage.childImageSharp;

  return (
    <CalloutBackground>
      <Block>
        <Container>
          <Row className="align-items-sm-center">
            <Col>
              <StyledWrapper>
                <StyledBackgroundLayer>
                  <StyledImageWrapper>
                    <Image fluid={fluid} alt="pakata goh" />
                  </StyledImageWrapper>
                </StyledBackgroundLayer>
              </StyledWrapper>
            </Col>
            <StyledCol>
              <StyledParagraph>
                Hey! I&apos;m Pakata, a software developer from Singapore specializing in JavaScript. In this personal
                site, I write about things I&apos;ve learnt and hopefully you&apos;ll learn a thing or two from me.
              </StyledParagraph>
              <div className="d-flex flex-row-wrap align-items-center">
                <StyledCopyButton text="pakatagohlh@gmail.com" />
                <SocialIconList className="flex-row-wrap" />
              </div>
            </StyledCol>
          </Row>
        </Container>
      </Block>
    </CalloutBackground>
  );
};

export default Callout;
