import React from 'react';

export default function({size = 'sm', children}) {
    return (
        <>
        {
            size === 'lg' ? (
                <h1 style={{textAlign: 'center'}}>
                    {children}
                </h1>
            ) :  size === 'sm' ? (
                <h3 style={{textAlign: 'center'}}>
                    {children}
                </h3>
            ) : (
                <h5 style={{textAlign: 'center'}}>
                    {children}
                </h5>
            )
        }
        </>
    )
}