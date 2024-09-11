import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';  // Importe o SweetAlert2
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../../../css/modal.css';

export default function ClientModal({ show, onHide, onSelectClient }) {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedClients, setSelectedClients] = useState(new Set());
    const CLIENTS_PER_PAGE = 5;

    useEffect(() => {
        if (show) {
            axios.get('/clients')
                .then(response => {
                    setClients(response.data);
                })
                .catch(error => {
                    console.error('Erro ao buscar clientes:', error);
                });
        }
    }, [show]);

    useEffect(() => {
        const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name));
        const filtered = sortedClients.filter(client =>
            client.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const startIndex = (currentPage - 1) * CLIENTS_PER_PAGE;
        const paginatedClients = filtered.slice(startIndex, startIndex + CLIENTS_PER_PAGE);
        setFilteredClients(paginatedClients);
    }, [searchQuery, currentPage, clients]);

    const totalPages = Math.ceil(clients.length / CLIENTS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDeleteClient = (client) => {
        setSelectedClient(client);
        Swal.fire({
            title: 'Você tem certeza?',
            text: `Deseja excluir o cliente ${client.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/clients/${client.id}`)
                    .then(() => {
                        setClients(clients.filter(c => c.id !== client.id));
                        Swal.fire(
                            'Excluído!',
                            'O cliente foi excluído com sucesso.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Erro ao excluir o cliente:', error);
                        Swal.fire(
                            'Erro!',
                            'Ocorreu um erro ao excluir o cliente.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleCheckboxChange = (client) => {
        setSelectedClients(new Set([client.id]));
        onSelectClient(client);
        onHide();
    };

    return (
        <>
            <Modal show={show} onHide={onHide} dialogClassName="custom-modal" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Selecionar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Buscar cliente..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-3"
                    />
                    <Button
                        variant="primary"
                        onClick={() => window.location.href = '/clients/create'}
                        className="mb-3"
                    >
                        Criar Cliente
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.length ? (
                                filteredClients.map(client => (
                                    <tr key={client.id}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                checked={selectedClients.has(client.id)}
                                                onChange={() => handleCheckboxChange(client)}
                                            />
                                        </td>
                                        <td>{client.id}</td>
                                        <td>{client.name}</td>
                                        <td>
                                            <Button
                                                variant="link"
                                                onClick={() => window.location.href = `/clients/${client.id}/edit`}
                                                className="mr-2"
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                variant="link"
                                                onClick={() => handleDeleteClient(client)}
                                                className="btn-icon"
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Nenhum cliente encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    {clients.length > CLIENTS_PER_PAGE && (
                        <div className="d-flex justify-content-between mt-3">
                            <Button
                                variant="secondary"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </Button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <Button
                                variant="secondary"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Próximo
                            </Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
