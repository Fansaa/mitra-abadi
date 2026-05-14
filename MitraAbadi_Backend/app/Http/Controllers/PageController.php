<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Menampilkan halaman About Us (Tentang Mitra Abadi).
     */
    public function about()
    {
        return Inertia::render('About');
    }

    /**
     * Menampilkan halaman Contact (Hubungi Kami).
     */
    public function contact()
    {
        return Inertia::render('Contact');
    }
}
