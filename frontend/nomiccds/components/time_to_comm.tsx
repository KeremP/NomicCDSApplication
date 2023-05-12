const TimeToCommunicate = ({time}:{time:string}) => {
    return (
        <div className="flex flex-col">
            
           <h2 className="text-sm mx-auto rounded-md bg-zinc-600/50 border border-zinc-100 px-2 text-center">Med. time to 1st message</h2>
            
            <span className="text-lg font-bold text-center">
                {time}
            </span>
        </div>
    )
}

export default TimeToCommunicate;