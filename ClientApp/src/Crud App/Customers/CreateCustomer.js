/*import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

function CreateCustomer(props) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    function handleCancel() {
       *//* setName('');
        setAddress('');*//*
        props.onClose();
    }

    function handleSave() {
        const newCustomer = { name, address };
        props.onCreate(newCustomer);
      *//*  setName('');
        setAddress('');*//*
        props.onClose();
    }

    return (
        <Modal open={props.open} onClose={props.onClose}>
{*//*        <Modal open={props.open} onClose={handleCancel}>
*//*}            <Modal.Header>Create Customer</Modal.Header>
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

export default CreateCustomer;*/






import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
function CreateCustomer(props) {
    return (
        <Modal open={props.open} onClose={props.onClose}>
        </Modal>
    );
}
export default CreateCustomer;