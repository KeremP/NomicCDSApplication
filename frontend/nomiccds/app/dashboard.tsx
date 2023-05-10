"use client"

import { useState } from "react";
import { DataPoint } from "@/lib/findNearestDatum";

import MemberGrowthChart from "@/components/member_growth";
import TopMessages, { Message } from "@/components/top_messages";
import Example from "@/components/lurker_stats";


type Size = {
    width: number;
    height: number;
  }
  
const defaultSize = {
    width: 350,
    height: 350
}

const Dashboard = ({growthData, messageData}:{growthData:DataPoint[], messageData:Message[]}) => {
    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    }

    return (
        <div className="w-full h-full grid grid-cols-3 gap-2">
            <MemberGrowthChart
                setActive={toggleActive}
                data={growthData}
                width={defaultSize.width}
                height={defaultSize.height}
              />
              {
                !active &&
              <TopMessages
                messages={messageData}
                width={defaultSize.width}
                height={defaultSize.height}
              />
              
              }
              {
                !active &&
                <Example
                width={defaultSize.width}
                height={defaultSize.height}
                />
              }
        </div>
    )
}

export default Dashboard;