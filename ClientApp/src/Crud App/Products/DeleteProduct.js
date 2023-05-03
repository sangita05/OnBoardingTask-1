import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

function DeleteProduct(props) {
    const [error, setError] = useState(null);

    function handleCancel() {
        props.onClose();
    }

    function handleDelete() {
/*        debugger
*/        deleteProduct(props.product.id)
            .then(() => {
                props.onDelete(props.product);
                props.onClose();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function deleteProduct(id) {
        const endpoint = `https://contosouniversity20230503222654.azurewebsites.net/api/Products/${id}`;
        const data = { id };
        return axios
            .delete(endpoint, data)
            .then((response) => {
                if (response === null) {
                    throw new Error('Failed to delete customer');
                }
            })
            .catch(() => {
                throw new Error('Failed to delete customer');
            });
    }

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Modal.Header>Delete Product</Modal.Header>
            {error && <div className="error">{error}</div>}
            <Modal.Content>
                <p>Are you sure you want to delete this product?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button className="save-btn black" onClick={handleCancel}>Cancel</Button>
                <Button negative onClick={handleDelete}>Delete</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteProduct;
