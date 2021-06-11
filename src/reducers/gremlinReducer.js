import { ACTIONS } from '../constants';

const initialState = {
  host: 'localhost',
  port: '8182',
  user: '',
  password: '',
  traversal: '',
  query: '',
  error: null
};

export const reducer =  (state=initialState, action)=>{
  switch (action.type){
    case ACTIONS.SET_HOST: {
      return { ...state, host: action.payload }
    }
    case ACTIONS.SET_PORT: {
      return { ...state, port: action.payload }
    }
    case ACTIONS.SET_USER: {
      return { ...state, user: action.payload }
    }
    case ACTIONS.SET_PASSWORD: {
      return { ...state, password: action.payload }
    }
    case ACTIONS.SET_TRAVERSAL: {
      return { ...state, traversal: action.payload, error: null }
    }
    case ACTIONS.SET_QUERY: {
      return { ...state, query: action.payload, error: null }
    }
    case ACTIONS.SET_ERROR: {
      return { ...state, error: action.payload }
    }
    default:
      return state;
  }
};
