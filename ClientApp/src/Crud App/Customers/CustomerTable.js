import React, { useEffect, useState } from 'react';
import { Button, Table, Icon, Segment } from 'semantic-ui-react';
import axios from 'axios';
import CreateCustomer from './CreateCustomer';


const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


    useEffect(() => {
        getCustomers()
            .then(response => {
                setCustomers(response);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const getCustomers = async () => {
        const res = await axios.get(`https://localhost:7160/api/Customers`);
        return res.data;
    }


    function handleCreateCustomer(newCustomer) {
        setCustomers([...customers, newCustomer]);
        handleCreateModalClose();

    }
    function handleCreateModalOpen() {
        setIsCreateModalOpen(true);
    }
    function handleCreateModalClose() {
        setIsCreateModalOpen(false);
    }




    let tableData = null;

    if (customers.length > 0) {
        tableData = customers.map(customer => (
            <Table.Row key={customer.id}>
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell>{customer.address}</Table.Cell>
                <Table.Cell width={2}>
                    <Button className="edit-btn yellow"
                        name="edit outline"
                    ><Icon name='edit'></Icon> Edit</Button>
                </Table.Cell>
                <Table.Cell width={2}>
                    <Button className="delete-btn red"
                        name="delete"
                    ><Icon name='trash alternate'></Icon>Delete</Button>
                </Table.Cell>
            </Table.Row>
        ));
    }


    return (
        <Segment>
            <h2>Customers Details</h2>   
            <Button primary onClick={handleCreateModalOpen}>Create Customer</Button>          
            <Table celled selectable>
                <Table.Header>
                    <Table.Row >
                        <Table.HeaderCell className="four wide">Name</Table.HeaderCell>
                        <Table.HeaderCell className="four wide">Address</Table.HeaderCell>
                        <Table.HeaderCell className="four wide">Action</Table.HeaderCell>
                        <Table.HeaderCell className="four wide">Action</Table.HeaderCell>
                    </Table.Row >
                </Table.Header>
                <Table.Body>{tableData}</Table.Body>
            </Table>
            {isCreateModalOpen && (
                <CreateCustomer
                    trigger={handleCreateModalOpen}
                    onClose={handleCreateModalClose}
                    onCreate={handleCreateCustomer}
                    open={isCreateModalOpen}
                />
            )}
        </Segment>
    );
};

export default CustomerTable;











