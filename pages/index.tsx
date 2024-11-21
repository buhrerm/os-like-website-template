import type { NextPage } from 'next';
import Head from 'next/head';
import Desktop from '../components/Desktop';
import {WEBSITE_TITLE} from '../constants/constants';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{WEBSITE_TITLE}</title>
        <meta name="description" content="Explore my projects." />
      </Head>
      <Desktop />
    </>
  );
};

export default Home;
