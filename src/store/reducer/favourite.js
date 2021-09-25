import { ADD_FAV, DELETE_FAV } from '../action/favourite';

const initialState = {
  favList: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      const newImage = action.payload ;
        return {
          favList: state.favList.find(im  => im.id === newImage.id ) ? state.favList : state.favList.concat(newImage)
      };
    case DELETE_FAV:
      return {
        ...state,
        favList:  state.favList.filter(img => img.id !== action.payload.id)
      };   
    default:
      return state;
  }
};

