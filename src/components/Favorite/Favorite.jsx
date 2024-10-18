
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Favorite = () => {
    const dispatch = useDispatch();
    const FavoriteGiphy = useSelector(store => store.giphyData)


    const fetchFavorites = () => {
        dispatch({
            type: 'GET_FAVORITES'
        })
    }

    useEffect(() => {
        fetchFavorites();
    }, [])
    
    return(


        <ul>
            {FavoriteGiphy.map((giphy)  => {
                 const gifUrl = giphy.gif_url;
                return (<li key={giphy.id}> 
                
                <img src={gifUrl} alt={giphy.title} style={{width: '100px', height: '100px'}} />
                </li>
                );
            } )}
        </ul>
    )




}
export default Favorite;