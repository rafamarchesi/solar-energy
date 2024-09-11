<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'description',
        'due_date',
        'status',
        'image_path',
        'created_by',
        'update_by',
        'project_id',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
