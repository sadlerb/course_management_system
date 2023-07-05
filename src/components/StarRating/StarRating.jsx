import './StarRating.scss';
import { ReactComponent as Star } from '../../assets/rating_star.svg';
import { useState } from 'react';

const StarRating = ({ onChange, isDisabled, user_rating }) => {

    const [rating, setRating] = useState(user_rating || 0);

    const [hover, setHover] = useState(null)

    return (
        <div className="stars" disabled={isDisabled} >
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input type='radio' value={ratingValue} onClick={() => setRating(ratingValue)} name='user_rating' onChange={onChange} disabled={isDisabled} />
                        <Star className='star' style={{ fill: ratingValue <= (rating || hover) ? "#E9E245" : "grey" }}
                            onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} />
                    </label>
                )
            })}
        </div>
    )
}


export default StarRating;