import Navbar from '@/components/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='max-h-screen overflow-hidden'>
        <Navbar />
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}
