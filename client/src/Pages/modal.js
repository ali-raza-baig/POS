
<Modal title="Create Product" open={modalopen} footer={false} onCancel={() => setModalopen(false)}>
    <Form layout='vertical' form={form}
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
                <Select.Option value="male">Drink</Select.Option>
                <Select.Option value="female">Rices</Select.Option>
                <Select.Option value="other">Meat</Select.Option>
            </Select>
        </Form.Item>
        <div className='flex justify-end'>
            <button type="button" onClick={onReset} class=" text-white bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reset</button>
            <button type="primary" htmlType="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Product</button>
        </div>
    </Form>
</Modal>