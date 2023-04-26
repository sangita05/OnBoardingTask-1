import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

function DeleteStore(props) {
    const [error, setError] = useState(null);

    function handleCancel() {
        props.onClose();
    }

    function handleDelete() {
/*        debugger
*/        deleteStore(props.store.id)
            .then(() => {
                props.onDelete(props.store);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function deleteStore(id) {
        const endpoint = `https://localhost:7160/api/Stores/${id}`;
        const data = { id };
        return axios
            .delete(endpoint, data)
            .then((response) => {
                if (response === null) {
                    throw new Error('Failed to delete store');
                }
            })
            .catch(() => {
                throw new Error('Failed to delete store');
            });
    }

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Modal.Header>Delete Store</Modal.Header>
            {error && <div className="error">{error}</div>}
            <Modal.Content>
                <p>Are you sure you want to delete this store?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button className="cancel-btn black" onClick={handleCancel}>Cancel</Button>
                <Button negative onClick={handleDelete}>Delete</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteStore;
