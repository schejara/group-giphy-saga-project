
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Favorite = () => {
    const dispatch = useDispatch();
    const FavoriteGiphy = useSelector(store => store.giphyData)
    const history = useHistory();

    const handleBack = () => {
        history.push('/')
    }

    const fetchFavorites = () => {
        dispatch({
            type: 'GET_FAVORITES'
        })
    }

    useEffect(() => {
        fetchFavorites();
    }, [])
    
    return(

        <>
         <ul>
            {FavoriteGiphy.map((giphy)  => {
                 const gifUrl = giphy.gif_url;
                return (<li key={giphy.id}> 
                
                <img src={gifUrl} alt={giphy.title} style={{width: '100px', height: '100px'}} />
                </li>
                );
            } )}
        </ul>

        <button
        onClick={handleBack}
        >
            Back to Search
        </button>
        </>
       
    )




}
export default Favorite;