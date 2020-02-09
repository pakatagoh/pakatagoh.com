/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Container from '../components/Container';
import Row from '../components/Row';
import Col from '../components/Col';
import Block from '../components/Block';
import PageTitle from '../components/PageTitle';
import CopyButton from '../components/CopyButton';
import LayerImage from '../components/LayerImage';
import IconList from '../components/IconList';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import useContactPageQuery from '../hooks/useContactPageQuery';
import config from '../../config';

const StyledCopyButtonWrapper = styled.div`
  margin-bottom: 10px;

  ${media.sm`
    margin-bottom: 0;
  `};
`;

const StyledLeftCol = styled(Col)`
  ${media.md`
    flex: 1 1 auto;
  `};
`;

const StyledRightCol = styled(Col)`
  display: none;

  ${media.md`
    display: block;
  `};
`;

const Contact = () => {
  const data = useContactPageQuery();

  const { fluid } = data.contactImage.childImageSharp;

  return (
    <>
      <SEO title="Contact" />
      <Container>
        <PageTitle block>Contact</PageTitle>
        <section>
          <Block>
            <Row className="align-items-center">
              <StyledLeftCol>
                <SectionHeader>GET IN TOUCH</SectionHeader>
                <StyledCopyButtonWrapper>
                  <CopyButton text={config.email} />
                </StyledCopyButtonWrapper>
                <IconList />
              </StyledLeftCol>
              <StyledRightCol>
                <LayerImage fluid={fluid} alt="Get in touch" />
              </StyledRightCol>
            </Row>
          </Block>
        </section>
      </Container>
    </>
  );
};

export default Contact;
