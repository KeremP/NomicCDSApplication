const SentimentMeter = ({positive, negative, neutral}: {positive:number, negative:number, neutral:number}) => {
    const total = positive+negative+neutral;
    console.log(total)
    console.log(Math.round((positive/total)*100))
    return (
        <div className="flex flex-col w-full px-4 text-center gap-y-1">
            <h2 className="text-xs">Overall sentiment</h2>
            <div className="flex flex-row justify-center w-[200px] mx-auto group">
                <div style={{
                    width: Math.round((positive/total)*100)+"%"
                }} className="h-6 bg-green-200 rounded-l-md text-center">
                    <span className="text-xs text-black w-full hidden group-hover:inline">{Math.round((positive/total)*100)}%</span>
                </div>
                <div style={{
                    width: Math.round((neutral/total)*100)+"%"
                }} className="h-6 bg-orange-200 text-center">
                    <span className="text-xs text-black w-full hidden group-hover:inline">{Math.round((neutral/total)*100)}%</span>
                </div>
                <div style={{
                    width: Math.round((negative/total)*100)+"%"
                }} className="h-6 bg-red-400 rounded-r-md text-center">
                    <span className="text-xs text-black w-full hidden group-hover:inline">{Math.round((negative/total)*100)}%</span>
                </div>
            </div>
            <span className="text-xs font-light">model used: <a href="https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest" className="underline">twitter-roberta-base-sentiment-latest</a></span>
        </div>
    )

}

export default SentimentMeter;