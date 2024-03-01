import React from 'react';

export default function NavBar() {
    return (
        <div className='bg-slate-300 h-16 flex italic font-semibold text items-center justify-between px-4'>
            Website-Name
            <div >
                <button >

                    <img src="/images/log-in.png"
                        width={ "40px" }
                    />
                </button>
            </div>
        </div>
    );
};