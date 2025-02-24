import React from 'react'
import { IconPropsType } from '../../models/AllData.model'

const NextEnd: React.FC<IconPropsType> = ({ color }) => {
    return (
        <>
            <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M8.16 1.41L3.58 6L8.16 10.59L6.75 12L0.750004 6L6.75 0L8.16 1.41Z" fill={color} />
            </svg>
        </>
    )
}

export default NextEnd

