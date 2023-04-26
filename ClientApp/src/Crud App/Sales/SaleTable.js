import React, { useState, useEffect } from 'react';
import { Table, Button, Icon, Segment, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import '../../custom.css';
import CreateSale from './CreateSale';
import DeleteSale from './DeleteSale';
import axios from 'axios';
import EditSale from './EditSale';
/*import EditSale from './EditSale';
*/
const SaleTable = () => {
    const [sales, setSales] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getSales(pageNumber, pageSize)

    }, [pageNumber, pageSize]);

    const getSales = async (pageNumber, pageSize) => {
        const res = await axios.get(`https://localhost:7160/api/Sales`, {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize
            }
        }).then(response => {
/*            debugger
*/            setSales(response.data);
            setCurrentPage(pageNumber);
        })
            .catch(error => {
                console.log(error);
            });
        
    }

    function handleUpdateSale(updatedSale) {
        const updatedSales = sales.map((sale) => {
            if (sale.saleId === updatedSale.saleId) {
                return updatedSale;
            }
            return sale;
        });
        setSales(updatedSales);
        setIsModalOpen(false);
        refreshSaleList();

    }

    function handleCreateSale(newSale) {
        debugger
        setSales([...sales, newSale]);
        handleCreateModalClose();
        refreshSaleList();
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
        { key: 50, value: 50, text: '50' },
    ];


       function handleCreateModalOpen() {
        setIsCreateModalOpen(true);
    }

    function handleCreateModalClose() {
        setIsCreateModalOpen(false);
    }

    function handleOpenEditSale(sale) {
        setSelectedSale(sale);
        setIsModalOpen(true);
    }
    function handleOpenDeleteSale(sale) {
        setSelectedSale(sale);
        setIsDeleteModalOpen(true);
    }

    function handleCloseEditSale(sale) {
        setSelectedSale(null);
        setIsModalOpen(false);
    }
    function handleCloseDeleteSale(sale) {
        setSelectedSale(null);
        setIsDeleteModalOpen(false);
    }
    function handleDeleteSale(sale) {
        const updatedSales = sales.filter((p) => p.saleId !== sale.saleId);
        setSales(updatedSales);
        refreshSaleList();
    }

    const refreshSaleList = () => {
        getSales(pageNumber, pageSize);
    };


    //Moment.locale('en');
    let tableData = null;

    if (sales.length > 0) {
        tableData = sales.map(sale => (
            <Table.Row key={sale.saleId}>
                <Table.Cell>{sale.customerName}</Table.Cell>
                <Table.Cell>{sale.productName}</Table.Cell>
                <Table.Cell>{sale.storeAddress}</Table.Cell>
                <Table.Cell>{moment(sale.dateSold).format('YYYY-MM-DD')}</Table.Cell>
                <Table.Cell width={2}>
                    <Button className="edit-btn yellow"
                        name="edit outline"
                        onClick={() => handleOpenEditSale(sale)}
                    ><Icon name='edit'></Icon> Edit</Button>

                </Table.Cell>
                <Table.Cell width={2}>
                    <Button className="delete-btn red"
                        name="delete"
                        onClick={() => handleOpenDeleteSale(sale)}
                    ><Icon name='trash alternate'></Icon>Delete</Button>
                </Table.Cell>
            </Table.Row>
        ));
    }

    return (

        <Segment>
            <Button primary onClick={handleCreateModalOpen}>Create Sale</Button>

            <Table celled selectable>
                <Table.Header>
                    <Table.Row >
                        <Table.HeaderCell className="two wide">Customer</Table.HeaderCell>
                        <Table.HeaderCell className="two wide">Product</Table.HeaderCell>
                        <Table.HeaderCell className="two wide">Store</Table.HeaderCell>
                        <Table.HeaderCell className="two wide">Date Sold</Table.HeaderCell>
                        <Table.HeaderCell className="two wide">Actions</Table.HeaderCell>
                        <Table.HeaderCell className="two wide">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{tableData}</Table.Body>
            </Table>
            {selectedSale && (
                <EditSale
                    trigger={handleOpenEditSale}
                    sale={selectedSale}
                    onClose={handleCloseEditSale}
                    open={isModalOpen}
                    onUpdate={handleUpdateSale}
                />
            )}
            {isCreateModalOpen && (
                <CreateSale
                    trigger={handleCreateModalOpen}
                    onClose={handleCreateModalClose}
                    onCreate={handleCreateSale}
                    open={isCreateModalOpen}
                />
            )}

            {selectedSale && (
                <DeleteSale
                    trigger={handleOpenDeleteSale}
                    sale={selectedSale}
                    onClose={handleCloseDeleteSale}
                    open={isDeleteModalOpen}
                    onDelete={handleDeleteSale}
                />
            )}
            <div className="pagination">

                <Button icon labelPosition='left' disabled={pageNumber === 1} onClick={handlePreviousPage}>
                    <Icon name='left arrow' />
                    Previous
                </Button>

                <Button icon labelPosition='right' disabled={sales.length < pageSize} onClick={handleNextPage}>
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
export default SaleTable;




