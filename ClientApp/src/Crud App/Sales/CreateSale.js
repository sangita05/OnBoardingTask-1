import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateSale(props) {
    const [productId, setProductId] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [storeId, setStoreId] = useState(0);
    const [dateSold, setDateSold] = useState(moment(new Date()).toDate());
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [stores, setStores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
        getCustomers();
        getStores();
    }, []);



    function getProducts() {
        const pageNumber = 1; 
        const pageSize = 9999; 

        axios.get(`https://contosouniversity20230503222654.azurewebsites.net/api/Products`, { params: { pageNumber, pageSize } })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Failed to get products:', error);
            });
    }

    function getCustomers() {
        const pageNumber = 1; 
        const pageSize = 9999; 

        axios.get(`https://contosouniversity20230503222654.azurewebsites.net/api/Customers`, { params: { pageNumber, pageSize } })
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Failed to get customers:', error);
            });
    }


        function getStores() {
            const pageNumber = 1; 
            const pageSize = 9999; 

            axios.get(`https://contosouniversity20230503222654.azurewebsites.net/api/Stores`, { params: { pageNumber, pageSize } })
                .then(response => {
                    setStores(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch stores:', error);
                });
        }

    const productDropdown = products.map((x) => ({
        key: x.id,
        text: x.name,
        value: x.id,


    }));
    const customerDropdown = customers.map((x) => ({
        key: x.id,
        text: x.name,
        value: x.id,

    }));
    const storeDropdown = stores.map((x) => ({
        key: x.id,
        text: x.address,
        value: x.id,

    }));
    function handleProductChange(event, data) {
        setProductId(data.value);
    }

    function handleCustomerChange(event, data) {
        setCustomerId(data.value);
    }

    function handleStoreChange(event, data) {
        setStoreId(data.value);
    }

    function handleDateSoldChange(date) {
        setDateSold(date);
    }

    function handleCancel() {
        props.onClose();
    };

    function handleSave() {
        const formattedDateSold = moment(dateSold).format('YYYY-MM-DD')
        return createSale(productId, customerId, storeId, formattedDateSold)
            .then((newSale) => {
                props.onCreate(newSale);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function createSale(productId, customerId, storeId, dateSold) {
        const endpoint = `https://contosouniversity20230503222654.azurewebsites.net/api/Sales`; // Replace with your API endpoint
        const data = { productId, customerId, storeId, dateSold };
        return axios.post(endpoint, data)
            .then(response => {
                const { id } = response.data;
/*                debugger;
*/                //const { id } = response;
                return { id, productId, customerId, storeId, dateSold };
            })
            .catch((error) => {
                throw new Error('Failed to create customer');
            });
    }


    return (
        <Modal open={props.open} onClose={props.onClose} >
            <Modal.Header>Create Sale</Modal.Header>
            {error && <div className="error">{error}</div>}
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown
                            placeholder="Select Customer"
                            fluid
                            search
                            selection
                            options={customerDropdown}
                            onChange={handleCustomerChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown
                            placeholder="Select Product"
                            fluid
                            search
                            selection
                            options={productDropdown}
                            onChange={handleProductChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Store</label>
                        <Dropdown
                            placeholder="Select Store"
                            fluid
                            search
                            selection
                            options={storeDropdown}
                            onChange={handleStoreChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Date Sold</label>
                        <DatePicker
                            selected={dateSold}
                            onChange={handleDateSoldChange}

                        />

                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button className="cancel-btn black" onClick={handleCancel}>Cancel</Button>
                <Button className="save-btn green" onClick={handleSave}>Save</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default CreateSale;
