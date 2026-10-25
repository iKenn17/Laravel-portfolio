<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['title', 'description', 'image', 'technologies', 'project_date'];

    protected function casts(): array
    {
        return [
            'project_date' => 'date',
        ];
    }
}
