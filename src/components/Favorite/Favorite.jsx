import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Favorite = () => {
  const dispatch = useDispatch();
  const FavoriteGiphy = useSelector((store) => store.giphyData);
  const categories = useSelector((store) => store.categories);
  const history = useHistory();

  const handleClick = (giphyId, categoryId) => {
    dispatch({
        type: 'PUT_CATEGORY',
        payload: {
            giphyId: giphyId,
            categoryId: categoryId
        }
    })
  }


  const handleBack = () => {
    history.push("/");
  };

  const fetchFavorites = () => {
    dispatch({
      type: "GET_FAVORITES",
    });
  };

  const fetchCategories = () => {
    dispatch({
        type: 'GET_CATEGORIES'
    })
  }

  useEffect(() => {
    fetchFavorites(), fetchCategories();
  }, []);

  return (
    <>
      <h1>Giphy Favorites!</h1>
      <ul>
        {FavoriteGiphy.map((giphy) => {
          const gifUrl = giphy.gif_url;
          return (
            <li key={giphy.id}>
                {categories.map((category) => {
                    return <button key={category.id}
                    onClick={() => handleClick(giphy.id, category.id)}
                    >{category.name}</button>
                })}
              <img
                src={gifUrl}
                alt={giphy.title}
                style={{ width: "100px", height: "100px" }}
              />
            </li>
          );
        })}
      </ul>

      <button onClick={handleBack}>Back to Search</button>
    </>
  );
};
export default Favorite;
