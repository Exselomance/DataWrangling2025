import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useFetchData from "./getDataFromJson";

const MovieChart = () => {
    const { data, error, loading } = useFetchData();
    const [sortedData, setSortedData] = useState([]);
    const [isAscending, setIsAscending] = useState(false);
    const [sortBy, setSortBy] = useState("revenue"); // revenue | releaseYear

    useEffect(() => {
        if (data) {
            setSortedData([...data]); // Загружаем данные после запроса
        }
    }, [data]);

    const sortData = (type) => {
        const sorted = [...sortedData].sort((a, b) => {
            if (type === "revenue") {
                return isAscending
                    ? a["Box Office Revenue"] - b["Box Office Revenue"]
                    : b["Box Office Revenue"] - a["Box Office Revenue"];
            } else if (type === "releaseYear") {
                return isAscending ? a["Release Year"] - b["Release Year"] : b["Release Year"] - a["Release Year"];
            }
            return 0;
        });

        setSortedData(sorted);
        setIsAscending(!isAscending);
        setSortBy(type);
    };

    if (loading) return <p>Загрузка данных...</p>;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", paddingTop: "10px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <button
                    onClick={() => sortData("revenue")}
                    style={{
                        padding: "5px 15px",
                        fontSize: "14px",
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: sortBy === "revenue" ? "#ddd" : "#f8f8f8"
                    }}
                >
                    {isAscending && sortBy === "revenue" ? "▲ Sort by decreasing (Box Office)" : "▼ Sort by increasing (Box Office)"}
                </button>

                <button
                    onClick={() => sortData("releaseYear")}
                    style={{
                        padding: "5px 15px",
                        fontSize: "14px",
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: sortBy === "releaseYear" ? "#ddd" : "#f8f8f8"
                    }}
                >
                    {isAscending && sortBy === "releaseYear" ? "▲ Sort by decreasing (Year)" : "▼ Sort by increasing (Year)"}
                </button>
            </div>

            <div style={{ display: "flex", justifyContent: "left", alignItems: "left", width: "90%", marginLeft: "-50px" }}>
                <ResponsiveContainer width="100%" height={600}>
                    <BarChart layout="vertical" data={sortedData} margin={{ left: -70 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            type="number"
                            tickFormatter={(value) => `$${new Intl.NumberFormat("de-DE").format(value)}`}
                        />
                        <YAxis
                            dataKey="Film Title"
                            type="category"
                            width={500}
                            tick={{ fontSize: 12 }}
                            interval={0}
                            tickMargin={0}
                        />
                        <Tooltip
                            formatter={(value, name, props) => {
                                const film = props.payload;
                                const revenue = film["Box Office Revenue"];
                                const year = film["Release Year"];

                                return [
                                    `Release Year: ${year} Box Office: $${new Intl.NumberFormat("de-DE").format(revenue)}`
                                ];
                            }}
                        />
                        <Legend />
                        <Bar dataKey="Box Office Revenue" fill="#8884d8" animationDuration={2000} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MovieChart;