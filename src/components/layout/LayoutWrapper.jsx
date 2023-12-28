import React from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/reducers/AppStateReducer";

const LayoutWrapper = (props) => {
  // constants
  const dispatch = useDispatch();
  // for sidebar state
  useEffect(() => {
    if (props.state) {
      dispatch(setAppState(props.state));
    }
  }, [dispatch, props]);

  return (
    <>{props.children}</>
  );
};

export default LayoutWrapper;