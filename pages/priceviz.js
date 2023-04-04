import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import Scatterplot from '@/components/ScatterPlot'

export default function PriceViz({ data }) {
  return (
    <>
      <Head>
        <title>Price Visualization</title>
        <meta name="description" content="Price Visualization of Real Estate Data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-h-screen'>
        <Scatterplot data={data.features} />
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