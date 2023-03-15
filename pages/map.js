import { Inter } from 'next/font/google'
import Table from '@/components/Table'
import fs from 'fs'
import path from 'path'
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