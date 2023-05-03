import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function EditProduct(props) {
    const [name, setName] = useState(props.product.name);
    const [price, setPrice] = useState(props.product.price);
    const [error, setError] = useState(null);


    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handlePriceChange(event) {
        setPrice(event.target.value);
    }
    function handleCancel() {
        props.onClose();
    };

    function handleSave() {
        return updateProduct(props.product.id, name, price) // <-- use return here
            .then((updatedProduct) => {
                props.onUpdate(updatedProduct);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }


    function updateProduct(id, name, price) {
        const endpoint = `https://contosouniversity20230503222654.azurewebsites.net/api/Products/${id}`;
        const data = { name, price };

        return axios
            .put(endpoint, data)
            .then((response) => {
                if (response.status === 204) {
                    return { id, name, price };
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
            <Modal.Header>Edit Product</Modal.Header>
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

export default EditProduct;











