<?php

namespace App\Exports;

use App\Models\Groupe;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Color;

class StagiairesTemplateExport implements FromArray, WithHeadings, WithStyles, WithColumnWidths
{
  public function array(): array
  {
    // Get available groupe codes from database (max 10 characters)
    $groupeCodes = Groupe::whereRaw('LENGTH(code) <= 10')->pluck('code')->toArray();
    $firstGroupeCode = count($groupeCodes) > 0 ? $groupeCodes[0] : 'CODE_GROUPE';
    $secondGroupeCode = count($groupeCodes) > 1 ? $groupeCodes[1] : $firstGroupeCode;

    return [
      [
        'Jean',
        'Dupont',
        'ST2025001',
        $firstGroupeCode,
        'jean.dupont@example.com',
        '0612345678',
        'AB123456',
        'Homme',
        '1995-05-15',
        'Casablanca',
        '123 Rue de la Paix, Casablanca'
      ],
      [
        'Marie',
        'Martin',
        'ST2025002',
        $secondGroupeCode,
        'marie.martin@example.com',
        '0623456789',
        'CD789012',
        'Femme',
        '1996-08-22',
        'Rabat',
        '456 Avenue Mohammed V, Rabat'
      ]
    ];
  }

  public function headings(): array
  {
    return [
      'nom',
      'prenom',
      'numero_inscription',
      'code_groupe',
      'email',
      'telephone',
      'cin',
      'sexe',
      'date_naissance',
      'lieu_naissance',
      'adresse'
    ];
  }

  public function columnWidths(): array
  {
    return [
      'A' => 15, // nom
      'B' => 15, // prenom
      'C' => 20, // numero_inscription
      'D' => 15, // code_groupe
      'E' => 25, // email
      'F' => 15, // telephone
      'G' => 12, // cin
      'H' => 10, // sexe
      'I' => 15, // date_naissance
      'J' => 20, // lieu_naissance
      'K' => 30, // adresse
    ];
  }

  public function styles(Worksheet $sheet)
  {
    return [
      // Style for header row
      1 => [
        'font' => [
          'bold' => true,
          'color' => ['argb' => Color::COLOR_WHITE],
        ],
        'fill' => [
          'fillType' => Fill::FILL_SOLID,
          'startColor' => ['argb' => '4F46E5'],
        ],
      ],
      // Style for example rows
      2 => [
        'fill' => [
          'fillType' => Fill::FILL_SOLID,
          'startColor' => ['argb' => 'F3F4F6'],
        ],
      ],
      3 => [
        'fill' => [
          'fillType' => Fill::FILL_SOLID,
          'startColor' => ['argb' => 'F3F4F6'],
        ],
      ],
    ];
  }
}
