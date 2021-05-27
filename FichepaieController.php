<?php

namespace App\Http\Controllers;

use App\Models\Fichepaie;
use Illuminate\Http\Request;

class FichepaieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    /**
     * download pdf file from public
     *
     * @return \Illuminate\Http\Response
     */
    public function downloadFile()
    {

       // /home/ch/Desktop/dev/https-soft-paie.vercel.app-/server/storage//uploads/users/employe/fahem/mars-2021.pd
        $location = public_path('uploads/users/employe/fahem/mars-2021.pdf');
        
        $filename = 'fiche-paie-mars2021.pdf';
       
        $headers =[
        'Content-Description' => 'File Transfer',
        'Content-Type' => 'application/pdf',
        ];

        return response()->download($location, $filename, $headers);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Fichepaie  $fichepaie
     * @return \Illuminate\Http\Response
     */
    public function show(Fichepaie $fichepaie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Fichepaie  $fichepaie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Fichepaie $fichepaie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Fichepaie  $fichepaie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Fichepaie $fichepaie)
    {
        //
    }
}
