import React, { useEffect } from 'react'
import { test } from '../services'
import axios from 'axios'

const TestGetTimeSrvice = () => {

    const getSpeedRes = async () => {
        const postData = {
            types: [
                0,
                1
            ],
            importantTypes: [],
            status: [
                1
            ]
        }
        axios.defaults.baseURL = "http://212.16.83.235:1669/";
        const startTime = performance.now()
        //(startTime);
        const getRes = await axios.post("api/Attachment/GetAllNews", postData);
        const endTime = performance.now();
        const duration = endTime - startTime;

        //(getRes, duration);
        const setStrDur = duration.toString()
        const getSecend = setStrDur.substring(0, 1)
        //(getSecend);
        return getRes;
    }

    useEffect(() => {
        getSpeedRes()
    }, [])

    return (
        <div>TestGetTimeSrvice</div>
    )
};

export default TestGetTimeSrvice;






