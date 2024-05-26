@extends('index')

@section('title', 'Peta Provinsi')

@section('content')
    <div id="map-province">
        <div class="container p-4">
            <div id="map"></div>
            <div id="controls-province">
                <input type="checkbox" id="showPolygonProvince" name="displayOption" value="polygonProvince" checked>
                <label for="showPolygonProvince">Tampilkan Batas Provinsi</label>
                <br>
                <input type="checkbox" id="showWaterSource" name="displayOption" value="water">
                <label for="showWaterSource">Sumber Mata Air</label>
                <br>
                <input type="checkbox" id="showReservoirs" name="displayOption" value="reservoirs">
                <label for="showReservoirs">Bendungan</label>
                <br>
                <input type="checkbox" id="showDams" name="displayOption" value="dams">
                <label for="showDams">DAM</label>
                <br>
                <input type="checkbox" id="showStationWaterQuality" name="displayOption" value="waterQuality">
                <label for="showStationWaterQuality">Stasiun Kualitas Air</label>
                <br>
                <input type="checkbox" id="showWaterDrinkSystem" name="displayOption" value="waterDrink">
                <label for="showWaterDrinkSystem">Sistem Air Minum (SPAM)</label>
            </div>
        </div>
    </div>

@endsection

