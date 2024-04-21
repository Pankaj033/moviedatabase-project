import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from 'next/router'

export function useQueryParams() {
    const router = useRouter(); // Use useRouter directly here if window is available
    const [queryParams, setQueryParams] = useState(router.query);

    useEffect(() => {
        // Update query params when router.query changes
        setQueryParams(router.query);
    }, [router.query]);

    function getQueryParam(paramName: string) {
        return queryParams ? queryParams[paramName] : null;
    }

    return { getQueryParam };
}

const Home = () => {
    const { getQueryParam } = useQueryParams(); // Use the custom hook to get query params
    // Your component logic here
};

export default Home;
