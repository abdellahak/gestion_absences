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
        Schema::create('justifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('surveillant_general_id')->nullable();
            $table->string('intitule');
            $table->string('document')->nullable();
            $table->unsignedBigInteger('stagiaire_id')->nullable();
            $table->foreign('stagiaire_id')->references('id')->on('stagiaires')->onDelete('cascade');
            $table->enum('status', ['en_attente', 'valide', 'refuse'])->default('en_attente');
            $table->foreign('surveillant_general_id')->references('id')->on('surveillant_generals')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('justifications');
    }
};
