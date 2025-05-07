import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
  } from "recharts";

  const data = [
    { x: 0, project: 3.4, funding: 4.1 },
    { x: 1, project: 2.1, funding: 3.2 },
    { x: 2, project: 3.9, funding: 2.4 },
    { x: 3, project: 5.7, funding: 3.0 },
    { x: 4, project: 4.2, funding: 6.1 },
    { x: 5, project: 6.0, funding: 4.5 },
    { x: 6, project: 4.8, funding: 4.0 },
    { x: 7, project: 3.7, funding: 4.3 },
    { x: 8, project: 3.0, funding: 4.1 },
  ];

const GraphCard = () => {
  return (
    <div className="rounded-3xl bg-zinc-800/60 backdrop-blur-md p-6 text-zinc-100 h-[41%] font-poppins w-[90%]">
        <h3 className="text-xl font-semibold text-emerald-400">Motren</h3>
        <p className="text-sm text-indigo-400 -mt-1 mb-4">Journey of Impact</p>
  
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="x"
              axisLine={{ stroke: "#d4d4d8", strokeWidth: 1 }}
              tick={{ fill: "#d4d4d8", fontSize: 12 }}
              tickMargin={6}
            />
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip
              cursor={{ stroke: "transparent" }}
              contentStyle={{ background: "#27272a", border: "none" }}
              labelStyle={{ color: "#a1a1aa" }}
              itemStyle={{ color: "#f4f4f5" }}
            />
            <Line
              type="monotone"
              dataKey="project"
              stroke="#34d399"          /* emerald‑400 */
              strokeWidth={4}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="funding"
              stroke="#0ea5e9"          /* sky‑500 */
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
  )
}

export default GraphCard
