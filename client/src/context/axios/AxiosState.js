import React, { useState } from 'react';
import AxiosContext from './axiosContext';

const AxiosState = (props) => {
    <AxiosContext.Provider value={{  }}>
        {props.children}
    </AxiosContext.Provider>
};