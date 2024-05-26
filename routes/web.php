<?php

use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\TitikController;
use App\Models\Province;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('pages.map-province');
});

