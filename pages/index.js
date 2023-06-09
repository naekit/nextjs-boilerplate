import Head from 'next/head'
import { Inter } from 'next/font/google'
import Table from '@/components/Table'
import fs from 'fs'
import path from 'path'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Table</title>
        <meta name="description" content="Table visualization of Real Estate data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen'>  
        <Table data={data} />
      </main>
    </>
  )
}

export async function getStaticProps(){
  const filepath = path.join(process.cwd(), 'data', 'geocollection.json')
  const fileContents = fs.readFileSync(filepath, 'utf8')
  const data = JSON.parse(fileContents)

  return {
    props: {
      data
    },
  }
}