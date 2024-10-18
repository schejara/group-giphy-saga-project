import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Search = () => {
  const giphyProperty = useSelector(store => store.giphyData);
  const dispatch = useDispatch();
  const [newGiphy, setNewGiphy] = useState('');
  const history = useHistory()

  const handleNext = () => {
    history.push('/favorites')
  }


 

  useEffect(() => {
    dispatch({ type: 'GET_GIPHY' });
  }, [dispatch]);

  const postGiphy = (property) => ({
    type: 'POST_GIPHY',
    payload: { gif_url: property.images?.original?.url },
  });

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch({ type: 'SEARCH_GIPHY', payload: newGiphy });
    
  };

  return (
    <>
    <h1>Giphy Search!</h1>
     <form onSubmit={handleSearch}>
      <input
        placeholder="Name"
        value={newGiphy}
        onChange={evt => setNewGiphy(evt.target.value)}
      />
      <button type="submit">Search</button>
      <ul>
        {giphyProperty.map((property) => {
          const gifUrl = property.images?.original?.url;
          return (
            <li key={property.id}>
              <img src={gifUrl} alt={property.title} style={{ width: '100px', height: '100px' }} />
              <button
                type="button" 
                onClick={() => {
                  if (gifUrl) {
                    dispatch(postGiphy(property)); 
                  }
                }}
              >
                Favorite
              </button>
            </li>
          );
        })}
      </ul>
    </form>
    <button
    onClick={handleNext}
    >To Favorites</button>
    </>
  
  );
};

export default Search;
