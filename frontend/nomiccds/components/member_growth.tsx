"use client"

import { useState } from 'react';
import Image from 'next/image';
import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    Annotation,
    AnnotationLabel,
    AnnotationConnector,
    AnnotationCircleSubject,
    XYChart,
    Tooltip,
    
} from '@visx/xychart';

import {
    HtmlLabel
} from "@visx/annotation";

import { curveCatmullRom } from "@visx/curve";  

type DataPoint = {
    timestamp: string
    value:number
    event?: string
    eventTimestamp?: string
};




const accessors = {
    xAccessor: (d: DataPoint) => new Date(d.timestamp).toLocaleDateString('en-us', {month:"short", day:"numeric"}),
    yAccessor: (d: DataPoint) => d.value,
};

const labelXOffset = -40;
const labelYOffset = -50;
  
const MemberGrowthChart = ({data, width, height, setActive}: {data:DataPoint[], width:number, height:number, setActive:() => void}) => {
    const [size, setSize] = useState({width:width, height:height});
    const [compact, setCompact] = useState(true);
    const [showAnnotations, setShowAnnotations] = useState(true);

    const toggleCompact = () => {
        if(compact) {
            setSize({
                width:1200,
                height:600
            })
        }
        else {
            setSize({
                width:width,
                height:height
            })
        }
        setCompact(!compact);
        setActive();
    }
    return (

        <div style={{width:size.width, height:size.height}} className='pt-4 bg-[#febf4c] rounded-lg relative transition-all duration-500 ease-in-out'>
            <div className='absolute z-40 top-4 right-4'>
                <div className='flex flex-row gap-4'>
                    {!compact && <button onClick={() => setShowAnnotations(!showAnnotations)} className='rounded-md bg-black p-1 text-xs text-white'>
                        {showAnnotations ? "Hide annotations": "Show annotations"}
                    </button>}
                    <button onClick={toggleCompact} className='rounded-md bg-black p-1 text-xs text-white'>
                        {compact ? "Expand": "Minimize"}
                    </button>
                </div>

            </div>
            <h2 className='z-40 absolute top-4 left-4 text-2xl text-black font-semibold'>
                Weekly User Growth
            </h2>
            
            <div className='mt-14'>

                <XYChart height={size.height - 60} width={size.width - 30} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                {/* <CustomChartBackground/> */}
                {!compact &&
                
                <AnimatedAxis hideAxisLine hideTicks orientation="bottom"/>
                }
                {/* <AnimatedGrid columns={true} rows={false} numTicks={4} /> */}
                <AnimatedLineSeries curve={curveCatmullRom} colorAccessor={() => "black"} dataKey="Line 1" data={data} {...accessors} />
                <Tooltip
                    snapTooltipToDatumX
                    snapTooltipToDatumY
                    // showVerticalCrosshair
                    verticalCrosshairStyle={{
                        stroke: "black"
                    }}
                    showSeriesGlyphs
                    glyphStyle={{
                        fill: "black",
                        stroke: "none"
                    }}
                    renderTooltip={({ tooltipData, colorScale }) => (
                    <div>
                        {/* @ts-ignore */}
                        {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                        {', '}
                        {/* @ts-ignore */}
                        {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                    </div>
                    )}
                />
                {
                    !compact && showAnnotations &&
                    data.map((d, index) => 
                        d.event &&
                        <AnnotationEvent
                        key={index}
                        datum={data[6]}
                        // @ts-ignore
                        xAccessor={accessors.xAccessor}
                        // @ts-ignore
                        yAccessor={accessors.yAccessor}
                        dx={labelXOffset}
                        dy={0}
                    />
                    )
                }
                </XYChart>
            </div>
        </div>
    )
}

type AnnotationEventProps = React.ComponentProps<typeof Annotation>

const AnnotationEvent = (props: AnnotationEventProps) => {
    const  {dataKey, datum, dx, dy, xAccessor, yAccessor} = props;
    return (
        <Annotation
        xAccessor={xAccessor}
        yAccessor={yAccessor}
        datum={datum} // add "dataevent" points
        dx={dx}
        dy={dy}
        >
            <HtmlLabel showAnchorLine={false}
            >
                <div className="z-100 relative w-64 h-24 bg-black rounded-md p-2 flex flex-col justify-between">
                    <div className='mt-1 w-full h-8 flex flex-row justify-between'>
                        <h2 className='text-xs text-white'>Major event</h2>
                    </div>
                    <div className='w-full flex flex-row gap-2'>
                        <div className='items-center flex'>
                            <Image
                                src={"twitter.svg"}
                                width={14}
                                height={14}
                                alt='Twitter logo'
                                />
                        </div>
                        {/* @ts-ignore */}
                        <h2 className='text-xs font-bold'>{datum.event}</h2>
                    </div>
                    <div className='items-end w-full h-8 flex flex-row justify-between'>
                        {/* @ts-ignore */}
                        <span className='text-xs text-white font-light'>{datum.eventTimestamp}</span>
                    </div>
                </div>
            </HtmlLabel>
            
                <AnnotationCircleSubject
                    radius={5}
                />

           <AnnotationConnector />


        </Annotation>
    )
}

export default MemberGrowthChart;