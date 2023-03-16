import Head from 'next/head'
import { useRouter } from 'next/router'
import geojson from "../../data/geocollection.json"

export default function ListingDetails({ listing }) {
  const router = useRouter()

  if(router.isFallback){
    return <div className="text-center pt-20 text-md text-zinc-100" >Loading...</div>
  }

  const transformedUrl = listing.properties.image_url
  return (
    <>
      <Head>
        <title>Table</title>
        <meta name="description" content="Table visualization of Real Estate data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen'>  
        <div className='flex flex-col items-center pt-40 h-full'>
          <h1 className='text-4xl text-zinc-100'>{listing.properties.city}</h1>
          <img src={listing.properties.image_url} alt={listing.properties.image_id} />
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({params}) {
  const listing = geojson.features.find((feature) => feature.properties.image_id === params.id)
  return {
    props: {
      listing
    }
  }
}

export async function getStaticPaths() {
  const paths = geojson.features.map((feature) => ({
    params: { id: feature.properties.image_id.toString() }
  }))
  return {
    paths,
    fallback: true
  }
}