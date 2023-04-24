import React, { useState } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

function DeleteCustomer(props) {
    const [error, setError] = useState(null);

    function handleCancel() {
        props.onClose();
    }

    function handleDelete() {
/*        debugger
*/        deleteCustomer(props.customer.id)
            .then(() => {
                props.onDelete(props.customer);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

   /* function updateCustomer(id, name, address) {
        const endpoint = `https://localhost:7160/api/Customers/${id}`;
        const data = { name, address };

        return axios
            .put(endpoint, data)
            .then((response) => {
                if (response.status === 204) {
                    return { id, name, address };
                } else {*/

    function deleteCustomer(id) {
        const endpoint = `https://localhost:7160/api/Customers/${id}`;
        const data = { id };
        return axios
            .delete(endpoint, data)
            .then((response) => {
            if (response === null) {
                throw new Error('Failed to delete customer');
            }
        })
            .catch (() => {
            throw new Error('Failed to delete customer');
        });
    }
     /*   return api
            .deleteCustomer(id)
            .then((response) => {
                if (response === null) {
                    throw new Error('Failed to delete customer');
                }
            })
            .catch(() => {
                throw new Error('Failed to delete customer');
            });
    }*/

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Modal.Header>Delete Customer</Modal.Header>
            {error && <div className="error">{error}</div>}
            <Modal.Content>
                <p>Are you sure you want to delete this customer?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button negative onClick={handleDelete}>Delete</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteCustomer;
