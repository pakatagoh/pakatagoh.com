import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

const SecondPage = () => {
  return (
    <Layout>
      <div>Hello from page2</div>
      <Link to="/">Go Home</Link>
    </Layout>
  );
};

export default SecondPage;
