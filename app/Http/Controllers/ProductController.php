<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
            
        
         if($request->item == ''){
           // recherche globale 
           return Product::all()->toArray();
            

        }else{

             // recherche ciblée reduite s
               $items= DB::table('products')
                ->where('price', 'LIKE', '%'.$request->item.'%')
                ->orWhere('description', 'LIKE', '%'.$request->item.'%')
                ->orderBy( $request->criteria1 ?? 'created_at', $request->sort1 ?? 'DESC')
                ->orderBy( $request->criteria2 ?? 'created_at', $request->sort2 ?? 'DESC')
                ->get()->toArray();

                if($items){
                    return $items;
                }else{
                      return response(['success'=> 'not found']);
                }

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
        $request->validate([
            'description'=>'required',
            'price'=>'numeric|required',
        ]);

        $rec = Product::create($request->all());
            if($rec->exists){
                return response(['success'=> 'created with success']);
            }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       
        $res = collect(Product::find($id));

     
        if(count($res) <= 0){
        return response(['success'=> 'no -----------------product found']);
        }
        return response($res);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
          $request->validate([
            'description'=>'required',
            'price'=>'numeric|required',
        ]);

       $rec = $product->update($request->all());
            if($rec){
                return response(['success'=> 'updated with success']);
            } 
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
          $del= $product->delete();
           if($del){
                return response(['success'=> 'deleted with success']);
            } 
    }
}
