import React, { useState, useEffect } from 'react';
import './APP.css';
function Gallery() {
    const [tours, setTours] = useState([]);  // Holds the fetched tour data
    const [loading, setLoading] = useState(true);  // Indicates if data is being fetched
    const [error, setError] = useState(null);  // Holds any error message from the fetch

    useEffect(() => {
        // Fetch data from the API
        fetch('https://www.course-api.com/react-tours-project')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok'); // Handle non-2xx responses
                }
                return response.json();
            })
            .then(data => {
                setTours(data);  // Set the fetched data to the state
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch(error => {
                setError('Error fetching data');  // Set error message if fetch fails
                setLoading(false);  // Set loading to false when there's an error
            });
    }, []);  // Empty dependency array means this runs only once when the component mounts

    // Function to handle the "Not Interested" button
    const removeTour = (tourId) => {
        const updatedTours = tours.filter(tour => tour.id !== tourId);
        setTours(updatedTours);  // Update the state with the filtered list
    };

    // Function to toggle the "Show More" or "Show Less" state
    const toggleShowMore = (tourId) => {
        setTours(tours.map(tour =>
            tour.id === tourId ? { ...tour, showMore: !tour.showMore } : tour
        ));
    };

    // Display loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error message 
    if (error) {
        return <div>error</div>;
    }

    return (
        <div>
            <h2>Tours Available</h2>
            <ul>
                {tours.map(tour => (
                    <li key={tour.id}>
                        <img src={tour.image} alt={tour.name} />

                        <p>
                            {tour.showMore ? tour.info : `${tour.name}...`} {/* Toggle between info and name */}
                        </p>

                        <button onClick={() => toggleShowMore(tour.id)}>
                            {tour.showMore ? 'Show Less' : 'Show More'} {/* Toggle button text */}
                        </button>

                        <p>${tour.price}</p>

                        {/* "Not Interested" Button */}
                        <button
                            onClick={() => removeTour(tour.id)}  // Calls removeTour with the correct tour id
                        >
                            Not Interested
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Gallery;