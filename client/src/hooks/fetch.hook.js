import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function useFetch(query){
    const [getData, setData] = useState({isLoading: false, apiData: undefined, status: null, serverError: null})

    useEffect(() => {
        if(!query) return;

        const fetchData = async () => {
            try{
                setData((pre) => ({...pre, isLoading: true}));

                const {data, status} = await axios.get(`/api/${query}`);

                console.log(status);
                console.log(data);
                

                if(status === 201){
                    setData((pre) => ({...pre, isLoading: false}));
                    setData((pre) => ({...pre, apiData: data, status: status}));
                }

                setData((pre) => ({...pre, isLoading: false}));
            }catch(err){
                setData((pre) => ({...pre, isLoading: false, serverError: err}))
            }
        }

        fetchData()

    }, [query])

    return [getData, setData]
}