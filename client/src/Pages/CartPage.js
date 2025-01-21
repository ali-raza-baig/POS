import React, { useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { AddCart, ClearCart, DecreaseQuentity, RemoveCart } from '../Redux/CartSlice'
import { Empty, message, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'
const CartPage = () => {
    const nevigate = useNavigate()
    const cart = useSelector(state => state.Cart)
    const dispatch = useDispatch()
    const [name, setName] = useState()
    let total = 0
    // eslint-disable-next-line
    const subTotal = cart.cart.forEach(item => (total = total + item.price * item.cartQuantity))

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newObject = {
                name: name,
                totalprice: total,
                cartitem: cart.cart
            };

            const { data } = await axios.post(`${process.env.React_App_API}/api/bills/add-bills`, newObject)
            if (data.success === true) {
                message.success('Bill Created')
                nevigate("/bills")
                dispatch(ClearCart())
            }

        } catch (error) {
            console.log(error)
        }

    }


    const column = [
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => {
                return (
                    <div className='d-flex '>
                        < img src={record.image} alt={record.name} height="60" width="60" />
                        <div className='m-2 fs-6'>{record.name}</div>
                    </div>
                )
            }
        },
        { title: "Price", dataIndex: "price" },

        {
            title: "Qty",
            dataIndex: "",
            render: (record) => {
                return (
                    <div className="d-flex align-item-center">
                        <button onClick={() => dispatch(DecreaseQuentity(record))} className="fs-6 mx-2 btn btn-light border-0" type="button">
                            -
                        </button>
                        <div className="fs-5">{record.cartQuantity}
                            {/* <input type="number"
                                value={record.cartQuantity}
                                id="first_product" className="fs-4 " placeholder={1} style={{ width: 50 }} required /> */}
                        </div>
                        <button onClick={() => dispatch(AddCart(record))} className="fs-6 mx-2 btn btn-light border-0" type="button">
                            +
                        </button>
                    </div>
                )
            }

        },
        {
            title: "Total", dataIndex: "cartQuantity",
            render: (cartQuantity, record) => {
                return (
                    <div>
                        {cartQuantity * record.price}
                    </div>
                )
            }
        },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <div>
                    <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            dispatch(RemoveCart(record))
                        }}
                    />
                </div>
            ),
        },

    ]

    return (
        <DefaultLayout>

            {cart.cart.length === 0 ? <>
                <Empty />
                <div className='d-flex flex-wrap justify-content-center'>
                    <button className='btn btn-primary fs-5 mt-2' onClick={() => nevigate('/')}><ArrowLeftOutlined /> Continue Shoping</button>
                </div>
            </> : <>
                <div className='row'>
                    <Table className='col-9' columns={column}
                        pagination={{
                            defaultPageSize: 4, showSizeChanger: false, pageSizeOptions: ['4', '8', '12', '16']
                        }}
                        dataSource={cart.cart} size="small" bordered />
                    <div className="col-3 summary">
                        <div><h5><b>Summary</b></h5></div>
                        <hr />
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Custmor Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col fs-6 dt mb-2" style={{ paddingLeft: 0 }}><b>ITEMS ({cart.cart.length})</b></div>
                                <div className="col text-right fs-6">${total}</div>
                            </div>
                            <div className="row">
                                <div className="col fs-6 dt mb-2" style={{ paddingLeft: 0 }}><b>Shipping</b></div>
                                <div className="col text-right fs-6">$0</div>
                            </div>
                            <div className="row">
                                <div className="col fs-6 dt mb-2" style={{ paddingLeft: 0 }}><b>Tax</b></div>
                                <div className="col text-right fs-6">$0</div>
                            </div>
                            <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
                                <div className="col fs-5"><b>TOTAL</b></div>
                                <div className="col text-right fs-5">${total}</div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" onClick={handleSubmit} class="btn btn-primary">Get Invoce</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>}

        </DefaultLayout >
    )
}

export default CartPage