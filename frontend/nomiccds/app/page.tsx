import Image from 'next/image';

import Dashboard from './dashboard';
import Chart from '@/components/chart';
import { DonutChart } from '@/components/donut';
import LurkerDonutResponsive from '@/components/lurker_donut';
import TopMessages from '@/components/top_messages';
import TimeToCommunicate from '@/components/time_to_comm';
import SentimentMeter from '@/components/sentiment';
import TopTopics, { Topic} from '@/components/topics';


const data = [{"timestamp":"2023-02-19","value":1},{"timestamp":"2023-02-26","value":26},{"timestamp":"2023-03-05","value":37},{"timestamp":"2023-03-12","value":32},{"timestamp":"2023-03-19","value":28},{"timestamp":"2023-03-26","value":18},{"timestamp":"2023-04-02","value":5220},{"timestamp":"2023-04-09","value":2688},{"timestamp":"2023-04-16","value":3921},{"timestamp":"2023-04-23","value":2271},{"timestamp":"2023-04-30","value":1266},{"timestamp":"2023-05-07","value":1154},{"timestamp":"2023-05-14","value":301}];
const events = [{"timestamp":"2023-03-27", "event":"GPT4All released", "value":1000}];

const messageData = [{"id":3736,"user":"Andriy","reactionCount":219,"timestamp":"2023-04-14 02:17:20.994000+00:00","content":"<@&1091180317878009896> \nWe've heard your asks. Expect an unfiltered model tomorrow.\n💥"},{"id":3739,"user":"Andriy","reactionCount":126,"timestamp":"2023-04-10 21:27:54.236000+00:00","content":"<@&1091180317878009896> \nGPT-J based model (no LLaMa license restrictions), accessible through a single download link that runs on OSX, Windows and Ubuntu and through Python bindings incoming in the next 24 hours. GPT4All."},{"id":3740,"user":"Andriy","reactionCount":98,"timestamp":"2023-04-08 05:25:08.914000+00:00","content":"<@&1091180317878009896> \n- gpt-j custom llama.cpp bindings are being hacked on. GPT-J is trained  and quantized.\n- creative model data is prepared, train will brrrrr this weekend.\n- the next open source data drop will be over 2x the previous\n- congratulations to open assistant on their model launch! excited to see their data added to the gpt4all open source data lake!\n- take a breath: the community is vibrant, new models enter the ecosystem daily and we are working towards a decentralized future together. I've never been more optimistic about what's to come."},{"id":3737,"user":"Andriy","reactionCount":87,"timestamp":"2023-04-13 20:59:15.779000+00:00","content":"<@&1091180317878009896> \nGPT4All-J, the first apache-2 licensed chatbot you can run on your CPU, is here!\nYou can download it at the top of the readme: https://github.com/nomic-ai/gpt4all\nOn the gpt4all website: https://gpt4all.io\n\nOur elite community hackers have packaged the open-source model into an easy to use installer that works on MacOS, Windows and Ubuntu!\nWindows: https://gpt4all.io/installers/gpt4all-0.1.0-win64.exe\nUbuntu: https://gpt4all.io/installers/gpt4all-0.1.0-Linux.run\nOSX: https://gpt4all.io/installers/gpt4all-0.1.0-Darwin.dmg\nPlease follow instructions on the github readme or website to get going."},{"id":3728,"user":"Andriy","reactionCount":74,"timestamp":"2023-05-01 15:50:12.433000+00:00","content":"<@&1091180317878009896> \nSneak peak for what is to come 🙂"}];
const userStats = {"time_to_first_comm_stats":{"median":9,"mean":1536},"lurker_count":13918,"top_communicators":[{"user":"eachadea","value":6610},{"user":"gonzochess75","value":3727},{"user":"ItBurnz","value":3383},{"user":"TheBloke","value":3068},{"user":"Helly","value":2302}],"total_users":16616};
const top_comms = userStats.top_communicators;
const lurkerData = [{user:"lurkers", value:parseInt(((userStats.lurker_count/userStats.total_users)*100).toFixed(2))}, {user:"contributors", value:parseInt((((userStats.total_users - userStats.lurker_count)/userStats.total_users)*100).toFixed(2))}];
console.log(lurkerData)
let growthData = data.map((d) => ({...d, date: new Date(d.timestamp)}));
let eventData = events.map((d) => ({...d, date: new Date(d.timestamp)}));

const topicData: Topic[] = [
  {
    topic:"Test1",
    messages: messageData
  },
  {
    topic:"Test2",
    messages: messageData
  },
  {
    topic:"Test2",
    messages: messageData
  }
];

export default function Home() {

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between py-6 px-8">
      <div className='flex flex-row h-full w-full'>

        <div className='w-1/5 h-full border'>

        </div>

        <div className='w-[90%] h-full border px-8'>
          <div className='grid grid-cols-3 gap-x-4 h-full py-4'>
            <div className='col-span-3 h-[300px] rounded-md bg-zinc-900 p-8'>
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
              <TimeToCommunicate time={"0:10:00"}/>
              <SentimentMeter
                positive={60}
                negative={20}
                neutral={20}
              />
            </div>
            <div className='h-full p-4 rounded-md bg-zinc-800'>
              <TopTopics
                topics={topicData}
              />
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}
