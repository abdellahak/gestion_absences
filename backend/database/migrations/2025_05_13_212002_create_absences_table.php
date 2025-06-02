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
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('stagiaire_id');
            $table->unsignedBigInteger('formateur_id')->nullable();
            $table->date('date_absence');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->foreign('stagiaire_id')->references('id')->on('stagiaires')->onDelete('cascade');
            $table->foreign('formateur_id')->references('id')->on('formateurs')->onDelete('cascade');
            $table->unsignedBigInteger('justification_id')->nullable();
            $table->foreign('justification_id')->references('id')->on('justifications')->onDelete('set null');
            $table->unique(['date_absence', 'heure_debut', 'stagiaire_id'], 'unique_absence_per_stagiaire');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absences');
    }
};
