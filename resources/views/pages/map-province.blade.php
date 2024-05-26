@extends('index')

@section('title', 'Peta Provinsi')

@section('content')
    <div id="map-province">
        <div class="container p-4">
            <div id="map"></div>
            <div id="controls-province">
                <input type="checkbox" id="showPolygonProvince" name="displayOption" value="polygonProvince" checked>
                <label for="showPolygonProvince">Batas Provinsi</label>
                <br>
                <input type="checkbox" id="showWaterSource" name="displayOption" value="water">
                <span class="legend-circle water"></span>
                <label for="showWaterSource">Sumber Mata Air</label>
                <br>
                <input type="checkbox" id="showReservoirs" name="displayOption" value="reservoirs">
                <span class="legend-circle reservoirs"></span>
                <label for="showReservoirs">Bendungan</label>
                <br>
                <input type="checkbox" id="showDams" name="displayOption" value="dams">
                <span class="legend-circle dams"></span>
                <label for="showDams">DAM</label>
                <br>
                <input type="checkbox" id="showStationWaterQuality" name="displayOption" value="waterQuality">
                <span class="legend-circle water-quality"></span>
                <label for="showStationWaterQuality">Stasiun Kualitas Air</label>
                <br>
                <input type="checkbox" id="showWaterDrinkSystem" name="displayOption" value="waterDrink">
                <span class="legend-circle water-drink"></span>
                <label for="showWaterDrinkSystem">Sistem Penyediaan Air Minum</label>
            </div>
        </div>
    </div>

@endsection

