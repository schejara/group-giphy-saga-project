import React, { useState,useEffect }from 'react';


import { useDispatch, useSelector } from 'react-redux';


const Search = () => {

  const giphyProperty = useSelector(store => store.giphyData)
  const dispatch = useDispatch();
  const [newGiphy,setNewGiphy] =useState('');

  
  const getGiphy = () => {
    dispatch({type: 'GET_GIPHY'})
}

useEffect(() => {
  getGiphy();
}, []);


return(

    <form>
     <input placeholder = "Name"
     value = {newGiphy}
     onChange = {evt => setNewGiphy(evt.target.value)}
     />
      
      <button type = "submit">Search</button>
      <ul>
        {giphyProperty.map((property) => {
          console.log(property);
          console.log(property.images);
          return(
            <li key={property.id} >
               <img key={property.id}src={property.images?.original?.url} alt={property.title} style={{ width: '100px', height: '100px' }}  />
             <button>Favorite</button></li>
           
           
          )
        })}
      

      </ul>


    </form>


)
}
export default Search;
