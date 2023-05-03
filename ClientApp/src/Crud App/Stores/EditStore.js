import React, { useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

function EditStore(props) {
    // State variables for name, address, and error
    const [name, setName] = useState(props.store.name);
    const [address, setAddress] = useState(props.store.address);
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
        updateStore(props.store.id, name, address)
            .then((updatedStore) => {
                props.onUpdate(updatedStore);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function updateStore(id, name, address) {
        const endpoint = `https://contosouniversity20230503222654.azurewebsites.net/api/Stores/${id}`;
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
            .catch((error) => {
                throw new Error('Failed to update customer');
            });
    }

    // Return the modal popup component
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Modal.Header>Edit Store</Modal.Header>
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
                <Button className="cancel-btn black" onClick={handleCancel}>Cancel</Button>
                <Button className="save-btn green" onClick={handleSave}>Save</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default EditStore;











