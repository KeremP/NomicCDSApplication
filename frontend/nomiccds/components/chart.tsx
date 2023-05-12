"use client"

import { useState } from "react";
import * as d3 from "d3";
import { format } from "date-fns";
import { CSSProperties } from "react";
import {XCircle} from "lucide-react";

const formatOptions = {
    year:"numeric", month:"numeric",day:"numeric"
};

export type Data = {
    value: number;
    date: Date;
}

export type Event = {
    event: string;
    date: Date;
    value: number;
}

const Chart = ({data, events}: { data: Data[], events: Event[] }) => {

    const collatedData = data.concat(events);
    
    collatedData.sort((a, b) => {
        return ( a.date<b.date ? -1 : a.date>b.date ? 1: 0 )
    });

    

    const [showTooltip, setShowTooltip] = useState(false);
    const [dataPoint, setDataPoint] = useState<Data>();
    const [pos, setPos] = useState(
        {x:0, y:0}
    );

    const [showAnnotation, setShowAnnotation] = useState(false);
    const [eventPoint, setEventPoint] = useState<Event>();
    const [eventPos, setEventPos] = useState(
        {x:0, y:0}
    )

    const updateToolTip = (data: Data, x:number, y:number, show:boolean) => {
        setShowTooltip(show);
        setPos(
            {x:x, y:y}
        )
        setDataPoint(data);
    }

    const updateAnnotation = (event: Event, x:number, y:number, show:boolean) => {
        setShowAnnotation(show);
        setEventPos(
            {x:x, y:y}
        )
        setEventPoint(event);
    }


    // let xScale = d3.scaleTime().domain(
    //     [data[0].date, data[data.length - 1].date]
    // )
    // .range([0, 100]);
    let xScale = d3.scaleTime().domain(
        [collatedData[0].date, collatedData[collatedData.length - 1].date]
    )
    .range([0, 100]);

    let yScale = d3.scaleLinear().domain(
        [0, d3.max( collatedData.map((d) => d.value) ) ?? 0]
    )
    .range([100,0]);


    let line = d3
    .line<(typeof collatedData)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

    let d = line(collatedData);

    if (!d) return null;

    return (
        <div className="@container relative h-full w-full"
            style={
                {
                    "--marginTop": "6px",
                    "--marginRight": "8px",
                    "--marginBottom": "25px",
                    "--marginLeft": "25px",
                  } as CSSProperties
            }
        >

            {/* X axis */}
            <svg
                className="absolute inset-0
                    h-[calc(100%-var(--marginTop))]
                    w-[calc(100%-var(--marginLeft)-var(--marginRight))]
                    translate-x-[var(--marginLeft)]
                    translate-y-[var(--marginTop)]
                    overflow-visible
                "
            >

                {data.map((day, i) =>
                    <g key={i} className="overflow-visible font-medium text-gray-500">
                        <text
                            x={`${xScale(day.date)}%`}
                            y="100%"
                            textAnchor={
                                i===0 ? "start" : i === data.length - 1 ? "end" : "middle"
                            }
                            fill="currentColor"
                            className="@sm:inline hidden text-xs"
                        >
                            {format(day.date, "LLL")}-{format(day.date, "d")}
                        </text>
                        <text
                            x={`${xScale(day.date)}%`}
                            y="100%"
                            textAnchor={
                                i===0 ? "start" : i === data.length - 1 ? "end" : "middle"
                            }
                            fill="currentColor"
                            className="@sm:hidden text-xs"
                        >
                            {format(day.date, "LLL")}-{format(day.date, "d")}
                        </text>
                    </g>
                )}
            </svg>

            {/* Y axis */}
            <svg
            className="absolute inset-0
                h-[calc(100%-var(--marginTop)-var(--marginBottom))]
                translate-y-[var(--marginTop)]
                overflow-visible
            "
            >
                <g className="translate-x-4">
                    {yScale
                        .ticks(8)
                        .map(yScale.tickFormat(8, "d"))
                        .map((value, i) => (
                        <text
                            key={i}
                            y={`${yScale(+value)}%`}
                            alignmentBaseline="middle"
                            textAnchor="end"
                            className="text-xs tabular-nums text-gray-600"
                            fill="currentColor"
                        >
                            {value}
                        </text>
                        ))}
                </g>
            </svg>

            {/* Chart */}
            <svg
                className="absolute inset-0
                h-[calc(100%-var(--marginTop)-var(--marginBottom))]
                w-[calc(100%-var(--marginLeft)-var(--marginRight))]
                translate-x-[var(--marginLeft)]
                translate-y-[var(--marginTop)]
                overflow-visible
                "
            >
                <svg
                viewBox="0 0 100 100"
                className="overflow-visible"
                preserveAspectRatio="none"
                >
                {/* Grid lines */}
                {yScale
                    .ticks(8)
                    .map(yScale.tickFormat(8, "d"))
                    .map((active, i) => (
                    <g
                        transform={`translate(0,${yScale(+active)})`}
                        className="text-gray-700"
                        key={i}
                    >
                        <line
                        x1={0}
                        x2={100}
                        stroke="currentColor"
                        strokeDasharray="6,5"
                        strokeWidth={0.5}
                        vectorEffect="non-scaling-stroke"
                        />
                    </g>
                    ))}

                {/* Line */}
                <path
                    d={d}
                    fill="none"
                    className="text-gray-600"
                    stroke="currentColor"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />

                {/* Circles */}
                {data.map((d) => (
                    <path
                        key={d.date.toString()}
                        d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                        vectorEffect="non-scaling-stroke"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                        stroke="currentColor"
                        className="text-gray-400"
                        onMouseOver={(e) => {updateToolTip(d, e.clientX, e.clientY, true)}}
                        onMouseOut={() => updateToolTip(d, 0, 0, false)}
                    />
                ))}

                {events.map((d) => 
                    <path
                    key={d.date.toString()}
                    d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                    vectorEffect="non-scaling-stroke"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                    stroke="currentColor"
                    className="text-blue-500 cursor-pointer"
                    onClick={(e) => {updateAnnotation(d, e.clientX, e.clientY, true)}}
                />
                    
                )}
                </svg>
               
            </svg>

            <ChartToolTipContent
                data={dataPoint} x={pos.x + 10} y={pos.y} show={showTooltip}
            />
            <ChartAnnotation
                event={eventPoint}
                x={eventPos.x - 60}
                y={eventPos.y - 50}
                show={showAnnotation}
                hide={() => {setShowAnnotation(false)}}
            />

        </div>
    )
}

const ChartToolTipContent = ({data, x, y, show}:{data?:Data, x:number, y:number, show:boolean}) => {
    return (
            <div className={`items-center fixed block bg-white rounded-md px-2 py-1 ${show ? "": "hidden"}`}
                style={{
                    top:y,
                    left:x
                }}
            >
                <span className="text-black text-sm">{data?.value}</span>
                
            </div>
        )
}

const ChartAnnotation = ({event, x, y, show, hide}:{event?: Event, x: number, y: number, show: boolean, hide:() => void}) => {
    return (
        <div className={`${show ? "" : "hidden"} flex flex-col justify-center fixed w-40 h-14 rounded-md bg-zinc-600/50 backdrop-blur-sm p-4`}
            style={{
                top:y,
                left:x
            }}
        >
            <button onClick={hide} className="absolute top-2 right-2">
                <XCircle
                   width={12}
                   height={12}
                />
            </button>
            <span className="text-xs text-white">{event?.event}</span>
            <time className="text-xs font-light text-white">{event?.date.toLocaleDateString("en-us",{year:"numeric", month:"numeric", day:"numeric"})}</time>
        </div>
    )
}


export default Chart;
