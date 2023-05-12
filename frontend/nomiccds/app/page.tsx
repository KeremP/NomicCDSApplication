import Image from 'next/image';

import Chart from '@/components/chart';
import LurkerDonutResponsive from '@/components/lurker_donut';
import TopMessages, { Message } from '@/components/top_messages';
import TimeToCommunicate from '@/components/time_to_comm';
import SentimentMeter from '@/components/sentiment';
import TopTopics, { Topic } from '@/components/topics';
import Sidebar from '@/components/sidebar';

type MemberData = {
  memberGrowth: {timestamp:string, value:number}[];
  events: {timestamp:string, event:string, value:number}[];
}

type UserStats = {
  time_to_first_comm_stats: {median: string, mean: string};
  lurker_count: number;
  top_communicators: {user: string, value: number}[];
  total_users: number;
}

type SentimentResp = {
  positive: number;
  negative: number;
  neutral: number;
}

type TopicResp = {
  depth:number;
  topic:number;
  _topic_depth_1:string;
  topic_description:string;
  topic_short_description:string;
}

async function getMemberData () {
  const res = await fetch("http://127.0.0.1:8000/data/get_member_growth");
  if (!res.ok) {
    throw new Error("Failed to fetch member growth data");
  }

  return res.json();
}

async function getTopMessages () {
  const res = await fetch("http://127.0.0.1:8000/data/get_top_messages");
  if (!res.ok) {
    throw new Error("Failed to fetch top messages");
  }

  return res.json();
}

async function getUserStats () {
  const res = await fetch("http://127.0.0.1:8000/data/get_user_stats");
  if (!res.ok) {
    throw new Error("Failed to fetch user stats");
  }

  return res.json();
}

async function getUserSentiment () {
  const res = await fetch("http://127.0.0.1:8000/data/get_user_sentiment");
  if (!res.ok) {
    throw new Error("Failed to fetch user sentiment");
  }

  return res.json();
}

async function getTopics () {
  const res = await fetch("http://127.0.0.1:8000/data/get_topics");
  if (!res.ok) {
    throw new Error("Failed to fetch topics");
  }

  return res.json();
}

export default async function Home() {

  const memberData: MemberData = await getMemberData();
  const growthData = memberData.memberGrowth.map((d) => ({...d, date: new Date(d.timestamp)}));
  const eventData = memberData.events.map((d) => ({...d, date: new Date(d.timestamp)}));

  const messageData: Message[] = await getTopMessages();

  const userStats: UserStats = await getUserStats();

  const share_of_top_comms = userStats.top_communicators.reduce((acc, d) => acc + d.value, 0);
  const top_comms = userStats.top_communicators.map((d) => ({...d,value:Math.round((d.value/share_of_top_comms)*100)}))
  const lurkerData = [{user:"lurkers", value:parseInt(((userStats.lurker_count/userStats.total_users)*100).toFixed(2))}, {user:"contributors", value:parseInt((((userStats.total_users - userStats.lurker_count)/userStats.total_users)*100).toFixed(2))}];
  
  const userSentiment: SentimentResp = await getUserSentiment();

  const topicData: TopicResp[] = await getTopics();
  const topics: Topic[] = topicData.map((d) => ({topic:d._topic_depth_1,keywords:d.topic_description, description:d.topic_short_description}))

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between py-6 px-8">
      <div className='flex flex-row h-full w-full'>

        <div className='w-1/5 h-full'>
          <Sidebar
            active='home'
          />
        </div>

        <div className='w-[90%] h-full px-8'>
          <div className='grid grid-cols-3 gap-x-4 h-full'>
            <div className='col-span-3 h-[300px] rounded-md bg-zinc-900 p-8 flex flex-col'>
              <div className='flex flex-row justify-between w-full items-center'>
                <h2 className='text-lg font-semibold'>Weekly user growth</h2>
                <div className='flex flex-row gap-x-2'>
                  <div className='flex flex-row items-center justify-center gap-x-1'>
                    <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                    <span className='text-xs'>event</span>
                  </div>
                  <div className='flex flex-row items-center justify-center gap-x-1'>
                    <div className='w-2 h-2 rounded-full bg-gray-400'></div>
                    <span className='text-xs'>datapoint</span>
                  </div>
                </div>
              </div>
              
              <Chart
                data={growthData}
                events={eventData}
              />
            </div>
            <div className='h-full p-4 rounded-md bg-zinc-800 text-white'>
              <LurkerDonutResponsive
                dataTop={top_comms}
                dataLurker={lurkerData}
              />
            </div>
            <div className='h-full p-4 rounded-md bg-zinc-800 flex flex-col justify-between'>
              <TopMessages
                messages={messageData.slice(0, 3)}
              />
              <TimeToCommunicate time={userStats.time_to_first_comm_stats.median}/>
              <SentimentMeter
                positive={userSentiment.positive}
                negative={userSentiment.negative}
                neutral={userSentiment.neutral}
              />
            </div>
            <div className='h-full p-4 rounded-md bg-zinc-800 flex flex-col'>
              <TopTopics
                topics={topics}
              />
              <div className='w-full h-full flex justify-center items-center relative'>
                <div className='absolute top-0 left-0 w-full h-full bg-zinc-800/50 backdrop-blur-sm flex justify-center items-center'>
                  <a href='/atlas' className='text-sm px-2 bg-zinc-800 rounded-md py-1 hover:bg-zinc-700/50'>View Atlas</a>
                </div>
                <div className='mx-auto'>
                  <Image
                    width={150}
                    height={100}
                    src={"/atlas.png"}
                    alt='atlast preview'
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}
