<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class ScoreSeeder extends Seeder
{
    const SEEDING_FLAG = 'scores_seeded';
    const BATCH_SIZE = 1000;

    public function run(): void
    {
        // Check if seeding_flags table exists
        if (!Schema::hasTable('seeding_flags')) {
            throw new \Exception('Bảng seeding_flags chưa tồn tại. Hãy chạy migration trước.');
        }

        // Check if already seeded
        $flag = DB::table('seeding_flags')->where('flag', self::SEEDING_FLAG)->first();
        if ($flag && $flag->seeded_at !== null) {
            $this->command->info('Scores have already been seeded. Skipping.');
            return;
        }

        // Create flag if not exists
        if (!$flag) {
            DB::table('seeding_flags')->insert([
                'flag' => self::SEEDING_FLAG,
                'seeded_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Take note of already imported rows
        $importedCount = DB::table('scores')->count();
        $this->command->info("Đã import {$importedCount} dòng trước đó. Tiếp tục từ dòng " . ($importedCount + 1) . ".");

        $filePath = base_path('database/seeders/data/diem_thi_thpt_2024.csv');
        if (!file_exists($filePath)) {
            throw new \Exception('CSV file not found at ' . $filePath);
        }

        $file = fopen($filePath, 'r');
        if (!$file) {
            throw new \Exception('Không thể mở file CSV.');
        }

        // Read header
        $header = fgetcsv($file);
        if (!$header) {
            fclose($file);
            throw new \Exception('File CSV rỗng hoặc lỗi.');
        }

        // Skip already imported rows
        for ($i = 0; $i < $importedCount; $i++) {
            if (fgetcsv($file) === false) {
                $this->markAsSeeded();
                fclose($file);
                return;
            }
        }

        // Import in batches
        $batch = [];
        while ($row = fgetcsv($file)) {
            $data = array_combine($header, $row);
            if ($data === false) {
                $this->command->warn('Dòng dữ liệu không hợp lệ, bỏ qua.');
                continue;
            }

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

            $batch[] = $cleanData;

            if (count($batch) >= self::BATCH_SIZE) {
                DB::table('scores')->insert($batch);
                $batch = [];
                $importedCount += self::BATCH_SIZE;
                $this->command->info("Đã import thêm " . self::BATCH_SIZE . " dòng. Tổng: {$importedCount}.");
            }
        }

        // Insert any remaining rows
        if (!empty($batch)) {
            DB::table('scores')->insert($batch);
            $this->command->info("Đã import thêm " . count($batch) . " dòng cuối cùng.");
        }

        fclose($file);
        $this->markAsSeeded();
    }

    private function markAsSeeded(): void
    {
        DB::table('seeding_flags')
            ->where('flag', self::SEEDING_FLAG)
            ->update(['seeded_at' => now(), 'updated_at' => now()]);
        $this->command->info('Scores seeded successfully.');
    }

    private function cleanScore(string $score): ?float
    {
        $score = trim($score);
        return $score === '' ? null : (float) str_replace(',', '.', $score);
    }
}