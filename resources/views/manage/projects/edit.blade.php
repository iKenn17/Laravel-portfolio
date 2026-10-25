@extends('layouts.portfolio')

@section('content')
<div class="bg-neutral-900 min-h-screen text-white">
    <div class="w-[90%] lg:w-[50%] mx-auto py-10">
        <h1 class="text-xl font-semibold mb-6">Edit Project</h1>
        <form method="POST" action="{{ route('projects.update', $project) }}" enctype="multipart/form-data">
            @method('PUT')
            @include('manage.projects._form')
        </form>
    </div>
</div>
@endsection