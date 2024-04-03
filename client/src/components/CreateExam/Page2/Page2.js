import React, { useState } from 'react';
import LeftDiv from './LeftDiv';
import RightDiv from './RightDiv';

export default function Page2() {
    return (
        <>
            <div className='w-full h-full flex'>
                <div className='w-1/5 bg-gray-200 p-3 overflow-auto'>
                    <LeftDiv />
                </div>
                <div className='w-4/5 text-left text-xl px-5 overflow-auto'>
                    <RightDiv />
                </div>
            </div>
        </>
    );
}