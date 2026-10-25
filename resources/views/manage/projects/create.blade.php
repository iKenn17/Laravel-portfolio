@extends('layouts.portfolio')

@section('content')
<div class="bg-neutral-900 min-h-screen text-white">
    <div class="w-[90%] lg:w-[50%] mx-auto py-10">
        <h1 class="text-xl font-semibold mb-6">Add Project</h1>
        <form method="POST" action="{{ route('projects.store') }}" enctype="multipart/form-data">
            @include('manage.projects._form')
        </form>
    </div>
</div>
@endsection