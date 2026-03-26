<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\State;
use Illuminate\Database\Seeder;

class DefaultCountriesSeeder extends Seeder
{
    public function run(): void
    {
        $countries = file_get_contents(storage_path('countries/countries.json'));
        $countries = json_decode($countries, true)['countries'];
        Country::upsert($countries, ['id'], ['name', 'short_code', 'phone_code']);

        $states = file_get_contents(storage_path('countries/states.json'));
        $states = json_decode($states, true)['states'];
        State::upsert($states, ['id'], ['country_id', 'name']);
    }
}
