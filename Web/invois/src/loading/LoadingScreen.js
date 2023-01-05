import React from 'react'


function LoadingScreen() {

    return (
        <>

            <div className="spinner-grow text-primary" style={{width: '3rem', height: '3rem', marginTop: '20%'}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>

        </>
    );
}

export default LoadingScreen