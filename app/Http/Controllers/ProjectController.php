<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    private function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'technologies' => 'nullable|string|max:255',
            'project_date' => 'nullable|date',
            'image' => 'nullable|image|max:2048',
        ];
    }

    public function index(): Response
    {
        return Inertia::render('Manage/Projects/Index', [
            'projects' => Project::orderByDesc('project_date')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Manage/Projects/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        Project::create($data);

        return redirect()->route('projects.index')->with('success', 'Project added.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Manage/Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate($this->rules());

        if ($request->hasFile('image')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted.');
    }
}