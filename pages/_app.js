import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component className='bg-gradient-to-tr from-gray-600 to-slate-900' {...pageProps} />
}
