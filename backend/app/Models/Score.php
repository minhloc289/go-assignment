<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    protected $table = 'scores';
    protected $primaryKey = 'sbd';
    public $incrementing = false; 
    protected $keyType = 'string';

    protected $fillable = [
        'sbd',
        'toan',
        'ngu_van',
        'ngoai_ngu',
        'vat_li',
        'hoa_hoc',
        'sinh_hoc',
        'lich_su',
        'dia_li',
        'gdcd',
        'ma_ngoai_ngu',
        'total_group_a',
    ];

    protected static function booted()
    {
        static::saving(function ($score) {
            $score->total_group_a =
                ($score->toan ?? 0) +
                ($score->vat_li ?? 0) +
                ($score->hoa_hoc ?? 0);
        });
    }
}
