const SentimentMeter = ({positive, negative, neutral}: {positive:number, negative:number, neutral:number}) => {

    return (
        <div className="flex flex-col w-full px-4 text-center">
            <h2 className="text-xs">Overall sentiment</h2>
            <div className="flex flex-row justify-center w-[200px] mx-auto group">
                <div style={{
                    width: positive+"%"
                }} className="h-6 bg-green-200 rounded-l-md text-center">
                    <span className="text-xs text-black w-full hidden group-hover:inline">{positive}%</span>
                </div>
                <div style={{
                    width: neutral+"%"
                }} className="h-6 bg-orange-200 text-center">
                    <span className="text-xs text-black w-full hidden group-hover:inline">{neutral}%</span>
                </div>
                <div style={{
                    width: negative+"%"
                }} className="h-6 bg-red-400 rounded-r-md text-center">
                    <span className="text-xs text-black w-full hidden group-hover:inline">{negative}%</span>
                </div>
            </div>
        </div>
    )

}

export default SentimentMeter;