import Image from 'next/image';

import Dashboard from './dashboard';


const data = [{"timestamp":"2023-02-19","value":1},{"timestamp":"2023-02-26","value":26},{"timestamp":"2023-03-05","value":37},{"timestamp":"2023-03-12","value":32},{"timestamp":"2023-03-19","value":28},{"timestamp":"2023-03-26","value":18},{"timestamp":"2023-04-02","value":5220, "event":"GPT4All is released on twitter", "eventTimestamp":"2023-04-05"},{"timestamp":"2023-04-09","value":2688},{"timestamp":"2023-04-16","value":3921},{"timestamp":"2023-04-23","value":2271},{"timestamp":"2023-04-30","value":1266},{"timestamp":"2023-05-07","value":1154},{"timestamp":"2023-05-14","value":301}];
const messageData = [{"id":3736,"user":"Andriy","reactionCount":219,"timestamp":"2023-04-14 02:17:20.994000+00:00","content":"<@&1091180317878009896> \nWe've heard your asks. Expect an unfiltered model tomorrow.\n💥"},{"id":3739,"user":"Andriy","reactionCount":126,"timestamp":"2023-04-10 21:27:54.236000+00:00","content":"<@&1091180317878009896> \nGPT-J based model (no LLaMa license restrictions), accessible through a single download link that runs on OSX, Windows and Ubuntu and through Python bindings incoming in the next 24 hours. GPT4All."},{"id":3740,"user":"Andriy","reactionCount":98,"timestamp":"2023-04-08 05:25:08.914000+00:00","content":"<@&1091180317878009896> \n- gpt-j custom llama.cpp bindings are being hacked on. GPT-J is trained  and quantized.\n- creative model data is prepared, train will brrrrr this weekend.\n- the next open source data drop will be over 2x the previous\n- congratulations to open assistant on their model launch! excited to see their data added to the gpt4all open source data lake!\n- take a breath: the community is vibrant, new models enter the ecosystem daily and we are working towards a decentralized future together. I've never been more optimistic about what's to come."},{"id":3737,"user":"Andriy","reactionCount":87,"timestamp":"2023-04-13 20:59:15.779000+00:00","content":"<@&1091180317878009896> \nGPT4All-J, the first apache-2 licensed chatbot you can run on your CPU, is here!\nYou can download it at the top of the readme: https://github.com/nomic-ai/gpt4all\nOn the gpt4all website: https://gpt4all.io\n\nOur elite community hackers have packaged the open-source model into an easy to use installer that works on MacOS, Windows and Ubuntu!\nWindows: https://gpt4all.io/installers/gpt4all-0.1.0-win64.exe\nUbuntu: https://gpt4all.io/installers/gpt4all-0.1.0-Linux.run\nOSX: https://gpt4all.io/installers/gpt4all-0.1.0-Darwin.dmg\nPlease follow instructions on the github readme or website to get going."},{"id":3728,"user":"Andriy","reactionCount":74,"timestamp":"2023-05-01 15:50:12.433000+00:00","content":"<@&1091180317878009896> \nSneak peak for what is to come 🙂"}];


export default function Home() {

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between py-14 px-8">
      <div className='flex flex-row h-full w-full'>

        <div className='w-1/5 h-full border'>

        </div>

        <div className='w-[90%] h-full border px-8'>
          <Dashboard
            growthData={data}
            messageData={messageData}
          />          
        </div>

      </div>
    </main>
  )
}
