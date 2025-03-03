import { useState, useEffect } from 'react';

function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("output.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке данных");
                }
                return response.json();
            })
            .then((jsonData) => {
                setData(jsonData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);  // Empty dependency array

    return { data, loading, error };
}

export default useFetch;