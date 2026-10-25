@extends('layouts.portfolio')

@section('content')
    <div class="bg-neutral-900 min-h-screen">
        @include('partials.navbar')
        @include('partials.hero')
        <hr class="w-[85%] lg:w-[75%] mx-auto border-gray-600">
        @include('partials.about')
        <hr class="w-[85%] lg:w-[75%] mx-auto border-gray-600">
        @include('partials.education')
        <hr class="w-[85%] lg:w-[75%] mx-auto border-gray-600">
        @include('partials.skills')
        <hr class="w-[85%] lg:w-[75%] mx-auto border-gray-600">
        @include('partials.projects')
        <hr class="w-[85%] lg:w-[75%] mx-auto border-gray-600">
        @include('partials.contact')
        @include('partials.footer')
    </div>
@endsection