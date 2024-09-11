<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Uf extends Model
{
    // Nome da tabela associada ao modelo
    protected $table = 'ufs';

    // Campos que podem ser preenchidos em massa
    protected $fillable = ['uf'];

    // Caso a chave primária tenha um nome diferente de 'id', defina-o
    // protected $primaryKey = 'your_primary_key_name';

    // Caso a chave primária não seja auto-incremental, defina como false
    // public $incrementing = false;

    // Defina o tipo da chave primária, se necessário (por padrão, 'integer')
    // protected $keyType = 'string';
}
