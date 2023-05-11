"use client"

import { useDimensions } from "@/hooks/useDimensions";
import { DonutChart, DataItem, colors } from "./donut";
import React, { RefObject, useState } from "react";



const LurkerDonutResponsive = ({dataTop, dataLurker}:{dataTop:DataItem[], dataLurker:DataItem[]}) => {
    const [data, setData] = useState<DataItem[]>(dataTop);
    
    const lurkerRef = React.createRef<HTMLDivElement>();
    const [highlighted, setHighlighted] = useState(0);
    const onHighlight = (i:number) => {
        if(highlighted === i) {
            setHighlighted(0);
        } else {
            setHighlighted(i);
        }
    }
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex flex-row justify-between w-full">
                <h2 className="font-semibold">User stats</h2>
                <div className="flex flex-row gap-x-1">
                    <button onClick={() => setData(dataTop)} className="text-xs text-white bg-transparent border border-white px-2 py-1 rounded-lg">
                        Top %
                    </button>
                    <button onClick={() => setData(dataLurker)} className="text-xs text-white bg-transparent border border-white px-2 py-1 rounded-lg">
                        Lurker %
                    </button>
                </div>
            </div>
            <div ref={lurkerRef} className="h-[270px] w-full">
                <LurkerDonut
                    data={data}
                    parent={lurkerRef}
                    onHighlight={onHighlight}
                    highlighted={highlighted}
                />
            </div>
            <div className="w-full flex flex-wrap gap-x-4 justify-center">
                {
                    data.map((d, i) => 
                        <div key={`label-${i}`} onClick={() => onHighlight(i+1)} className={`${highlighted === i+1 || highlighted === 0 ? "opacity-100" : "opacity-50"} items-center flex gap-x-1 cursor-pointer`}>
                            <div className="w-2 h-2 rounded-full" style={{background:colors[i]}}></div>
                            <span className="text-xs">{d.user}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const LurkerDonut = ({data, parent, onHighlight, highlighted}:{data:DataItem[], parent:RefObject<HTMLDivElement>, onHighlight:(i:number) => void, highlighted: number}) => {
    const dims = useDimensions(parent);
    return (
        <DonutChart
            data={data}
            width={dims.width}
            height={dims.height}
            onHighlight={onHighlight}
            highlighted={highlighted}
        />

    )
}

export default LurkerDonutResponsive;