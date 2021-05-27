<?php

namespace App\Http\Controllers;

use PDF;
use App\Models\User;
use App\Models\Fichepaie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FichepaieController extends Controller
{

// Generate PDF
    public function createPDF() {
      // retreive all records from db
      $data = collect(User::all());
     view()->share('users',$data);
      $pdf = PDF::loadView('fiche_paie_pdf', $data);
//save to disk
    //   Storage::put('public/pdf/invoice.pdf', $pdf->output());

//save to disk2
      $path = public_path('pdfpublic');
      $fileName =  'hfaied202105' . '.' . 'pdf' ;
      $pdf->save($path . '/' . $fileName);
//dd( $pdf);
      // download PDF file with download method
      return $pdf->download('pdf_file.pdf');
    }


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
    public function downloadFile($year, $month, $id)
    {
        $user=User::find($id);

        if($user){
          $role=$user->roles->first()->name;

        $directory = $user->nom.'-'.$id;
        
        $fichePaie=$year. $month.'.pdf';
        
        $location = public_path('uploads/users/'.$role. '/'. $directory .'/'.$fichePaie);
       
        
        $filename = $fichePaie;
       
        $headers =[
        'Content-Description' => 'File Transfer',
        'Content-Type' => 'application/pdf',
        ];

        return response()->download($location, $filename, $headers);
        }else{
             return response(['success'=> 'user not found']);
        }

        
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
