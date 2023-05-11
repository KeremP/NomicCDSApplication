"use client"

import { useMemo } from "react";
import * as d3 from "d3";

export type DataItem = {
  user: string;
  value: number;
};
type DonutChartProps = {
  width: number;
  height: number;
  data: DataItem[];
  onHighlight:(i:number) => void;
  highlighted: number;
};

const MARGIN_X = 50;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20; // space between donut and label inflexion point

export const colors = [
  "#e0ac2b",
  "#e85252",
  "#6689c6",
  "#9a6fb0",
  "#a53253",
  "#69b3a2",
];

export const DonutChart = ({ width, height, data, onHighlight, highlighted }: DonutChartProps) => {
  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;
  const innerRadius = radius / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc();

  const shapes = pie.map((grp, i) => {
    // First arc is for the donut
    const sliceInfo = {
      innerRadius,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = centroid[0] - 10 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";

    return (
        <g onClick={() => onHighlight(i+1)} className={`${highlighted === i+1 || highlighted === 0 ? "opacity-100" : "opacity-50"} cursor-pointer`} key={i}>
            {/* @ts-ignore */}
            <path d={slicePath} fill={colors[i]} />
            {/* <animated.path d={springProps.pos.to((start, end) => {
              return arcGenerator({
                innerRadius: radius,
                outerRadius: radius,
                startAngle: start,
                endAngle: end
              })
            })} fill={colors[i]} /> */}
            <text
            x={labelPosX}
            y={centroid[1]}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            fontSize={11}
            >
            {grp.value}
            </text>
        </g>
    );
  });

  return (
        <svg width={width} height={height} style={{ display: "inline-block" }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>{shapes}</g>
        </svg>
  );
};