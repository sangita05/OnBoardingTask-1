import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

function DeleteSale(props) {
    const [error, setError] = useState(null);

    function handleCancel() {
        props.onClose();
    }

    function handleDelete() {
        debugger
        deleteSale(props.sale.saleId)
            .then(() => {
                props.onDelete(props.sale);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function deleteSale(saleId) {
        const endpoint = `https://localhost:7160/api/Sales/${saleId}`;
        const data = { saleId };
        return axios
            .delete(endpoint, data)
            .then((response) => {
                if (response === null) {
                    throw new Error('Failed to delete sale');
                }
            })
            .catch(() => {
                throw new Error('Failed to delete sale');
            });
    }

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Modal.Header>Delete Sale</Modal.Header>
            {error && <div className="error">{error}</div>}
            <Modal.Content>
                <p>Are you sure you want to delete this sale?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button negative onClick={handleDelete}>Delete</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteSale;
