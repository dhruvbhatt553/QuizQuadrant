import React, { useState } from 'react';
import SubjectContext from './subjectContext';

const SubjectState = (props) => {
    <SubjectContext.Provider value={{  }}>
        {props.children}
    </SubjectContext.Provider>
};