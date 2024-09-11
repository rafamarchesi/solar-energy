import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function CreateClient() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        status: '',
        description: '',
        created_by: '1',
        updated_by: '1',
        project_id: '1',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.name || !data.email || !data.phone || !data.status) {
            Swal.fire({
                title: 'Erro!',
                text: 'Por favor, preencha todos os campos obrigatórios.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        post('/clients', {
            onSuccess: () => {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Cliente criado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    window.history.back();
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao criar o cliente.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Client</h2>}
        >
            <Head title="Create Client" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700">Nome Completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                    />
                                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                                </div>

                                {/* Email */}
                                <div className="mb-4 flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="email" className="block text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                        />
                                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                                    </div>

                                    {/* Phone */}
                                    <div className="flex-1">
                                        <label htmlFor="phone" className="block text-gray-700">Telefone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                        />
                                        {errors.phone && <div className="text-red-500">{errors.phone}</div>}
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="status" className="block text-gray-700">Status</label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                            required
                                        >
                                            <option value="">Selecione o status</option>
                                            <option value="1">Ativo</option>
                                            <option value="0">Inativo</option>
                                        </select>
                                        {errors.status && <div className="text-red-500">{errors.status}</div>}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-gray-700">Descrição</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                    ></textarea>
                                    {errors.description && <div className="text-red-500">{errors.description}</div>}
                                </div>

                                <input
                                    type="hidden"
                                    id="created_by"
                                    name="created_by"
                                    value={data.created_by}
                                />
                                <input
                                    type="hidden"
                                    id="updated_by"
                                    name="updated_by"
                                    value={data.updated_by}
                                />
                                <input
                                    type="hidden"
                                    id="project_id"
                                    name="project_id"
                                    value={data.project_id}
                                />

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Salvando...' : 'Salvar Cliente'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
