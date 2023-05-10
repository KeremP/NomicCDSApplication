"use client"

export type Message = {
    id: number;
    user: string;
    reactionCount: number;
    timestamp: string;
    content: string;
}

const TopMessages = ({messages, width, height}: {messages?:Message[], width: number, height: number}) => {

    return (
        <div style={{width:width, height:height}} className="overflow-y-auto overflow-x-hidden rounded-md bg-zinc-700 p-4 flex flex-col">
            <div className="w-full h-8 flex flex-row items-center">
                <h2 className="rounded-md bg-zinc-500/50 border border-zinc-100 px-2 text-center">Top Messages</h2>
            </div>
            <div className="mt-4 flex flex-col gap-2 justify-center">
                {messages?.map((message, index) =>
                    <Message
                        key={index}
                        message={message}
                    />
                )}
            </div>


        </div>
    )

}

const Message = ({message}:{message:Message}) => {
    return (
        <div className="w-full flex flex-col gap-2 rounded-md bg-zinc-800 p-2 hover:bg-zinc-400/50">
            <div className="flex flex-row justify-between">
            <h4 className="text-xs font-semibold text-white">
                {message.user}
            </h4>
            <span className="text-xs text-white">{message.timestamp}</span>

            </div>
            <p className="text-xs leading-normal text-white">
                {message.content}
            </p>
            <span className="text-xs font-semibold">Interactions: {message.reactionCount}</span>
        </div>
    )
}

export default TopMessages;