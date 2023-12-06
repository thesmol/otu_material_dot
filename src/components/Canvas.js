import React from "react";
import ChartComponent from './ChartComponent';

const renderSubCharts = (count, data, names) => {
    const processedNames = names.map((name, i) =>
        i === 0 ? '' : name
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            width: '37%'
        }}>
            {Array.from({ length: count }, (_, i) => (
                <div key={i}
                    style={{
                        height: '32%',
                        backgroundColor: '#e2caae',
                        borderRadius: '15px',
                        width: '100%'
                    }}>
                    <ChartComponent
                        names={[processedNames[0], processedNames[i + 3]]}
                        x1={data[i][0]}
                        y1={data[i][1]}
                    />
                </div>
            ))}
        </div>
    )

};

const Canvas = ({ chartData, startChart }) => {

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '72%',
                height: 'calc(100vh - 100px)',
                backgroundColor: '#c28650',
                borderRadius: '15px',
                padding: '25px'
            }}>
            <div style={{
                height: '100%',
                width: '60%',
                backgroundColor: '#e2caae',
                borderRadius: '15px',
                position: 'relative'
            }}>
                <ChartComponent
                    names={chartData.names}
                    x1={chartData.x}
                    y1={chartData.v}
                    x2={chartData.xExt}
                    y2={chartData.LL}
                    reload={startChart}
                />
            </div>

            {
                renderSubCharts(
                    3,
                    [[chartData.T, chartData.v], [chartData.T, chartData.u], [chartData.T, chartData.x]],
                    chartData.names
                )
            }
        </div>
    )
};

export default Canvas;
