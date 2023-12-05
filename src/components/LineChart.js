import React, { useRef, useState, useEffect } from "react";
import {
    Chart as ChartJS,
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title
} from 'chart.js'

ChartJS.register(
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title
);

const LineChart = ({ names, x1, y1, x2, y2 }) => {
    const chartRef = useRef(null);

    let datasets = [
        {
            label: names[1],
            data: x1.map((x, i) => ({ x: x, y: y1[i] })),
            fill: true,
            borderColor: '#83a601',
            pointRadius: 0,
        }
    ];

    if (x2) {
        datasets.push({
            label: names[2],
            data: x2.map((x, i) => ({ x: x, y: y2[i] })),
            fill: true,
            borderColor: '#3b0c06',
            pointRadius: 0
        });
    }

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const chartInstance = new ChartJS(chartRef.current, {
                type: 'line',
                data: {
                    datasets: datasets
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: names[0] || ''
                        },
                        legend: {
                            display: true,
                            labels: {
                                color: '#2c1b09'
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                        }
                    },
                }
            });

            return () => {
                chartInstance.destroy();
            };
        }
    }, [chartRef, x1, y1, x2, y2]);

    return <canvas ref={chartRef} />;
}

export default LineChart;