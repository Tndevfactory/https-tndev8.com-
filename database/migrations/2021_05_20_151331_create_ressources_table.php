<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRessourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ressources', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('etat_civil')->nullable();
            $table->string('nb_enfant')->nullable();
            $table->date('dob')->nullable();
            $table->integer('nb_enfants')->nullable();
            $table->integer('num_cnss')->nullable();
            $table->integer('type_contrat')->nullable();
            $table->date('date_recrutement')->nullable();
            $table->date('date_titularisation')->nullable();
            $table->date('date_licenciement')->nullable();
            $table->integer('actif')->nullable();
            $table->integer('validator_id')->nullable();
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
        Schema::dropIfExists('ressources');
    }
}
