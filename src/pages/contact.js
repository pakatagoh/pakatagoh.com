/* eslint-disable camelcase */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Row from '../components/Row';
import Col from '../components/Col';
import Block from '../components/Block';
import PageTitle from '../components/PageTitle';
import CopyButton from '../components/CopyButton';
import LayerImage from '../components/LayerImage';
import IconList from '../components/IconList';

const EMAIL = 'pakatagohlh@gmail.com';

const StyledSectionHeader = styled.h2`
  margin-bottom: 30px;

  ${media.sm`
    margin-bottom: 50px;
  `};
`;

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
  const data = useStaticQuery(graphql`
    query contactImageQuery {
      contactImage: file(relativePath: { eq: "typing-hands.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const { fluid } = data.contactImage.childImageSharp;

  return (
    <Layout>
      <Container>
        <PageTitle>Contact</PageTitle>
        <section>
          <Block>
            <Row className="align-items-center">
              <StyledLeftCol>
                <StyledSectionHeader>GET IN TOUCH</StyledSectionHeader>
                <StyledCopyButtonWrapper>
                  <CopyButton text={EMAIL} />
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
    </Layout>
  );
};

export default Contact;
