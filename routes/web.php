<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MailController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('fiche_paie_pdf');
});
Route::get('fiche-paie-pdf', [MailController::class, 'fichePaie']);
Route::get('mass-fiche-paie-pdf', [MailController::class, 'massFichePaie']);
Route::post('simple-mail', [MailController::class, 'simpleMail'])->name('sendMail');
Route::get('mail-pdf', [MailController::class, 'SenderFichePaieFromPublic']);