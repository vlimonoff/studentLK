import { SET_DISCIPLINES } from './actionsTypes';

const initialState = {
  disciplines: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DISCIPLINES: {
      return { ...state, disciplines: action.payload };
    }

    default:
      return state;
  }
}
