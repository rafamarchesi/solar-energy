<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;


class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateClient');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:clients',
            'phone' => 'required|string|max:20',
            'status' => 'required|in:0,1',
            'description' => 'nullable|string'
        ]);

        Client::create($validatedData);

        return redirect()->route('clients.create')->with('success', 'Cliente criado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return Inertia::render('Clients/Show', [
            'client' => $client,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        return Inertia::render('Clients/Edit', [
            'client' => $client->toArray(), // Envia os dados do cliente para a página Inertia
        ]);
    }

    // Atualiza os dados do cliente no banco de dados
    public function update(Request $request, Client $client)
    {
        // Valida os dados da requisição
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'status' => 'required|boolean', // Certifique-se de que status é tratado como booleano
            'description' => 'nullable|string'

        ]);

        // Atualiza o cliente com os dados validados
        $client->update($validatedData);

        // Redireciona de volta para a página de edição com uma mensagem de sucesso
        return redirect()->route('clients.edit', $client->id)
                         ->with('success', 'Cliente atualizado com sucesso!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $client = Client::findOrFail($id);
            $client->delete();
            return response()->json(['message' => 'Cliente excluído com sucesso.'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao excluir cliente.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
