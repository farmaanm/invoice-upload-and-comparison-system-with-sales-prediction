import typing
import json
from decimal import Decimal

from borb.pdf import Document
from borb.pdf.pdf import PDF
from borb.toolkit.text.simple_text_extraction import SimpleTextExtraction

from borb.toolkit.location.location_filter import LocationFilter
from borb.pdf.canvas.geometry.rectangle import Rectangle


def paymentRequisition(file_name):

    d: typing.Optional[Document] = None

    # Define rectangle of interest
    # x, y, width, height
    #Invoice No.
    r: Rectangle = Rectangle(Decimal(300),
                             Decimal(660),
                             Decimal(160),
                             Decimal(100))

    #Shipper Details
    r1: Rectangle = Rectangle(Decimal(30),
                             Decimal(590),
                             Decimal(300),
                             Decimal(80))

    #Invoice Date
    r2: Rectangle = Rectangle(Decimal(450),
                             Decimal(570),
                             Decimal(300),
                             Decimal(50))

    #Document Issued By
    r3: Rectangle = Rectangle(Decimal(30),
                             Decimal(40),
                             Decimal(300),
                             Decimal(80))

    #Total Value
    r4: Rectangle = Rectangle(Decimal(450),
                             Decimal(60),
                             Decimal(300),
                             Decimal(40))

    #Uploaded By
    r5: Rectangle = Rectangle(Decimal(390),
                             Decimal(40),
                             Decimal(300),
                             Decimal(20))

    # Set up EventListener(s)
    #Invoice No.
    l0: LocationFilter = LocationFilter(r)
    l1: SimpleTextExtraction = SimpleTextExtraction()
    l0.add_listener(l1)

    #Shipper Details
    m0: LocationFilter = LocationFilter(r1)
    m1: SimpleTextExtraction = SimpleTextExtraction()
    m0.add_listener(m1)

    #Invoice Date
    n0: LocationFilter = LocationFilter(r2)
    n1: SimpleTextExtraction = SimpleTextExtraction()
    n0.add_listener(n1)

    #Document Issued By
    o0: LocationFilter = LocationFilter(r3)
    o1: SimpleTextExtraction = SimpleTextExtraction()
    o0.add_listener(o1)

    #Total Value
    p0: LocationFilter = LocationFilter(r4)
    p1: SimpleTextExtraction = SimpleTextExtraction()
    p0.add_listener(p1)

    #Uploaded By
    q0: LocationFilter = LocationFilter(r5)
    q1: SimpleTextExtraction = SimpleTextExtraction()
    q0.add_listener(q1)


    with open(file_name, "rb") as pdf_in_handle:
        d = PDF.loads(pdf_in_handle, [l0])  #Invoice No.
        d = PDF.loads(pdf_in_handle, [m0])  #Shipper Details
        d = PDF.loads(pdf_in_handle, [n0])  #Invoice Date
        d = PDF.loads(pdf_in_handle, [o0])  #Document Issued By
        d = PDF.loads(pdf_in_handle, [p0])  #Total Value
        d = PDF.loads(pdf_in_handle, [q0])  #Uploaded By

    assert d is not None

    customer = m1.get_text_for_page(0)
    customer = customer.replace('\n', ' ')

    doc_issued_by = o1.get_text_for_page(0)
    doc_issued_by = doc_issued_by.replace('\n', ' ')

#b'{"Machine Name":"'+hostname+'"}', None, True)


    str = '{"invoice_no":"' + l1.get_text_for_page(0) + '","customer_details":"' + customer + '","invoice_date":"' + n1.get_text_for_page(0) + '","document_issued_by":"' + doc_issued_by + '","total_value":"' + p1.get_text_for_page(0) + '","uploaded_by":"' + q1.get_text_for_page(0) + '"}'

    #json_str = json.loads(str)
    
    return str

if __name__ == "__main__":
    #file_name = "Cost Confirmation Document - SCMB0004364.pdf"
    #file_name = "Cost Confirmation Document - SCMB0003609.pdf"
    #file_name = "Cost Confirmation Document - SCMB0003610.pdf"
    #file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/3. Data comparing/Python Borb/Cost Confirmation Document - SCMB0006015.pdf"
    #file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/3. Data comparing/Python Borb/Cost Confirmation Document - SCMB0006024.pdf"
    #file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/3. Data comparing/Python Borb/Cost Confirmation Document - SCMB0006026.pdf"
    file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/1. Invoices/Payment Requisition/Cost Confirmation Document - SCMB0006060.PDF"
    #file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/1. Invoices/8/Cost Confirmation Document - SCMB0006095.PDF"
    file_name = "C:/Users/HP/OneDrive/Desktop/ReactJS/atestpython/payment requisition/Cost Confirmation Document - SCMB0003888.pdf"

    payment_requisition_data = paymentRequisition(file_name)
    print(payment_requisition_data)

    print(payment_requisition_data["invoice_no"])
    print(payment_requisition_data["invoice_date"])
    print(payment_requisition_data["total_value"])
    print(payment_requisition_data["customer_details"])
    print(payment_requisition_data["document_issued_by"])
    

