import { useEffect, useState } from "react";

const useFetch = (url, token) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'konjac-version': '1.0.1'
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                // console.log("API Response:", result); // Log the full response

                // Assuming the response has a 'products' field
                setData(result.products || result); // Adjust if the structure is different
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, token]);

    return { data, loading, error };
};

export default useFetch;
