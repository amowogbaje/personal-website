<?php

use Illuminate\Support\Facades\Schedule;

// One cron line (every minute) runs `schedule:run`, which triggers all of these.
Schedule::command('deliveries:run')->everyMinute()->withoutOverlapping(5);
Schedule::command('payments:reconcile')->everyFiveMinutes()->withoutOverlapping(10);
