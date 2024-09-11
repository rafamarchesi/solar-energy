<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // Definir os campos que podem ser preenchidos via mass assignment
    protected $fillable = [
        'description',
        'location',
        'client_id',
        'uf_id'
    ];


    protected $casts = [
        'equipaments' => 'array',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function equipaments()
    {
        return $this->belongsToMany(Equipament::class, 'project_equipament');
    }

    public function uf()
    {
        return $this->belongsTo(Uf::class);
    }
}
