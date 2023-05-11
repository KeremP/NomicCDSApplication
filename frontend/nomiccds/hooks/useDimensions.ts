import { useState, useEffect, useLayoutEffect } from "react";

export const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {

    const getDimensions = () => {
      // console.log(targetRef.current)
      return {
        width: targetRef.current ? targetRef.current.offsetWidth : 0,
        height: targetRef.current ? targetRef.current.offsetHeight : 0
      };
    };
  
    const [dimensions, setDimensions] = useState(getDimensions);
  
    const handleResize = () => {
      setDimensions(getDimensions());
    };
    
    useEffect(() => {
      setDimensions(getDimensions());
    }, [targetRef.current])

    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    useLayoutEffect(() => {
      handleResize();
    }, []);
  
    return dimensions;
  }