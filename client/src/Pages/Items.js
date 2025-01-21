import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import axios from 'axios'
import { Form, Input, message, Modal, Select, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const Items = () => {
    const [items, setItems] = useState([])
    const [modalopen, setModalopen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const column = [
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => {
                return (
                    < img src={record.image} alt={record.name} height="60" width="60" />
                )
            }
        },
        { title: "Name", dataIndex: "name" },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <div>
                    <EditOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setEditItem(record);
                            setModalopen(true);
                        }}
                    />
                    <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleDelete(record._id);
                        }}
                    />
                </div>
            ),
        },

    ]

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.React_App_API}/api/item/get-item`)
            if (data) {
                setItems(data.All_items)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlesubmit = async (value) => {
        if (editItem == null) {

            try {

                console.log(value)
                await axios.post(`${process.env.React_App_API}/api/item/add-item`, value)
                setModalopen(false)
                getProducts()
                message.success('Product Added Successfuly')
            } catch (error) {

            }
        } else {
            try {

                console.log(value)
                await axios.put(`${process.env.React_App_API}/api/item/update-item`, { ...value, itemid: editItem._id })
                setModalopen(false)
                getProducts()
                message.success('Product Updated Successfuly')
            } catch (error) {

            }
        }
    }

    const handleDelete = async (pid) => {
        try {
            await axios.delete(`${process.env.React_App_API}/api/item/delete-item/${pid}`)
            message.success("Product Deleted")
            getProducts()
        } catch (error) {
            message.error('Error in Deleting')
            console.log(error)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <DefaultLayout>
            <div className="container d-flex justify-content-around mb-3 text-xl">
                <h3 className="title">Items</h3>
                <button type="button" onClick={() => setModalopen(true)} class="btn btn-primary">Create Product</button>
            </div>

            <Table columns={column} dataSource={items} bordered />
            {modalopen && (
                <Modal title={`${editItem !== null ? 'Edit Item' : 'Create Product'} `}

                    open={modalopen} footer={false} onCancel={() => {
                        setEditItem(null)
                        setModalopen(false)
                    }}>
                    <Form layout='vertical' initialValues={editItem}
                        onFinish={handlesubmit}>
                        <Form.Item label="Product Name" name="name" rules={[{
                            required: true,
                            message: 'Please Enter Product Name',
                        }]}>

                            <Input />
                        </Form.Item>
                        <Form.Item label="Product Price" name="price" rules={[{
                            required: true,
                            message: 'Please Enter Price',
                        }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Image URL" name="image" rules={[{
                            required: true,
                            message: 'Please Enter Image Url',
                        }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Category" name="category">
                            <Select>
                                <Select.Option value="drinks">Drink</Select.Option>
                                <Select.Option value="rice">Rices</Select.Option>
                                <Select.Option value="noodles">Meat</Select.Option>
                            </Select>
                        </Form.Item>
                        <div className='d-flex justify-content-end'>
                            <button type="primary" htmlType="submit" class="btn btn-primary">{`${editItem !== null ? ' Update Product' : 'Create Product'} `}</button>
                        </div>
                    </Form>
                </Modal>)}
        </DefaultLayout>
    )
}

export default Items