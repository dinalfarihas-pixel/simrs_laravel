<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLeopoldFieldsToTblTriaseIgd extends Migration
{
    protected $table = 'tbl_triase_igd';

    public function up()
    {
        Schema::table($this->table, function (Blueprint $table) {
            $table->decimal('leopold_tfu', 4, 1)->nullable()->comment('Tinggi Fundus Uteri dalam cm')->after('hpl');
            $table->string('leopold_i', 30)->nullable()->comment('Leopold I: kepala/bokong/tidak_teraba')->after('leopold_tfu');
            $table->string('leopold_ii_punggung', 10)->nullable()->comment('Leopold II letak punggung: kiri/kanan')->after('leopold_i');
            $table->string('leopold_ii_posisi', 20)->nullable()->comment('Leopold II posisi: anterior/posterior')->after('leopold_ii_punggung');
            $table->string('leopold_iii', 30)->nullable()->comment('Leopold III bagian terbawah: kepala/bokong/lintang')->after('leopold_ii_posisi');
            $table->tinyInteger('leopold_iii_masuk')->nullable()->comment('Leopold III masuk PAP: 1=sudah, 0=belum')->after('leopold_iii');
            $table->string('leopold_iv_metode', 20)->nullable()->comment('Leopold IV metode: konvergensi/perlimaan')->after('leopold_iii_masuk');
            $table->string('leopold_iv_konvergensi', 20)->nullable()->comment('Leopold IV konvergensi: konvergen/sejajar/divergen')->after('leopold_iv_metode');
            $table->tinyInteger('leopold_iv_perlimaan')->nullable()->comment('Leopold IV perlimaan: 0–5 (0/5 s/d 5/5)')->after('leopold_iv_konvergensi');
            $table->smallInteger('djj')->nullable()->comment('Detak Jantung Janin per menit')->after('leopold_iv_perlimaan');
            $table->tinyInteger('djj_reguler')->nullable()->comment('DJJ irama: 1=reguler, 0=ireguler')->after('djj');
        });
    }

    public function down()
    {
        Schema::table($this->table, function (Blueprint $table) {
            $table->dropColumn([
                'leopold_tfu',
                'leopold_i',
                'leopold_ii_punggung',
                'leopold_ii_posisi',
                'leopold_iii',
                'leopold_iii_masuk',
                'leopold_iv_metode',
                'leopold_iv_konvergensi',
                'leopold_iv_perlimaan',
                'djj',
                'djj_reguler',
            ]);
        });
    }
}
