import React from "react";
const renderSubChart = (count) => (
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

            </div>
        ))}
    </div>
);

const Canvas = ({ chartData }) => {
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
            }}>
            </div>

            {renderSubChart(3)}
        </div>
    )
};

export default Canvas;
