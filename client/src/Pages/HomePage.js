import React, { useState, useEffect } from 'react';
import DefaultLayout from '../Components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { AddCart } from '../Redux/CartSlice';
import { Card } from 'antd';
const HomePage = () => {
    const dispatch = useDispatch()
    const [items, setItems] = useState([])
    const [category, setCategory] = useState('drinks')
    const filterItems = (value) => {
        setCategory(value)

    }

    const categorys = [
        {
            name: "Drinks",
            value: "drinks"
        },
        {
            name: "Rice",
            value: "rice"
        },
        {
            name: "Noodles",
            value: "noodles"
        },

    ]

    const getallItems = async () => {
        try {
            const { data } = await axios.get(`${process.env.React_App_API}/api/item/get-item`)
            if (data) {
                setItems(data.All_items)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getallItems()
    }, [])


    return (
        <DefaultLayout>
            <div className="flex justify-center mb-4">
                {categorys.map((c) => (
                    <button onClick={() => filterItems(`${c.value}`)} className="mx-2 px-4 py-2 border-0 category-active category">{c.name}</button>

                ))}
            </div>
            <div className='d-flex flex-wrap'>
                {items.filter(item => item.category === category).map((item) => (
                    <Card
                        hoverable
                        style={{
                            width: 200,
                            margin: 12
                        }}
                        cover={<img alt="example" src={item.image} style={{ height: 150 }} />}
                    >
                        <Card.Meta title={item.name} />
                        <button
                            onClick={() => dispatch(AddCart(item))}
                            className="btn btn-primary mt-4"> Add to cart</button>
                    </Card>
                ))}
            </div>



        </DefaultLayout >
    )
}

export default HomePage