"use client";
import { TrendingUp } from "lucide-react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { dataGraphic } from "./GraphicSuscribers.data";

export default function GraphicSuscribers() {
    return (
        <div className="mt-5">
            <p className="text-3xl mb-3">24.479</p>
            <div className="flex gap-x-5 mb-5">
                <div className="flex items-center gap-2 px-3 text-md bd-[#16c8c7] text-white rounded-xl w-fit">
                    8.5%
                    <TrendingUp strokeWidth={1} className="w-4 h-4" />
                </div>
                <p className="text-slate-500">+432 increased</p>
            </div>
            <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width={500} height={400}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        data={dataGraphic}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#16c8c7"
                            fill="#16c8c7"
                        />
                        <defs>
                            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOld" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#887CFD" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#887CFD" stopOpacity={0} />
                            </linearGradient>
                        </defs>


                        <Area
                            type="monotone"
                            dataKey="oldCustomers"
                            stroke="#887CFD"
                            fill="url(#colorOld)"
                            fillOpacity={1}
                        />
                        <Area
                            type="monotone"
                            dataKey="newCustomers"
                            stroke="#82ca9d"
                            fill="url(#colorNew)"
                            fillOpacity={1}
                        />

                    </AreaChart>
                </ResponsiveContainer>

            </div>
        </div>
    )
}
