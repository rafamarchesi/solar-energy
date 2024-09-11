<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Uf;
use App\Models\Equipament;
use App\Models\Project;


class ProjectController extends Controller
{
    public function index()
    {
        try {
            $projects = Project::all();
            return response()->json($projects);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function create()
    {
        $ufs = Uf::all(['id', 'uf']);
        $equipaments = Equipament::all(['id', 'name']);

        return Inertia::render('Projects/Create', [
            'ufs' => $ufs,
            'equipaments' => $equipaments
        ]);
    }

    public function getStates()
    {
        $ufs = Uf::all(['id', 'uf']);
        return response()->json($ufs);
    }

    public function getEquipaments()
    {
        $equipaments = Equipament::all(['id', 'name']);
        return response()->json($equipaments);
    }

    public function store(Request $request)
    {

        $request->validate([
            'description' => 'required|string|max:255',
            'uf_id' => 'required|exists:ufs,id',
            'equipaments' => 'required|array',
            'client_id' => 'required|integer',
        ]);

        // Criação do projeto
        $project = Project::create([
            'description' => $request->description,
            'uf_id' => $request->uf_id,
            'client_id' => $request->client_id,
        ]);

        // Associa equipamentos ao projeto
        $project->equipaments()->sync($request->equipaments);

        return redirect()->route('projects.create')->with('success', 'Project created successfully!');
    }

    public function edit(Project $project)
    {
        $ufs = Uf::all();
        $equipaments = Equipament::all();

        return Inertia::render('Projects/Edit', [
            'project' => $project->toArray(),
            'ufs' => $ufs,
            'equipaments' => $equipaments,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'uf_id' => 'required|exists:ufs,id',
            'equipaments' => 'required|array',
            'equipaments.*' => 'exists:equipaments,id',
        ]);

        $project->update([
            'description' => $request->description,
            'uf_id' => $request->uf_id,
        ]);

        $project->equipaments()->sync($request->equipaments);

        return response()->json(['message' => 'Projeto atualizado com sucesso', 'project' => $project], 200);
    }


    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json(['message' => 'Projeto excluído com sucesso!']);
    }

}
