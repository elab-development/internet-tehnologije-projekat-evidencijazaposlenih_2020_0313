<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('firstName')->after('id');
            $table->string('lastName')->after('firstName');
            $table->string('title')->nullable();
            $table->text('biography')->nullable();
            $table->text('note')->nullable();
            $table->unsignedBigInteger('department_id');
            $table->foreign('department_id')->references('id')->on('departments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropColumn('department_id');
            $table->dropColumn('note');
            $table->dropColumn('biography');
            $table->dropColumn('title');
            $table->dropColumn('lastName');
            $table->dropColumn('firstName');
        });
    }
};
