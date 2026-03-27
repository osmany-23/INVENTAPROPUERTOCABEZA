<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CreditSectionCollection extends ResourceCollection
{
    public function __construct($resource, private readonly array $meta = [], private readonly string $section = 'credits')
    {
        parent::__construct($resource);
    }

    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->values()->all(),
            'meta' => $this->meta,
            'section' => $this->section,
        ];
    }
}
