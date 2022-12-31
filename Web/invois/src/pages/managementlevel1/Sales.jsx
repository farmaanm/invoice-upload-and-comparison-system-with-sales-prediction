import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react'


function Sales() {



    return (
        <>
            {/* Navigation Bar */}
            <div>
                <div style={{
                    position: 'relative',
                    height: '100px',
                    width: '100%'
                }}>

                    <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                        <span className="h1 fw-bold mb-0">Invois</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '350px' }}>
                        <a href='/history'>History</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '230px' }}>
                        <a href="/contract">Customers</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                        <a href='/sales'>Sales</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                        <a href="/">Log out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
            </div>

        </>
    );
}

export default Sales