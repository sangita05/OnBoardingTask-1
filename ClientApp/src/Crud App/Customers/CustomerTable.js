import React, { useEffect, useState } from 'react';
import { Button, Table, Icon, Segment, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import CreateCustomer from './CreateCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import '../../custom.css';



const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);




    useEffect(() => {
        getCustomers(pageNumber, pageSize)
            .then(response => {
                setCustomers(response);
                setCurrentPage(pageNumber);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const getCustomers = async (pageNumber, pageSize) => {
        const res = await axios.get(`https://contosouniversity20230503222654.azurewebsites.net/api/Customers`, {
        params: {
            pageNumber: pageNumber,
                pageSize: pageSize
        }
    });
        return res.data;
    }

    function handleUpdateCustomer(updatedCustomer) {
        const updatedCustomers = customers.map((customer) => {
            if (customer.id === updatedCustomer.id) {
                return updatedCustomer;
            }
            return customer;
        });
        setCustomers(updatedCustomers);
        setIsModalOpen(false);
    }


    function handleCreateCustomer(newCustomer) {
        setCustomers([...customers, newCustomer]);
        handleCreateModalClose();
        refreshCustomerList();
    }


    const refreshCustomerList = () => {
        getCustomers(pageNumber, pageSize);
    };

    function handleCreateModalOpen() {
        setIsCreateModalOpen(true);
    }
    function handleCreateModalClose() {
        setIsCreateModalOpen(false);
    }

    function handleOpenEditCustomer(customer) {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    }

    function handleCloseEditCustomer() {
        setSelectedCustomer(null);
        setIsModalOpen(false);
    }

    function handleOpenDeleteCustomer(customer) {
        setSelectedCustomer(customer);
        setIsDeleteModalOpen(true);
    }
    function handleCloseDeleteCustomer(customer) {
        setSelectedCustomer(null);
        setIsDeleteModalOpen(false);
    }
    function handleDeleteCustomer(customer) {
        const updatedCustomers = customers.filter((s) => s.id !== customer.id);
        setCustomers(updatedCustomers);
    }


    const handlePreviousPage = () => {
        setPageNumber(prevPageNumber => prevPageNumber - 1);
    };

    const handleNextPage = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    const handlePageSizeChange = (event, { value }) => {
        setPageSize(value);
        setPageNumber(1);
    };

    const pageSizeOptions = [
        { key: 10, value: 10, text: '10' },
        { key: 20, value: 20, text: '20' },
        { key: 30, value: 30, text: '30' },
    ];



    let tableData = null;

    if (customers.length > 0) {
        tableData = customers.map(customer => (
            <Table.Row key={customer.id}>
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell>{customer.address}</Table.Cell>
                <Table.Cell width={2}>
                    <Button className="edit-btn yellow"
                        name="edit outline" onClick={() => handleOpenEditCustomer(customer)}
                    ><Icon name='edit'></Icon> Edit</Button>
                </Table.Cell>
                <Table.Cell width={2}>
                    <Button className="delete-btn red"
                        name="delete" onClick={() => handleOpenDeleteCustomer(customer)}
                    ><Icon name='trash alternate'></Icon>Delete</Button>
                </Table.Cell>
            </Table.Row>
        ));
    }


    return (
        <Segment>
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

            {selectedCustomer && (
                <EditCustomer
                    trigger={handleOpenEditCustomer}
                    customer={selectedCustomer}
                    onClose={handleCloseEditCustomer}
                    open={isModalOpen}
                    onUpdate={handleUpdateCustomer}
                />
            )}

            {selectedCustomer && (
                <DeleteCustomer
                    trigger={handleOpenDeleteCustomer}
                    customer={selectedCustomer}
                    onClose={handleCloseDeleteCustomer}
                    open={isDeleteModalOpen}
                    onDelete={handleDeleteCustomer}
                />
            )}



            <div className="pagination">

                <Button icon labelPosition='left' disabled={pageNumber === 1} onClick={handlePreviousPage}>
                    <Icon name='left arrow' />
                    Previous
                </Button>

                <Button icon labelPosition='right' disabled={customers.length < pageSize} onClick={handleNextPage}>
                    Next
                    <Icon name='right arrow' />
                </Button>
                <Dropdown
                    placeholder='Page size'
                    selection
                    options={pageSizeOptions}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                />
                <span className="page-number">Page {currentPage}</span>
            </div>

        </Segment>
    );
};

export default CustomerTable;