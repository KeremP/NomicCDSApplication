import Image from 'next/image';
import MemberGrowthChart from '@/components/member_growth';
import { withScreenSize } from '@visx/responsive';


type Size = {
  width: number;
  height: number;
}

const defaultSize = {
  width: 400,
  height: 400
}

export default function Home() {

  return (
    <main className="overflow-hidden flex min-h-screen h-screen flex-col items-center justify-between py-14 px-8">
      <div className='flex flex-row h-full w-full'>

        <div className='w-1/5 h-full border'>

        </div>

        <div className='w-[90%] h-full border px-8'>
          <MemberGrowthChart
            width={defaultSize.width}
            height={defaultSize.height}
          />
        </div>

      </div>
    </main>
  )
}
