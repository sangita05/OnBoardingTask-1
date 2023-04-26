/*import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditSale(props) {
    const [productId, setProductId] = useState(props.sale.productId);
    const [customerId, setCustomerId] = useState(props.sale.customerId);
    const [storeId, setStoreId] = useState(props.sale.storeId);
    const [dateSold, setDateSold] = useState(moment(props.sale.dateSold).toDate());
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [stores, setStores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products, customers, and stores data
        getProducts();
        getCustomers();
        getStores();
    }, []);



    function getProducts() {
        const pageNumber = 1; // set to 1
        const pageSize = 9999; // set to a large value or to the total count of products

        axios.get(`https://localhost:7160/api/Products`, { params: { pageNumber, pageSize } })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch products:', error);
            });
    }

    function getCustomers() {
        const pageNumber = 1; // set to 1
        const pageSize = 9999; // set to a large value or to the total count of products

        axios.get(`https://localhost:7160/api/Customers`, { params: { pageNumber, pageSize } })
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch customers:', error);
            });
    }


    function getStores() {
        const pageNumber = 1; // set to 1
        const pageSize = 9999; // set to a large value or to the total count of products

        axios.get(`https://localhost:7160/api/Stores`, { params: { pageNumber, pageSize } })
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
        date.setHours(0, 0, 0, 0);
        setDateSold(date);
    }

    function handleCancel() {
        props.onClose();
    };

    function handleSave() {
        const formattedDateSold = moment(dateSold).format('YYYY-MM-DD');
       

        return updateSale(props.sale.saleId, productId, customerId, storeId, formattedDateSold)
            .then((updatedSale) => {
                props.onUpdate(updatedSale);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }


    function updateSale(saleId, productId, customerId, storeId, dateSold) {
        const endpoint = `https://localhost:7160/api/Sales/${saleId}`;
        const data = { saleId, productId, customerId, storeId, dateSold };

        return axios
            .put(endpoint, data)
            .then((response) => {
                if (response.status === 204) {
                    return { ...props.sale, productId, customerId, storeId, dateSold };
                } else {
                    throw new Error('Failed to update customer');
                }
            })
            .catch((error) => {
                throw new Error('Failed to update customer');
            });
    }

    return (
        <Modal open={props.open} onClose={props.onClose} >
            <Modal.Header>Edit Sale</Modal.Header>
            {error && <div className="error">{error}</div>}
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown
                            placeholder={props.sale.customerName}
                            fluid
                            search
                            selection
                            options={customerDropdown}
                            defaultValue={props.sale.customerName} 
                            onChange={handleCustomerChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown
                            placeholder={props.sale.productName}
                            fluid
                            search
                            selection
                            options={productDropdown}
                            defaultValue={props.sale.productName}
                            onChange={handleProductChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Store</label>
                        <Dropdown
                            placeholder={props.sale.storeAddress}
                            fluid
                            search
                            selection
                            options={storeDropdown}
                            defaultValue={props.sale.storeAddress} 
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

export default EditSale;

*/







import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditSale(props) {
    const [productId, setProductId] = useState(props.sale.productId);
    const [customerId, setCustomerId] = useState(props.sale.customerId);
    const [storeId, setStoreId] = useState(props.sale.storeId);
    const [dateSold, setDateSold] = useState(moment(props.sale.dateSold).toDate());
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [stores, setStores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products, customers, and stores data
        getProducts();
        getCustomers();
        getStores();
    }, []);


    function getProducts() {
        const pageNumber = 1; // set to 1
        const pageSize = 9999; // set to a large value or to the total count of products
        axios.get(`https://localhost:7160/api/Products`, { params: { pageNumber, pageSize } })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Failed to get products:', error);
            });
    }

    function getCustomers() {
        const pageNumber = 1; // set to 1
        const pageSize = 9999; // set to a large value or to the total count of products
        axios.get(`https://localhost:7160/api/Customers`, { params: { pageNumber, pageSize } })
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Failed to get customers:', error);
            });
    }

    function getStores() {
        const pageNumber = 1; // set to 1
        const pageSize = 9999; // set to a large value or to the total count of products
        axios.get(`https://localhost:7160/api/Stores`, { params: { pageNumber, pageSize } })
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
        date.setHours(0, 0, 0, 0);
        setDateSold(date);
    }

    function handleCancel() {
        props.onClose();
    };

    function handleSave() {
        const formattedDateSold = moment(dateSold).format('YYYY-MM-DD');
        //dateSold.setHours(0, 0, 0, 0);
        //var date = moment.utc(dateSold).format();
        /*debugger*/;

        return updateSale(props.sale.saleId, productId, customerId, storeId, formattedDateSold)
            .then((updatedSale) => {
                props.onUpdate(updatedSale);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function updateSale(saleId, productId, customerId, storeId, dateSold) {
        const updatedSale = {};

        if (productId) {
            updatedSale.productId = productId;
        }

        if (customerId) {
            updatedSale.customerId = customerId;
        }

        if (storeId) {
            updatedSale.storeId = storeId;
        }

        if (dateSold) {
            updatedSale.dateSold = dateSold;
        }

        return axios.put(`https://localhost:7160/api/sales/${saleId}`, updatedSale)
            .then(response => {
                if (response.status === 204) {
                    return { ...props.sale, ...updatedSale };
                } else {
                    throw new Error('Failed to update sale');
                }
            })
            .catch((error) => {
                throw new Error(`Failed to update sale: ${error.message}`);
            });
    }


    /*function updateSale(saleId, productId, customerId, storeId, dateSold) {
        //const formattedDateSold = moment(dateSold, 'YYYY-MM-DD').toDate();
*//*        debugger;
*//*        return axios.put(`https://localhost:7160/api/sales/${saleId}`, updatedSale) 
            .then(response => {
                if (response.status === 204) {
                    return { ...props.sale, productId, customerId, storeId, dateSold };
                } else {
                    throw new Error('Failed to update sale');
                }
            })
            .catch((error) => {
                throw new Error(`Failed to update sale: ${error.message}`);
            });
    }*/

  /*  function updateSale(saleId, productId, customerId, storeId, dateSold) {
        //const formattedDateSold = Moment(dateSold, 'YYYY-MM-DD').toDate();
        debugger;
        return api.updateSale(saleId, { productId, customerId, storeId, dateSold })
            .then(response => {
                if (response.status === 204) {
                    return { ...props.sale, productId, customerId, storeId, dateSold };
                } else {
                    throw new Error('Failed to update sale');
                }
            })
            .catch((error) => {
                throw new Error(`Failed to update sale: ${error.message}`);
            });
    }*/

    return (
        <Modal open={props.open} onClose={props.onClose} >
            <Modal.Header>Edit Sale</Modal.Header>
            {error && <div className="error">{error}</div>}
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown
                            placeholder={props.sale.customerName}
                            fluid
                            search
                            selection
                            options={customerDropdown}
                            defaultValue={props.sale.customerName} // Set defaultValue to props.sale.productName
                            onChange={handleCustomerChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown
                            placeholder={props.sale.productName}
                            fluid
                            search
                            selection
                            options={productDropdown}
                            defaultValue={props.sale.productName} // Set defaultValue to props.sale.productName
                            onChange={handleProductChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Store</label>
                        <Dropdown
                            placeholder={props.sale.storeAddress}
                            fluid
                            search
                            selection
                            options={storeDropdown}
                            defaultValue={props.sale.storeAddress} // Set defaultValue to props.sale.productName
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
                <Button onClick={handleCancel}>Cancel</Button>
                <Button color="green" onClick={handleSave}>Save</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default EditSale;
