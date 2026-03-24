<?php

use App\Models\Setting;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Setting::query()->updateOrCreate(
            ['key' => 'credit_alert_days'],
            ['value' => 3]
        );
    }

    public function down(): void
    {
        Setting::query()->where('key', 'credit_alert_days')->delete();
    }
};
