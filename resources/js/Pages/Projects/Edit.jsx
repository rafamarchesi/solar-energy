import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Importando SweetAlert2
import ClientModal from '../Clients/ClientModal';  // Importando o modal de cliente

export default function Edit({ auth, ufs = [], equipaments = [], project }) {
    const [description, setDescription] = useState(project?.description || '');
    const [uf_id, setUfId] = useState(project?.uf_id || '');
    const [selectedEquipament, setSelectedEquipament] = useState(project?.equipaments?.map(equip => equip.id) || []);
    const [selectedClient, setSelectedClient] = useState(project?.client || null);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (project) {
            setDescription(project.description || '');
            setUfId(project.uf_id || '');
            setSelectedEquipament(project.equipaments?.map(equip => equip.id) || []);
            setSelectedClient(project.client || null);
        }
    }, [project]);

    const handleEquipamentChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedEquipament(prevSelected =>
            prevSelected.includes(value)
                ? prevSelected.filter(item => item !== value)
                : [...prevSelected, value]
        );
    };

    const validateForm = () => {
        const newErrors = {};

        if (!description) newErrors.description = 'Descrição é obrigatória';
        if (!uf_id) newErrors.uf_id = 'UF é obrigatória';
        if (selectedEquipament.length === 0) newErrors.equipaments = 'Pelo menos um equipamento deve ser selecionado';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.put(`/projects/${project.id}`, {
                description,
                uf_id,
                equipaments: selectedEquipament,
                client_id: selectedClient?.id || null,
                client_name: selectedClient?.name || ''
            });

            Swal.fire({
                title: 'Sucesso!',
                text: 'Projeto atualizado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/dashboard';  // Redirecionar para o dashboard
            });

        } catch (error) {
            console.error('Erro ao atualizar o projeto', error.response?.data);
            if (error.response?.data) {
                setErrors(error.response.data.errors || {});
            }
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSelectClient = (client) => {
        setSelectedClient(client);
        handleCloseModal();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Projeto</h2>}
        >
            <Head title="Editar Projeto" />

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
                                <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
                                    Selecionar Cliente
                                </button>
                                {selectedClient ? (
                                    <p>Cliente Selecionado: {selectedClient.name}</p>
                                ) : (
                                    <p>Nenhum cliente selecionado</p>
                                )}
                                {errors.client && <div className="text-danger">{errors.client}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Equipamentos</label>
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
                                    <strong>Equipamentos Selecionados:</strong>
                                    <ul>
                                        {selectedEquipament.map(equipament => (
                                            <li key={equipament}>
                                                {equipaments.find(option => option.id === equipament)?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Salvar Alterações</button>

                            {/* Modal para Seleção de Cliente */}
                            <ClientModal
                                show={showModal}
                                onHide={handleCloseModal}
                                onSelectClient={handleSelectClient}
                                selectedClient={selectedClient}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
