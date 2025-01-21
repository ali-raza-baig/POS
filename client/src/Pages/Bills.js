import React, { useEffect, useRef, useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import axios from 'axios'
import { Modal, Table } from 'antd'
import { EyeOutlined } from "@ant-design/icons";
import { useReactToPrint } from 'react-to-print';
const Bills = () => {
    const [bill, setBills] = useState([])
    const [item, setItem] = useState({})
    const [array, setArray] = useState([])
    const [modalopen, setModalopen] = useState(false)
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const column = [

        { title: "ID", dataIndex: "_id" },
        { title: "Name", dataIndex: "name" },
        {
            title: "Total", dataIndex: "totalprice"
        },
        {
            title: "Actions",
            dataIndex: "cartitem",
            render: (cartitem, record) => (
                <div>
                    <EyeOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setItem(record);
                            setArray(cartitem)
                            setModalopen(true);
                        }}
                    />

                </div>
            ),
        },

    ]
    const getbills = async () => {
        try {
            const { data } = await axios.get(`${process.env.React_App_API}/api/bills/get-bills`)
            setBills(data.bills)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getbills()
    }, [])

    return (
        <DefaultLayout>
            <Table columns={column} dataSource={bill} bordered size='Medium' />

            <Modal title="Invoice"

                open={modalopen} footer={false} onCancel={() => {
                    setModalopen(false)
                }}>


                {/* <!-- Invoice 1 - Bootstrap Brain Component --> */}
                <div className="container" ref={componentRef}>
                    <div className="row">
                        <div className="col-md-12 col-md-offset-3 body-main">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-5 text-right">
                                        <h4 style={{ color: '#F81D2D' }}><strong>Point of Sale POS</strong></h4>
                                        <p>+92 3249974287</p>
                                        <p>alirazabaigmdk@gmail.com</p>
                                    </div>
                                    <div className="col-md-7">
                                        <h2>{item.name}</h2>
                                        <h5>ID :77770023</h5>
                                        {/* <img className="img" alt="Invoce Template" src="http://pngimg.com/uploads/shopping_cart/shopping_cart_PNG59.png" /> */}
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><h5>Product</h5></th>
                                                <th><h5>Price</h5></th>
                                                <th><h5>Qty</h5></th>
                                                <th><h5>Total</h5></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {array.map((i) => (
                                                <tr key={i._id}>
                                                    <td className="col-md-3">{i.name}</td>
                                                    <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true" /> {i.price} </td>
                                                    <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true" /> {i.cartQuantity} </td>
                                                    <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true" /> {i.price * i.cartQuantity} </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="text-right">
                                                    <p>
                                                        <strong>Shipment and Taxes:</strong>
                                                    </p>
                                                    <p>
                                                        <strong>Discount: </strong>
                                                    </p>
                                                    <p>
                                                        <strong>Total Amount: </strong>
                                                    </p>

                                                </td>
                                                <td className='text-left'>
                                                    <p>
                                                        <strong> 0 </strong>
                                                    </p>
                                                    <p>
                                                        <strong>  0</strong>
                                                    </p>
                                                    <p>
                                                        <strong> {item.totalprice}</strong>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr style={{ color: '#F81D2D' }}>
                                                <td className="text-right"><h4><strong>Total:</strong></h4></td>
                                                <td className="text-left"><h4><strong> {item.totalprice} </strong></h4></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <p><b>Date :</b> 6 June 2019</p>
                                        <br />
                                        <p><b>Signature</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <button type='primary' className='btn btn-primary' onClick={handlePrint}>Print</button>
                </div>
            </Modal>
        </DefaultLayout>
    )
}

export default Bills