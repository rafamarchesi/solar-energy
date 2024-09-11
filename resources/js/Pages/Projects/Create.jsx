import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ClientModal from '../Clients/ClientModal';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Importando SweetAlert2

export default function CreateProject({ auth, ufs, equipaments }) {
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('');
    const [uf_id, setUfId] = useState('');
    const [selectedEquipament, setSelectedEquipament] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [errors, setErrors] = useState({});

    const handleEquipamentChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedEquipament(prevSelected =>
            prevSelected.includes(value)
                ? prevSelected.filter(item => item !== value)
                : [...prevSelected, value]
        );
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSelectClient = (client) => {
        setSelectedClient(client);
        handleCloseModal();
    };

    const validateForm = () => {
        const newErrors = {};

        if (!description) newErrors.description = 'Descrição é obrigatória';
        if (!uf_id) newErrors.uf_id = 'UF é obrigatória';
        if (selectedEquipament.length === 0) newErrors.equipaments = 'Pelo menos um equipament deve ser selecionado';
        if (!selectedClient) newErrors.client = 'Cliente é obrigatório';  // Validação para o cliente

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.post('/projects', {
                description,
                uf_id,
                equipaments: selectedEquipament,
                client_id: selectedClient?.id || null,
                client_name: selectedClient?.name || ''
            });

            // Mostrar SweetAlert2 e redirecionar para o dashboard
            Swal.fire({
                title: 'Sucesso!',
                text: 'Projeto criado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/dashboard';  // Redirecionar para o dashboard
            });

        } catch (error) {
            console.error('Erro ao criar o projeto', error.response?.data);
            if (error.response?.data) {
                setErrors(error.response.data.errors || {});
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Criar Novo Projeto</h2>}
        >
            <Head title="Criar Novo Projeto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descrição</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    id="description"
                                    placeholder="Descrição do projeto"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="uf_id" className="form-label">UF</label>
                                <select
                                    id="uf_id"
                                    className={`form-select ${errors.uf_id ? 'is-invalid' : ''}`}
                                    value={uf_id}
                                    onChange={(e) => setUfId(e.target.value)}
                                >
                                    <option value="">Selecione a UF</option>
                                    {ufs.map(uf => (
                                        <option key={uf.id} value={uf.id}>
                                            {uf.uf}
                                        </option>
                                    ))}
                                </select>
                                {errors.uf_id && <div className="invalid-feedback">{errors.uf_id}</div>}
                            </div>
                            <div className="mb-3 d-flex justify-between">
                                <Button onClick={handleOpenModal} variant="primary">
                                    Selecionar Cliente
                                </Button>
                                {selectedClient && <p>Cliente Selecionado: {selectedClient.name}</p>}
                                {errors.client && <div className="text-danger">{errors.client}</div>}  {/* Mensagem de erro para o cliente */}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Equipaments</label>
                                <div>
                                    {equipaments.map(option => (
                                        <div key={option.id} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`equip-${option.id}`}
                                                value={option.id}
                                                checked={selectedEquipament.includes(option.id)}
                                                onChange={handleEquipamentChange}
                                            />
                                            <label className="form-check-label" htmlFor={`equip-${option.id}`}>
                                                {option.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {errors.equipaments && <div className="text-danger">{errors.equipaments}</div>}

                                <div className="mt-2">
                                    <strong>Equipaments Selecionados:</strong>
                                    <ul>
                                        {selectedEquipament.map(equipament => (
                                            <li key={equipament}>
                                                {equipaments.find(option => option.id === equipament)?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Salvar Projeto</button>

                            {/* Modal para Seleção de Cliente */}
                            <ClientModal
                                show={showModal}
                                onHide={handleCloseModal}
                                onSelectClient={handleSelectClient}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
