import {useEffect,  useContext} from 'react';
import { Context }  from '../context/store';

const usePrevious = (key, value) => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({type:"SET", key:key, payload:value});
  },[value]); 

  return state[key]; 
}
export default usePrevious;
