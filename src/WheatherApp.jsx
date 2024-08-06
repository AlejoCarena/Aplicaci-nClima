import { useState } from "react"

export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'b2bbaaf805c4fe57a1701e5dc388932f'
    const difKelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)
    const [error, setError] = useState('')

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            if (!response.ok) {
                throw new Error('No se encontraron datos para la ciudad ingresada.')
            }
            const data = await response.json()
            setDataClima(data)
            setError('')
        } catch (error) {
            console.error('Error obteniendo datos del clima:', error)
            setDataClima(null)
            setError(error.message)
        }
    }

    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type="submit">Buscar</button>
            </form>

            {error && <p>{error}</p>}
            {dataClima ? (
                <>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}C°</p>
                    <p>Condición meteorológica: {dataClima.weather[0]?.description}</p>
                    {dataClima.weather[0]?.icon && (
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="Weather icon" />
                    )}
                </>
            ) : error ? (
                <p>No se encontraron datos climáticos.</p>
            ) : null}
        </div>
    )
}
