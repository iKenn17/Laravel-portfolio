<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_access_project_management(): void
    {
        $response = $this->get(route('projects.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_view_project_management(): void
    {
        $user = User::factory()->create();
        Project::create([
            'title' => 'Test Project',
            'description' => 'Test Description',
            'technologies' => 'Laravel, React',
            'project_date' => '2026-01-01',
        ]);

        $response = $this->actingAs($user)->get(route('projects.index'));

        $response->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Manage/Projects/Index')
                ->has('projects', 1)
            );
    }

    public function test_authenticated_user_can_create_project(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('projects.store'), [
            'title' => 'New Showcase',
            'description' => 'Built with Laravel and Inertia React',
            'technologies' => 'Laravel, Inertia, React',
            'project_date' => '2026-03-01',
        ]);

        $response->assertRedirect(route('projects.index'));
        $this->assertDatabaseHas('projects', [
            'title' => 'New Showcase',
        ]);
    }

    public function test_authenticated_user_can_update_project(): void
    {
        $user = User::factory()->create();
        $project = Project::create([
            'title' => 'Old Title',
            'description' => 'Old Description',
            'technologies' => 'PHP',
            'project_date' => '2026-01-01',
        ]);

        $response = $this->actingAs($user)->put(route('projects.update', $project), [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'technologies' => 'React, Inertia',
            'project_date' => '2026-02-01',
        ]);

        $response->assertRedirect(route('projects.index'));
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'title' => 'Updated Title',
        ]);
    }

    public function test_authenticated_user_can_delete_project(): void
    {
        $user = User::factory()->create();
        $project = Project::create([
            'title' => 'To Delete',
            'description' => 'Will be removed',
            'technologies' => 'None',
        ]);

        $response = $this->actingAs($user)->delete(route('projects.destroy', $project));

        $response->assertRedirect(route('projects.index'));
        $this->assertDatabaseMissing('projects', [
            'id' => $project->id,
        ]);
    }
}
