<?php

namespace App\Services\Subjects;

abstract class SubjectManager
{
    protected $subjects = [
        'toan' => 'Toán',
        'ngu_van' => 'Ngữ Văn',
        'ngoai_ngu' => 'Ngoại Ngữ',
        'vat_li' => 'Vật Lý',
        'hoa_hoc' => 'Hóa Học',
        'sinh_hoc' => 'Sinh Học',
        'lich_su' => 'Lịch Sử',
        'dia_li' => 'Địa Lý',
        'gdcd' => 'Giáo Dục Công Dân',
    ];

    // Phương thức lấy tên hiển thị của subject
    public function getSubjectName(string $key): string
    {
        return $this->subjects[$key] ?? ucfirst($key); 
    }

    public function getSubjects() : array 
    {
        return array_keys($this->subjects);
    }

    // Phương thức phân loại level dựa trên điểm số
    public function calculateLevel(float $score): string
    {
        if ($score >= 8) {
            return '>=8';
        } elseif ($score >= 6) {
            return '6-8';
        } elseif ($score >= 4) {
            return '4-6';
        } else {
            return '<4';
        }
    }

    // Phương thức abstract: Subclass phải implement để trả về danh sách subjects cho group cụ thể
    abstract public function getGroupSubjects(string $group): array;

    // Phương thức chung để thống kê levels cho một subject (sử dụng trong report)
    public function getStatsForSubject(string $subject): array
    {
        // Sử dụng Eloquent để query (giả sử dùng trong controller, nhưng demo logic OOP)
        $levels = \App\Models\Score::selectRaw("
            SUM(CASE WHEN $subject >= 8 THEN 1 ELSE 0 END) as ge8,
            SUM(CASE WHEN $subject < 8 AND $subject >= 6 THEN 1 ELSE 0 END) as six_to_eight,
            SUM(CASE WHEN $subject < 6 AND $subject >= 4 THEN 1 ELSE 0 END) as four_to_six,
            SUM(CASE WHEN $subject < 4 THEN 1 ELSE 0 END) as lt4
        ")->first();

        return [
            '>=8' => $levels->ge8 ?? 0,
            '6-8' => $levels->six_to_eight ?? 0,
            '4-6' => $levels->four_to_six ?? 0,
            '<4' => $levels->lt4 ?? 0,
        ];
    }
}