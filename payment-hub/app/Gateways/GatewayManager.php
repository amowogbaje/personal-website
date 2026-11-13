<?php

namespace App\Gateways;

use InvalidArgumentException;

class GatewayManager
{
    /** @return string[] */
    public function names(): array
    {
        return array_keys(config('gateways.drivers', []));
    }

    public function driver(?string $name = null): GatewayInterface
    {
        $name = $name ?: config('gateways.default');
        $config = config("gateways.drivers.$name");

        if (! $config) {
            throw new InvalidArgumentException("Unknown gateway [$name]");
        }

        return new $config['class']($config);
    }
}
