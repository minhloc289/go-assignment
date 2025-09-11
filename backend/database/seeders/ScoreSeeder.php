<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filePath = base_path('database/seeders/data/diem_thi_thpt_2024.csv');
        if (!file_exists($filePath)) {
            throw new \Exception('CSV file not found');
        }

        $file = fopen($filePath, 'r');
        $header = fgetcsv($file); 

        while ($row = fgetcsv($file)) {
            $data = array_combine($header, $row);

            $cleanData = [
                'sbd' => $data['sbd'] ?? null,
                'toan' => $this->cleanScore($data['toan'] ?? ''),
                'ngu_van' => $this->cleanScore($data['ngu_van'] ?? ''),
                'ngoai_ngu' => $this->cleanScore($data['ngoai_ngu'] ?? ''),
                'vat_li' => $this->cleanScore($data['vat_li'] ?? ''),
                'hoa_hoc' => $this->cleanScore($data['hoa_hoc'] ?? ''),
                'sinh_hoc' => $this->cleanScore($data['sinh_hoc'] ?? ''),
                'lich_su' => $this->cleanScore($data['lich_su'] ?? ''),
                'dia_li' => $this->cleanScore($data['dia_li'] ?? ''),
                'gdcd' => $this->cleanScore($data['gdcd'] ?? ''),
                'ma_ngoai_ngu' => $data['ma_ngoai_ngu'] ?? null,  
                'created_at' => now(),
                'updated_at' => now(),
            ];

            DB::table('scores')->insert($cleanData);
        }

        fclose($file);
    }

    private function cleanScore($value)
    {
        $value = trim($value);  
        if (empty($value) || !is_numeric(str_replace(',', '.', $value))) {
            return null;
        }
        return floatval(str_replace(',', '.', $value));
    }
    
}
