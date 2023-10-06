import axios from "axios";
import { useEffect, useState } from "react";

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

interface DownstreamVersionInfo {
    assemblyVersion: string;
    fileVersion: string;
    productVersion: string;
}

function Weather() {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const [version, setVersion] = useState<DownstreamVersionInfo>();

    useEffect(() => {
        async function populateWeatherData() {
            const { data } = await axios.get<Forecast[]>("weatherforecast");
            const { data: version } =
                await axios.get<DownstreamVersionInfo>("downstreamversion");

            setForecasts(data);
            setVersion(version);
        }

        populateWeatherData();
    }, []);

    if (typeof forecasts === "undefined" || forecasts === null) {
        return (
            <p>
                <em>
                    Loading... Please refresh once the ASP.NET backend has
                    started. See{" "}
                    <a href="https://aka.ms/jspsintegrationreact">
                        https://aka.ms/jspsintegrationreact
                    </a>{" "}
                    for more details.
                </em>
            </p>
        );
    }

    return (
        <div>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map((forecast) => (
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table>
                <thead>
                    <th>Assembly Version</th>
                    <th>File Version</th>
                    <th>Product Version</th>
                </thead>
                <tbody>
                    <td>{version?.assemblyVersion}</td>
                    <td>{version?.fileVersion}</td>
                    <td>{version?.productVersion}</td>
                </tbody>
            </table>
        </div>
    );
}

export default Weather;
export type { Forecast };
