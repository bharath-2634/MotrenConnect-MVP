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
    { x: 0, a: 3.4, b: 4.1 },
    { x: 1, a: 2.1, b: 3.2 },
    { x: 2, a: 3.9, b: 2.4 },
    { x: 3, a: 5.7, b: 3.0 },
    { x: 4, a: 4.2, b: 6.1 },
    { x: 5, a: 6.0, b: 4.5 },
    { x: 6, a: 4.8, b: 4.0 },
    { x: 7, a: 3.7, b: 4.3 },
    { x: 8, a: 3.0, b: 4.1 },
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
              dataKey="a"
              stroke="#34d399"          /* emerald‑400 */
              strokeWidth={4}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="b"
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
