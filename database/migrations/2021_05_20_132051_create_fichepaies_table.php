<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFichepaiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fichepaies', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->integer('mois')->unsigned();
            $table->float('work_time',8,2)->nullable();
            $table->float('prime_anciennete',8,3)->nullable();
            $table->float('indemnite_transport',8,3)->nullable();
            $table->float('prime_rendement',8,3)->nullable();
            $table->float('gratification',8,3)->nullable();
            $table->float('conge',8,3)->nullable();
            $table->float('ticket_resto',8,3)->nullable();
            $table->float('cnss',8,3)->nullable();
            $table->float('irpp',8,3)->nullable();
            $table->float('salaire_net',20,3)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fichepaies');
    }
}
