import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../components/MapFile'), { ssr: false });

function MyPage() {
  return (
    <main className='h-screen'>
      <Map />
    </main>
  );
}

export default MyPage;