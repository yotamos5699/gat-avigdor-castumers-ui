import { useEffect, useState } from "react";
import axios from "axios";
const updateErrorLogApi = (data: object) => {
  const stringefyProgressBar = JSON.stringify(data);

  axios.get(
    `https://script.google.com/macros/s/AKfycbxk9juvSBno92vj4gEKcDqPSPW36KOtpm16ZpvPAOTSFCSOyEkfLcM6AKAxdk2IKW9O/exec?type=updatedocslog&pb=${stringefyProgressBar}`,
    { withCredentials: false }
  );
};

function useLoggerApi(data: object, delay: number | undefined) {
  const [isStuck, setIsStack] = useState<boolean>(false);
  if (!delay) return updateErrorLogApi(data);

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsStack(true);
      updateErrorLogApi(data);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [data, delay]);
  return isStuck;
}

export default useLoggerApi;

//script.google.com/macros/s/AKfycbxk9juvSBno92vj4gEKcDqPSPW36KOtpm16ZpvPAOTSFCSOyEkfLcM6AKAxdk2IKW9O/exec?type=getdocslog
