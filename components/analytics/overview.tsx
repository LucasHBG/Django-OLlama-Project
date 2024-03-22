"use client"

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    Month: "Jan",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Feb",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Mar",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Apr",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "May",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Jun",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Jul",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Aug",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Sep",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Oct",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Nov",
    Total: Math.floor(Math.random() * 100) + 50,
  },
  {
    Month: "Dec",
    Total: Math.floor(Math.random() * 100) + 50,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="Month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip />
        <Bar
          dataKey="Total"
          fill="#111827"
          label={{ position: 'top' }}
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}