"use client"

import { useState } from 'react';
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
import { curveCatmullRom } from "@visx/curve";  

type DataPoint = {
    timestamp: string
    value:number
};

type ChartProps = {
    width: number,
    height: number,
    compact: boolean,
    toggleCompact: (
        id: number
    ) => void
}

const data = [{"timestamp":"2023-02-19","value":1},{"timestamp":"2023-02-26","value":26},{"timestamp":"2023-03-05","value":37},{"timestamp":"2023-03-12","value":32},{"timestamp":"2023-03-19","value":28},{"timestamp":"2023-03-26","value":18},{"timestamp":"2023-04-02","value":5220},{"timestamp":"2023-04-09","value":2688},{"timestamp":"2023-04-16","value":3921},{"timestamp":"2023-04-23","value":2271},{"timestamp":"2023-04-30","value":1266},{"timestamp":"2023-05-07","value":1154},{"timestamp":"2023-05-14","value":301}];

const dataEvents = [
    {"timestamp":"2023-04-02", "eventType":"tweet", "tweetContent": {
        "author":"@Testing", "content":"testing, testing, testing post."
    }}
];

const accessors = {
    xAccessor: (d: DataPoint) => new Date(d.timestamp).toLocaleDateString('en-us', {month:"short", day:"numeric"}),
    yAccessor: (d: DataPoint) => d.value,
};

const labelXOffset = -40;
const labelYOffset = -50;
  
const MemberGrowthChart = ({width, height}: {width:number, height:number}) => {
    const [size, setSize] = useState({width:width, height:height});
    const [compact, setCompact] = useState(true);

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
    }
    return (

        <div style={{width:size.width, height:size.height}} className='overflow-hidden bg-[#febf4c] rounded-lg relative transition-all duration-500 ease-in-out'>
            <button onClick={toggleCompact} className='absolute z-40 top-4 right-4'>
                test
            </button>
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
                    !compact &&
                    <Annotation
                    dataKey="Line 1" // use this Series's accessor functions, alternatively specify x/yAccessor here
                    datum={data[6]} // add "dataevent" points
                    dx={labelXOffset}
                    dy={0}
                    >
                    {/** Text label */}
                    <AnnotationLabel
                        title="Title"
                        subtitle="Subtitle deets"
                        showAnchorLine={false}
                        backgroundFill="black"
                    />
                    {/** Draw circle around point */}
                    <AnnotationCircleSubject />
                    {/** Connect label to CircleSubject */}
                    <AnnotationConnector />
                    </Annotation>
                }
                </XYChart>
            </div>
        </div>
    )
}

export default MemberGrowthChart;