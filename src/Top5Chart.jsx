import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import useFetchData from "./getDataFromJson";

const Top5Chart = () => {
    const { data, error, loading } = useFetchData();
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        if (data) {
            const sorted = [...data].sort((a, b) => b["Box Office Revenue"] - a["Box Office Revenue"]);
            setSortedData(sorted.slice(0, 5));
        }
    }, [data]);

    if (loading) return <p>Загрузка данных...</p>;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", paddingTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%" }}>
                <ResponsiveContainer width="100%" height={700}>
                    <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 40, bottom: 100 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="Film Title"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            interval={0}
                        />
                        <YAxis
                            width={200}
                            type="number"
                            tickFormatter={(value) => `$${new Intl.NumberFormat("de-DE").format(value)}`}
                        />
                        <Tooltip
                            formatter={(value, name, props) => {
                                const film = props.payload;
                                const revenue = film["Box Office Revenue"];
                                const year = film["Release Year"];
                                return [`Release Year: ${year} Box Office: $${new Intl.NumberFormat("de-DE").format(revenue)}`];
                            }}
                        />
                        <Bar dataKey="Box Office Revenue" fill="#4caf50" animationDuration={5000} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Top5Chart;
