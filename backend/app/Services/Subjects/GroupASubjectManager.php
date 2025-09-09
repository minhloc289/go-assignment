<?php

namespace App\Services\Subjects;

class GroupASubjectManager extends SubjectManager
{
    public function getGroupSubjects(string $group): array
    {
        if (strtoupper($group) === 'A') {
            return ['toan', 'vat_li', 'hoa_hoc']; // Toán, Lý, Hóa
        }

        return [];
    }

    public function calculateGroupTotal(float $toan, float $vat_li, float $hoa_hoc): float
    {
        return $toan + $vat_li + $hoa_hoc;
    }
}