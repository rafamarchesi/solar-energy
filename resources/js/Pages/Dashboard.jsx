import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Head, Link } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Dashboard({ auth }) {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const PROJECTS_PER_PAGE = 10;

    useEffect(() => {
        axios.get(route('projects.index'))
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the projects!", error);
            });
    }, []);

    // Paginação
    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const currentProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

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

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter esta ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(route('projects.destroy', id))
                    .then(response => {
                        setProjects(projects.filter(project => project.id !== id));
                        Swal.fire(
                            'Deletado!',
                            'O projeto foi excluído com sucesso.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error("There was an error deleting the project!", error);
                        Swal.fire(
                            'Erro!',
                            'Houve um erro ao excluir o projeto.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="d-flex justify-between">
                            <div className="p-6 text-gray-900">
                                Olá, {auth.user.name}!
                            </div>
                            <div className="p-6">
                                <Link
                                    href={route('projects.create')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 no-underline"
                                >
                                    Novo Projeto
                                </Link>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Projetos</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Descrição</th>
                                        <th>Data de Criação</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProjects.length ? (
                                        currentProjects.map(project => (
                                            <tr key={project.id}>
                                                <td>{project.id}</td>

                                                <td>{project.description}</td>
                                                <td>{new Date(project.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <Button
                                                        variant="link"
                                                        onClick={() => window.location.href = `/projects/${project.id}/edit`}
                                                        className="mr-2"
                                                    >
                                                        <FaEdit />
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        onClick={() => handleDelete(project.id)}
                                                        className="btn-icon text-danger"
                                                    >
                                                        <FaTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">Nenhum projeto encontrado.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Paginação */}
                            {projects.length > PROJECTS_PER_PAGE && (
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
