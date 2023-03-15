import Head from 'next/head'
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../components/MapFile'), { ssr: false });

function MyPage() {
  return (
    <>
      <Head>
        <title>Map Cluster</title>
        <meta name="description" content="Map cluster visualization of Real Estate data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen'>
        <Map />
      </main>
    </>
  );
}

export default MyPage;