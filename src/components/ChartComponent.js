import React, { useRef, useState, useEffect } from "react";
import { easingEffects } from 'chart.js/helpers';

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


const ChartComponent = ({ names, x1, y1, x2, y2 }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [easingName, setEasingName] = useState('easeOutQuad');

    useEffect(() => {
        let newData = x1.map((x, i) => {
            return { x: x, y: y1[i] }
        });
        if (x2 && y2) {
            let newData2 = x2.map((x, i) => {
                return { x: x, y: y2[i] }
            });
            setData2(newData2);
        }
        
        setData(newData);
    }, []);

    let datasets = [{
        label: names[1],
        borderColor: '#83a601',
        borderWidth: 3,
        radius: 0,
        data: data,
    }];
    
    if (x2 && y2) {
        datasets.push({
            label: names[2],
            borderColor: '#3b0c06',
            borderWidth: 3,
            radius: 0,
            data: data2,
            animation: false,
        });
    }

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
                datasets: datasets
            },
            options: {
                maintainAspectRatio: false,
                animation,
                interaction: {
                    intersect: false
                },
                plugins: {
                    legend: true,
                    title: {
                        display: true,
                        text: names[0],
                        color: '#2c1b09'
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
        <canvas ref={chartRef}></canvas>
    );
};

export default ChartComponent;