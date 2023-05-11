"use client"

import { useState } from "react";
import { Message } from "./top_messages";
import { XSquare } from "lucide-react";

const fontSizes = [
    "text-2xl",
    "text-lg",
    "text-sm"
];

export type Topic = {
    topic: string;
    messages: Message[];
}

const TopTopics = ({topics}:{topics:Topic[]}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState({topic:"Test1",index:0});
    
    const onSelectTopic  = (topic:string, index:number) => {
        setSelectedTopic(
            {topic:topic, index:index}
        )
        setShowModal(true);
    }
    
    return (
        <div className="flex flex-col w-full h-full text-center">
            <h2 className="text-lg font-bold text-start mb-4">
                Popular Topics
            </h2>
            {
                topics.map((topic, i) => 
                    <h2 onClick={() => onSelectTopic(topic.topic, i)} className={`${fontSizes[i]} font-semibold mx-auto my-1 bg-zinc-600/50 rounded-md px-2 cursor-pointer hover:bg-zinc-500/50`}>
                        {topic.topic}
                    </h2>
                )
            }
            <span className="text-xs font-light text-start mt-4">Source: AtlasDB, Nomic Discord</span>
            <div className={`${showModal ? "": "hidden"} fixed h-screen w-screen top-0 left-0 bg-zinc-800/60 backdrop-blur-sm flex justify-center items-center`}>
                <div className="relative w-2/3 h-2/3 bg-zinc-900 rounded-md px-8 py-8 flex flex-col">
                    <div className="relative mx-auto">
                        <h2 className="text-3xl font-bold text-white text-center">
                            {selectedTopic.topic}
                        </h2>
                        <div className="absolute top-0 right-0 translate-x-8 w-6 h-6 bg-black rounded-lg items-center flex justify-center">
                            <span className="text-xs text-white inline-flex">{selectedTopic.index+1}{selectedTopic.index+1 === 1 ? "st": selectedTopic.index+1 === 2 ? "nd" : "rd"}</span>
                        </div>
                    </div>
                    <div className="w-full h-full mx-auto rounded-lg overflow-y-auto">
                        {
                            topics[selectedTopic.index].messages.map((message, idx) =>
                                <TopicMessage message={message}/>
                            )
                        }
                    </div>
                <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 w-6 h-6 rounded-md bg-black text-white items-center">
                        <XSquare/>
                </button>
                </div>
            </div>
        
        </div>
    )
}

const TopicMessage = ({message}:{message:Message}) => {
    return (
        <div className="w-3/4 bg-zinc-800 p-2 rounded-md flex flex-col mx-auto my-4">
            <div className="flex flex-row gap-x-2">
                <h2 className="text-sm font-semibold">
                    @{message.user}
                </h2>
                <span className="text-sm font-light">
                    {message.timestamp}
                </span>
            </div>
            <p className="mt-2 text-sm leading-normal text-start">
                {message.content}
            </p>
        </div>
    )
}

export default TopTopics;