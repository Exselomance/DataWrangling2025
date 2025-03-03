import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import useFetch from "./getDataFromJson";

const CountryFilmChart = () => {
    const { data, error, loading } = useFetch();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            const countryCount = {};

            data.forEach((film) => {
                if (Array.isArray(film["Country of Origin"])) {
                    film["Country of Origin"].forEach((country) => {
                        countryCount[country] = (countryCount[country] || 0) + 1;
                    });
                }
            });

            const formattedData = Object.keys(countryCount).map((country) => ({
                country,
                count: countryCount[country],
            }));

            setChartData(formattedData);
        }
    }, [data]);

    if (loading) return <p>Загрузка данных...</p>;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", paddingTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%" }}>
                <ResponsiveContainer width="100%" height={700}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 150 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="country"
                            tick={{ fontSize: 12 }}
                            angle={-30}
                            textAnchor="end"
                            interval={0}
                        />
                        <YAxis
                            width={100}
                            ticks={[1, 5, 10, 30, 49]}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Amount of films" fill="#76c7c0" animationDuration={7000} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CountryFilmChart;