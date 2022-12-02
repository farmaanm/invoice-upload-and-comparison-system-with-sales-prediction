import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
    let url = 'https://liveplymouthac-my.sharepoint.com/:b:/g/personal/10749829_students_plymouth_ac_uk/EXh8cK5FtfZMuhkUC_qyS6kBQzNXgrSKQTtk5k-aVvtRHg?e=FtSZal'
    return (
        <div>
            <div style={{
                position: 'relative',
                height: '100px'
            }}>

                <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                    <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                    <span className="h1 fw-bold mb-0">Invois</span>
                </div>

                <div style={{ position: 'absolute', bottom: '10px', right: '250px' }}>
                    <a href="">Upload File</a>
                </div>

                <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                    <a href=''>History</a>
                </div>

                <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                    <a href=''>Log Out</a>
                </div>
            </div>

            <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>

            <div style={{ padding: '10px' }}>

                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Customer Invoice</th>
                            <th scope='col'>Payment Requisition</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Time</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Uploaded By</th>
                        </tr>
                    </MDBTableHead>

                    <MDBTableBody>
                        <tr>
                            <td>
                                <a href={url}><p className='fw-normal mb-1'>a.pdf</p></a>
                            </td>
                            <td>
                                <a href=""><p className='fw-normal mb-1'>b.pdf</p></a>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>25/09/2022</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>11:30am</p>
                            </td>
                            <td>
                                <MDBBadge color='success' pill>
                                    Approved
                                </MDBBadge>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Fazil Mohamed</p>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <p className='fw-normal mb-1'>a.pdf</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>b.pdf</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>25/09/2022</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>11:30am</p>
                            </td>
                            <td>
                                <MDBBadge color='warning' pill>
                                    Awaiting
                                </MDBBadge>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Fazil Mohamed</p>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <p className='fw-normal mb-1'>a.pdf</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>b.pdf</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>25/09/2022</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>11:30am</p>
                            </td>
                            <td>
                                <MDBBadge color='warning' pill>
                                    Awaiting
                                </MDBBadge>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Fazil Mohamed</p>
                            </td>
                        </tr>

                    </MDBTableBody>
                </MDBTable>
            </div>

        </div>
    );
}