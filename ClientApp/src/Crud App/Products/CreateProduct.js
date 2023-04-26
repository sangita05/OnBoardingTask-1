import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';


function CreateProduct(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handlePriceChange(event) {
        setPrice(event.target.value);
    }

    function handleCancel() {
        props.onClose();
    }

    function handleSave() {
        createProduct(name, price)
            .then((newProduct) => {
                props.onCreate(newProduct);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function createProduct(name, price) {
        const endpoint = `https://localhost:7160/api/Products`; // Replace with your API endpoint
        const data = { name, price };
        return axios.post(endpoint, data)
            .then(response => {
                const { id } = response.data;
                return { id, name, price };
            })
            .catch(() => {
                throw new Error('Failed to create customer');
            });
    }

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Modal.Header>Create Product</Modal.Header>
            {error && <div className="error">{error}</div>}
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input value={name} onChange={handleNameChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input value={price} onChange={handlePriceChange} />
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

export default CreateProduct;

