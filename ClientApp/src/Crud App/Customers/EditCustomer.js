import React, { useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

function EditCustomer(props) {
    // State variables for name, address, and error
    const [name, setName] = useState(props.customer.name);
    const [address, setAddress] = useState(props.customer.address);
    const [error, setError] = useState(null);

    // Handler functions for name and address changes
    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    // Handler functions for cancel and save buttons
    function handleCancel() {
        props.onClose();
    }

    function handleSave() {
        updateCustomer(props.customer.id, name, address)
            .then((updatedCustomer) => {
                props.onUpdate(updatedCustomer);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function updateCustomer(id, name, address) {
        const endpoint = `https://localhost:7160/api/Customers/${id}`;
        const data = { name, address };

        return axios
            .put(endpoint, data)
            .then((response) => {
                if (response.status === 204) {
                return { id, name, address };
                } else {
                throw new Error('Failed to update customer');
                }
                })
                    .catch ((error) => {
                    throw new Error('Failed to update customer');
          });
    }

    // Return the modal popup component
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Modal.Header>Edit Customer</Modal.Header>
            {error && <div className="error">{error}</div>}
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input value={name} onChange={handleNameChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <input value={address} onChange={handleAddressChange} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button primary onClick={handleSave}>Save</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default EditCustomer;



