"use client"
import Chart, { Data, Event } from "./chart";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const GrowthChart = ({data, events}: {
    data: {
        weekly: Data[],
        monthly: Data[],
        daily: Data[]
    },
    events: {
        weekly: Event[],
        monthly: Event[],
        daily: Event[]
    }
}) => {
    const [currentDataset, setCurrentDataset] = useState(
        {data: data.weekly, events: events.weekly}
    )

    const updateFreq = (freq: string) => {
        switch (freq) {
            case "weekly":
                setCurrentDataset(
                    {data: data.weekly, events: events.weekly}
                );
                break
            case "monthly":
                setCurrentDataset(
                    {data: data.monthly, events: events.monthly}
                );
                break
            case "daily":
                setCurrentDataset(
                    {data: data.daily, events: events.daily}
                );
                break
            default:
                break;
        }
    }

    return (
        <>
            <div className='flex flex-row justify-between w-full items-center'>
            <div className="flex flex-row items-center gap-x-2">
            <SelectFreq
                updateFreq={updateFreq}
            />
            <h2 className='text-lg font-semibold'>user growth</h2>
            </div>
            <div className='flex flex-row gap-x-2'>
            <div className='flex flex-row items-center justify-center gap-x-1'>
                <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                <span className='text-xs'>event</span>
            </div>
            <div className='flex flex-row items-center justify-center gap-x-1'>
                <div className='w-2 h-2 rounded-full bg-gray-400'></div>
                <span className='text-xs'>datapoint</span>
            </div>
            </div>
        </div>
        
        <Chart
            data={currentDataset.data}
            events={currentDataset.events}
        />
        </>
    )
}

const SelectFreq = ({updateFreq}:{updateFreq:(freq:string) => void}) => {

    return (
        <Select defaultValue="weekly" onValueChange={(value) => updateFreq(value)}>
            <SelectTrigger className="w-24">
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default GrowthChart;