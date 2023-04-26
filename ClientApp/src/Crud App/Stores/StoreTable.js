import React, { useState, useEffect } from 'react';
import { Table, Button, Icon, Segment, Dropdown } from 'semantic-ui-react';
import '../../custom.css';
import CreateStore from './CreateStore';
import DeleteStore from './DeleteStore';
import axios from 'axios';
import EditStore from './EditStore';

export default function StoreTable() {
    const [stores, setStores] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getStores(pageNumber, pageSize)
            .then(response => {
                setStores(response);
                setCurrentPage(pageNumber);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const getStores = async (pageNumber, pageSize) => {
        const res = await axios.get(`https://localhost:7160/api/Stores`, {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize
            }
        });
        return res.data;
    }


    function handleUpdateStore(updatedStore) {
        const updatedStores = stores.map((store) => {
            if (store.id === updatedStore.id) {
                return updatedStore;
            }
            return store;
        });
        setStores(updatedStores);
        setIsModalOpen(false);
    }

    function handleCreateStore(newStore) {
        setStores([...stores, newStore]);
        handleCreateModalClose();
        refreshStoreList();
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
        { key: 5, value: 5, text: '5' },
        { key: 10, value: 10, text: '10' },
        { key: 15, value: 15, text: '15' },
    ];


    function handleCreateModalOpen() {
        setIsCreateModalOpen(true);
    }

    function handleCreateModalClose() {
        setIsCreateModalOpen(false);
    }

    function handleOpenEditStore(store) {
        setSelectedStore(store);
        setIsModalOpen(true);
    }
    function handleOpenDeleteStore(store) {
        setSelectedStore(store);
        setIsDeleteModalOpen(true);
    }

    function handleCloseEditStore(store) {
        setSelectedStore(null);
        setIsModalOpen(false);
    }
    function handleCloseDeleteStore(store) {
        setSelectedStore(null);
        setIsDeleteModalOpen(false);
    }
    function handleDeleteStore(store) {
        const updatedStores = stores.filter((s) => s.id !== store.id);
        setStores(updatedStores);
        refreshStoreList();
    }

    const refreshStoreList = () => {
        getStores(pageNumber, pageSize);
    };



    let tableData = null;

    if (stores.length > 0) {
        tableData = stores.map(store => (
            <Table.Row key={store.id}>
                <Table.Cell>{store.name}</Table.Cell>
                <Table.Cell>{store.address}</Table.Cell>
                <Table.Cell width={2}>
                    <Button className="edit-btn yellow" 
                        name="edit outline" onClick={() => handleOpenEditStore(store)}
                    ><Icon name='edit'></Icon> Edit</Button>

                </Table.Cell>
                <Table.Cell width={2}>
                    <Button className="delete-btn red" 
                        name="delete" onClick={() => handleOpenDeleteStore(store)}
                    ><Icon name='trash alternate'></Icon>Delete</Button>
                </Table.Cell>
            </Table.Row>
        ));
    }

    return (
        <Segment>
            <Button primary onClick={handleCreateModalOpen}>Create Store</Button>

            <Table celled selectable>
                <Table.Header>
                    <Table.Row >
                        <Table.HeaderCell className="four wide">Name</Table.HeaderCell>
                        <Table.HeaderCell className="four wide">Address</Table.HeaderCell>
                        <Table.HeaderCell className="four wide">Actions</Table.HeaderCell>
                        <Table.HeaderCell className="four wide">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{tableData}</Table.Body>
            </Table>
            {selectedStore && (
                <EditStore
                    trigger={handleOpenEditStore}
                    store={selectedStore}
                    onClose={handleCloseEditStore}
                    open={isModalOpen}
                    onUpdate={handleUpdateStore}
                />

            )}
            {isCreateModalOpen && (
                <CreateStore
                    trigger={handleCreateModalOpen}
                    onClose={handleCreateModalClose}
                    onCreate={handleCreateStore}
                    open={isCreateModalOpen}
                />
            )}

            {selectedStore && (
                <DeleteStore
                    trigger={handleOpenDeleteStore}
                    store={selectedStore}
                    onClose={handleCloseDeleteStore}
                    open={isDeleteModalOpen}
                    onDelete={handleDeleteStore}
                />
            )}
            <div className="pagination">

                <Button icon labelPosition='left' disabled={pageNumber === 1} onClick={handlePreviousPage}>
                    <Icon name='left arrow' />
                    Previous
                </Button>

                <Button icon labelPosition='right' disabled={stores.length < pageSize} onClick={handleNextPage}>
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
}
