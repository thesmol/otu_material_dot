import React from "react"

const Settings = ({ chartType, setChartType, setStartChart }) => {
    const handleTypeChange = (event) => {
        setChartType(event.target.value);
    }

    const handleChartShow = () => {
        setStartChart(true);
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '20%',
                height: 'fit-content',
                backgroundColor: '#fde9aa',
                borderRadius: '15px',
                padding: '15px'
            }}>
            <h2 style={{ marginBottom: '20px' }}>
                Управление движением материальной точки
            </h2>

            <h3>
                Метод управления
            </h3>

            <label style={{ marginBottom: '20px' }}>
                <input
                    type="radio"
                    value="os"
                    checked = {chartType === 'os'}
                    onChange={handleTypeChange}
                />
                Обратная связь
            </label>
            <label>
                <input
                    type="radio"
                    value="pu"
                    checked = {chartType === 'pu'}
                    onChange={handleTypeChange}
                />
                Программное управление
            </label>



            <button
                style={{
                    margin: 'auto',
                    fontSize: '18px',
                    marginTop: '60px',
                    marginBottom: '30px',
                    padding: '8px',
                    width: '70%',
                    borderRadius: '10px',
                    fontWeight: '700',
                    color: '#fde9aa',
                }}
                onClick={handleChartShow}
            >
                Перезапустить
            </button>
        </div>
    )
};

export default Settings;
