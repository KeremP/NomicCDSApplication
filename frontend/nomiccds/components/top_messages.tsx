"use client"

export type Message = {
    id: number;
    user: string;
    reactionCount: number;
    timestamp: string;
    content: string;
}
import { truncateString } from "@/lib/utils";
import { useState } from "react";

const TopMessages = ({messages}: {messages?:Message[]}) => {

    return (
        <div className="overflow-y-auto overflow-x-hidden h-52 rounded-md bg-zinc-700 p-4 flex flex-col">
            <div className="w-full h-8 flex flex-row items-center">
                <h2 className="text-sm rounded-md bg-zinc-500/50 border border-zinc-100 px-2 text-center">Top Messages</h2>
            </div>
            <div className="mt-4 flex flex-col gap-2 justify-center">
                {messages?.map((message, index) =>
                    <Message
                        key={index}
                        index={index}
                        message={message}
                    />
                )}
            </div>


        </div>
    )

}

const Message = ({message, index}:{message:Message, index:number}) => {
    const [expand, setExpand] = useState(false);
    return (
        <div onClick={() => setExpand(!expand)} className="cursor-pointer w-full flex flex-row gap-2 rounded-md bg-zinc-800 p-2 hover:bg-zinc-400/50 justify-between">
            <h2 className="font-semibold text-sm">
                @{message.user}
            </h2>
            <p className="text-xs break-words w-[100px]">{expand ? message.content:truncateString(message.content, 10) }</p>
            <span className="text-sm font-semibold">{message.reactionCount} reacts</span>
        </div>
    )
}

export default TopMessages;