<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddKehamilanFieldsToTblTriaseIgd extends Migration
{
    /**
     * Sesuaikan $table dengan nama tabel triase IGD di database SIMRS Anda.
     */
    protected $table = 'tbl_triase_igd';

    public function up()
    {
        Schema::table($this->table, function (Blueprint $table) {
            $table->tinyInteger('status_hamil')->default(0)->comment('0=tidak, 1=hamil')->after('hasil_triase_total');
            $table->tinyInteger('gravida')->nullable()->comment('Hamil ke-')->after('status_hamil');
            $table->tinyInteger('para')->nullable()->comment('Jumlah persalinan')->after('gravida');
            $table->tinyInteger('abortus')->nullable()->comment('Jumlah keguguran')->after('para');
            $table->tinyInteger('usia_kehamilan_minggu')->nullable()->comment('Usia kehamilan dalam minggu')->after('abortus');
            $table->date('hpl')->nullable()->comment('Hari Perkiraan Lahir')->after('usia_kehamilan_minggu');
        });
    }

    public function down()
    {
        Schema::table($this->table, function (Blueprint $table) {
            $table->dropColumn([
                'status_hamil',
                'gravida',
                'para',
                'abortus',
                'usia_kehamilan_minggu',
                'hpl',
            ]);
        });
    }
}
