import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function CreateStore(props) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    function handleCancel() {
        props.onClose();
    }

    function handleSave() {
        createStore(name, address)
            .then((newStore) => {
                props.onCreate(newStore);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function createStore(name, address) {
        const endpoint = `https://localhost:7160/api/Stores`; // Replace with your API endpoint
        const data = { name, address };
        return axios.post(endpoint, data)
            .then(response => {
                const { id } = response.data;
                return { id, name, address };
            })
            .catch(() => {
                throw new Error('Failed to create customer');
            });
    }

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Modal.Header>Create Store</Modal.Header>
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

export default CreateStore;
