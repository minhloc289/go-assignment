<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('scores', function (Blueprint $table) {
            $table->float('total_group_a', 8, 2)
                ->storedAs('COALESCE(toan, 0) + COALESCE(vat_li, 0) + COALESCE(hoa_hoc, 0)')
                ->nullable()
                ->after('ma_ngoai_ngu');
        });

        Schema::table('scores', function (Blueprint $table) {
            $table->index('total_group_a');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('scores', function (Blueprint $table) {
            $table->dropIndex(['total_group_a']);
        });

        Schema::table('scores', function (Blueprint $table) {
            $table->dropColumn('total_group_a');
        });
    }
};
