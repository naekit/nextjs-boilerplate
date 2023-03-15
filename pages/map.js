import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../components/MapFile'), { ssr: false });

function MyPage() {
  return (
      <Map />
  );
}

export default MyPage;