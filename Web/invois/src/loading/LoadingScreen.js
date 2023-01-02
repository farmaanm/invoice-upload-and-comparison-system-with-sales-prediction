import React from 'react'


function LoadingScreen() {

    return (
        <>

            <div class="spinner-grow text-primary" style={{width: '3rem', height: '3rem', marginTop: '20%'}} role="status">
                <span class="visually-hidden">Loading...</span>
            </div>

        </>
    );
}

export default LoadingScreen