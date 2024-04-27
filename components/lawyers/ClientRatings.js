import React from 'react';

const ClientRatings = ({ ratings }) => {
    const safeRatings = ratings || [
        { rating: 5, comment: "Excelente servicio." },
        { rating: 4, comment: "Muy buen trabajo, pero puede mejorar." }
    ];

    return (
        <div>
            {safeRatings.map((rating, index) => (
                <div key={index}>
                    <p>Rating: {rating.rating}</p>
                    <p>Comment: {rating.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ClientRatings;
