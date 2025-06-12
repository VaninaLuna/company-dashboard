"use client";
import { Percent } from "lucide-react";
import {
    ResponsiveContainer,
    Tooltip,
    Pie,
    PieChart,
    Legend
} from "recharts";

import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { data } from "./TotalSuscribers.data";


export default function TotalSuscribers() {
    return (
        <div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full xl:w-96 hover:shadow transition">
            <div className="flex gap-x-2 items-center mb-4">
                <CustomIcon icon={Percent} />
                <p className="text-xl">Total Suscribers</p>

            </div>
            <div className="w-full h-[200px] p-5">
                <ResponsiveContainer aspect={1} maxHeight={200}>
                    <PieChart>
                        <Tooltip />
                        <Legend />
                        <Pie
                            dataKey="value"
                            data={data}
                            outerRadius={80}
                            labelLine={false}
                        >
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

            </div>

        </div>
    )
}
