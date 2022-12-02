import React from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


export default function history() {
    let url = 'https://liveplymouthac-my.sharepoint.com/:b:/g/personal/10749829_students_plymouth_ac_uk/EXh8cK5FtfZMuhkUC_qyS6kBQzNXgrSKQTtk5k-aVvtRHg?e=FtSZal'
    return (
        <div>

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