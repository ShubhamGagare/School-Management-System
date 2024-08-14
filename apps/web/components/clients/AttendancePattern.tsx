'use client'
import { Badge, Calendar, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Label } from "@repo/ui";
import { TrendingUp } from "lucide-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui"
import { useMemo } from "react";
import * as React from "react"

export function AttendancePattern({ attendancePattern }: any) {
    const results = attendancePattern;
    const pattern = JSON.parse(results)
    console.log("pattern---" + JSON.stringify(pattern))
    let patternResult = pattern[0];
    if (pattern.results !== undefined) {
        patternResult = pattern.results[0];
    }
    return (
        <>
            <Card className="items-center pb-0 space-y-4 w-full ">
                <CardHeader className="items-center pb-0">

                    <CardTitle>Attendance Pattern</CardTitle>
                    <CardDescription className="self-center pb-0">AI generated pattern based on past attendance</CardDescription>
                </CardHeader>
                <CardContent className="items-center pb-0 space-y-4">

                    <div className="space-y-2">
                        <Label>Insights:</Label>
                        <p>{patternResult.insight}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex p-1 space-x-2 ">
                        {patternResult.tags.map((tag: any, index: number) => {
                           return <Badge className="bg-violet-100 text-primary">{tag}</Badge>
                        })}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="items-center pb-0">
                    {/* <Label>Generated by AI</Label> */}
                </CardFooter>
            </Card>
        </>
    );
}