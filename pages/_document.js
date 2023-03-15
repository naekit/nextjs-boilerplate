import Navbar from '@/components/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='h-screen bg-gradient-to-tr from-gray-600 to-slate-900 '>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
