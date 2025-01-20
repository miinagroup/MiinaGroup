import { useEffect, useState } from "react";
import axios from "axios";

const FetchAuthFromServer = () => {

    const [isAuth, setIsAuth] = useState([]);
  
    const getToken = async () => {
      const response = await axios.get("/api/get-token");
      setIsAuth(response.data);
    };
  
    useEffect(() => {
      getToken()
    }, []);

  return isAuth
}

export default FetchAuthFromServer