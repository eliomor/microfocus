export const DELETE_FAV = 'DELETE_FAV';
export const ADD_FAV = 'ADD_FAV';

export function deleteFav(img) {
    return  (dispatch) => {
      dispatch({
        type: 'DELETE_FAV',
        payload: img,
      });
    };
  }
  
  export function addFav(img) {
    return (dispatch) => {
     dispatch({
        type: 'ADD_FAV',
        payload: img,
      });
    };
  }