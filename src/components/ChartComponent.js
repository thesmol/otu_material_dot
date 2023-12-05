import React, { useRef, useState, useEffect } from "react";
import { easingEffects } from 'chart.js/helpers';
import { chartData } from "../data";

import {
    Chart,
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title,
} from 'chart.js';

Chart.register(
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title
);


const ChartComponent = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [easingName, setEasingName] = useState('easeOutQuad');

    useEffect(() => {
        let newData = chartData.x.map((x, i) => {
            return {x: x, y: chartData.v[i]}
        });
        let newData2 = chartData.xExt.map((x, i) => {
            return {x: x, y: chartData.LL[i]}
        });

        // let prev = 100;
        // let prev2 = 80;
        // for (let i = 0; i < 1000; i++) {
        //     prev += 5 - Math.random() * 10;
        //     newData.push({ x: i, y: prev });
        //     prev2 += 5 - Math.random() * 10;
        //     newData2.push({ x: i, y: prev2 });
        // }
        setData(newData);
        setData2(newData2);
    }, []);

    useEffect(() => {
        const easing = easingEffects[easingName];
        const totalDuration = 5000;
        const duration = (ctx) => easing(ctx.index / data.length) * totalDuration / data.length;
        const delay = (ctx) => easing(ctx.index / data.length) * totalDuration;
        const previousY = (ctx) => {
            if (ctx.index === 0) {
                return ctx.chart.scales.y.getPixelForValue(100);
            } else {
                const previousPoint = ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1];
                return previousPoint ? previousPoint.getProps(['y'], true).y : ctx.chart.scales.y.getPixelForValue(100);
            }
        };
        const animation = {
            x: {
                type: 'number',
                easing: 'linear',
                duration: duration,
                from: NaN, // the point is initially skipped
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.xStarted) {
                        return 0;
                    }
                    ctx.xStarted = true;
                    return delay(ctx);
                }
            },
            y: {
                type: 'number',
                easing: 'linear',
                duration: duration,
                from: previousY,
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.yStarted) {
                        return 0;
                    }
                    ctx.yStarted = true;
                    return delay(ctx);
                }
            }
        };

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        var ctx2 = chartRef.current.getContext("2d");
        chartInstanceRef.current = new Chart(ctx2, {
            type: 'line',
            data: {
                datasets: [{
                    borderColor: 'red',
                    borderWidth: 1,
                    radius: 0,
                    data: data,
                },
                {
                    borderColor: 'blue',
                    borderWidth: 1,
                    radius: 0,
                    data: data2,
                }]
            },
            options: {
                animation,
                interaction: {
                    intersect: false
                },
                plugins: {
                    legend: false,
                    title: {
                        display: true,
                        text: () => easingName
                    }
                },
                scales: {
                    x: {
                        type: 'linear'
                    }
                }
            }
        });
    }, [data, data2, easingName]);

    const restartAnims = () => {
        chartInstanceRef.current.stop();
        const meta0 = chartInstanceRef.current.getDatasetMeta(0);
        const meta1 = chartInstanceRef.current.getDatasetMeta(1);
        for (let i = 0; i < data.length; i++) {
            const ctx0 = meta0.controller.getContext(i);
            const ctx1 = meta1.controller.getContext(i);
            ctx0.xStarted = ctx0.yStarted = false;
            ctx1.xStarted = ctx1.yStarted = false;
        }
        chartInstanceRef.current.update();
    };

    const changeEasing = (newEasing) => {
        setEasingName(newEasing);
        restartAnims();
    };

    return (
        <div className="chart">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default ChartComponent;