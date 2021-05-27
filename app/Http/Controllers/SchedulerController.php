<?php

namespace App\Http\Controllers;

use App\Models\Scheduler;
use Illuminate\Http\Request;

class SchedulerController extends Controller
{


  public function testSchedule()
  {
  
    return response([
      "user" => 'method run every minute ',
      "time" => Carbon::now(),
     
    ]);
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
     * @param  \App\Models\Scheduler  $scheduler
     * @return \Illuminate\Http\Response
     */
    public function show(Scheduler $scheduler)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Scheduler  $scheduler
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Scheduler $scheduler)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Scheduler  $scheduler
     * @return \Illuminate\Http\Response
     */
    public function destroy(Scheduler $scheduler)
    {
        //
    }
}
