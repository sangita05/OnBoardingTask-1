import React, { useState, useEffect } from 'react';
import { Table, Button, Icon, Segment, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import '../../custom.css';


const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        getProducts(pageNumber, pageSize)
            .then(response => {
                setProducts(response);
                setCurrentPage(pageNumber);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const getProducts = async (pageNumber, pageSize) => {
        const res = await axios.get(`https://localhost:7160/api/Products`, {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize
            }
        });
        return res.data;
    }
    //create product
    function handleCreateProduct(newProduct) {
        setProducts([...products, newProduct]);
        handleCreateModalClose();
        refreshProductList();
    }

    const refreshProductList = () => {
        getProducts(pageNumber, pageSize);
    };

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

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD'
        }).format(value);

    function handleCreateModalOpen() {
        console.log(isCreateModalOpen);
        setIsCreateModalOpen(true);
        console.log(isCreateModalOpen);
    }

    function handleCreateModalClose() {
        setIsCreateModalOpen(false);
    }


    //edit product
    function handleUpdateProduct(updatedProduct) {
        const updatedProducts = products.map((product) => {
            if (product.id === updatedProduct.id) {
                return updatedProduct;
            }
            return product;
        });
        setProducts(updatedProducts);
        setIsModalOpen(false);
    }

    function handleOpenEditProduct(product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }
    function handleOpenDeleteProduct(product) {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    }

    function handleCloseEditProduct(product) {
        setSelectedProduct(null);
        setIsModalOpen(false);
    }
    function handleCloseDeleteProduct(product) {
        setSelectedProduct(null);
        setIsDeleteModalOpen(false);
    }
    function handleDeleteProduct(product) {
        const updatedProducts = products.filter((p) => p.id !== product.id);
        setProducts(updatedProducts);
        refreshProductList();
    }



    let tableData = null;

    if (products.length > 0) {
        tableData = products.map(product => (
            <Table.Row key={product.id}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{numberFormat(product.price)}</Table.Cell>
                <Table.Cell width={2}>
                    <Button className="edit-btn yellow"
                        name="edit outline" onClick={() => handleOpenEditProduct(product)}
                    ><Icon name='edit'></Icon> Edit</Button>

                </Table.Cell>
                <Table.Cell width={2}>
                    <Button className="delete-btn red"
                        name="delete" onClick={() => handleOpenDeleteProduct(product)}
                    ><Icon name='trash alternate'></Icon>Delete</Button>
                </Table.Cell>
            </Table.Row>
        ));
    }


    return (

        <Segment>
            <Button primary onClick={handleCreateModalOpen}>Create Product</Button>

            <Table celled selectable>
                <Table.Header>
                    <Table.Row >
                        <Table.HeaderCell className="four wide">Name</Table.HeaderCell>
                        <Table.HeaderCell className="four wide">Price</Table.HeaderCell>
                        <Table.HeaderCell className="four wide">Actions</Table.HeaderCell>
                        <Table.HeaderCell className="four wide">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{tableData}</Table.Body>
            </Table>

            {isCreateModalOpen && (
                <CreateProduct
                    trigger={handleCreateModalOpen}
                    onClose={handleCreateModalClose}
                    onCreate={handleCreateProduct}
                    open={isCreateModalOpen}
                />
            )}
            {selectedProduct && (
                <EditProduct
                    trigger={handleOpenEditProduct}
                    product={selectedProduct}
                    onClose={handleCloseEditProduct}
                    open={isModalOpen}
                    onUpdate={handleUpdateProduct}
                />
            )}
            {selectedProduct && (
                <DeleteProduct
                    trigger={handleOpenDeleteProduct}
                    product={selectedProduct}
                    onClose={handleCloseDeleteProduct}
                    open={isDeleteModalOpen}
                    onDelete={handleDeleteProduct}
                />
            )}


            <div className="pagination">

                <Button icon labelPosition='left' disabled={pageNumber === 1} onClick={handlePreviousPage}>
                    <Icon name='left arrow' />
                    Previous
                </Button>

                <Button icon labelPosition='right' disabled={products.length < pageSize} onClick={handleNextPage}>
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

export default ProductTable;