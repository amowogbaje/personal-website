<?php

namespace App\Http\Middleware;

use App\Models\Platform;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticatePlatform
{
    public function handle(Request $request, Closure $next): Response
    {
        $key = $request->bearerToken() ?: $request->header('X-Api-Key');

        if (! $key) {
            return response()->json(['message' => 'Missing API key.'], 401);
        }

        $platform = Platform::where('api_key_hash', hash('sha256', $key))
            ->where('is_active', true)
            ->first();

        if (! $platform) {
            return response()->json(['message' => 'Invalid API key.'], 401);
        }

        $request->attributes->set('platform', $platform);

        return $next($request);
    }
}
