<?php

return [
    'timeout_minutes' => (int) env('SESSION_INACTIVITY_TIMEOUT', 60),
    'refresh_interval_minutes' => (int) env('SESSION_ACTIVITY_REFRESH_INTERVAL', 1),
];
