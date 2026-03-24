<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Throwable;

class BarcodeController extends Controller
{
    public function show(Request $request): Response
    {
        $code = trim((string) $request->query('code', ''));

        if ($code === '') {
            return $this->fallbackResponse('Sin codigo');
        }

        $disk = Storage::disk(config('app.media_disc'));
        $path = 'sales/barcode-'.$this->normalizeCodeForPath($code).'.png';

        try {
            if (! $disk->exists($path)) {
                $disk->put($path, $this->generatePng($code));
            }

            return response($disk->get($path), 200, [
                'Content-Type' => 'image/png',
                'Content-Disposition' => 'inline; filename="'.$this->normalizeCodeForPath($code).'.png"',
                'Cache-Control' => 'public, max-age=86400',
            ]);
        } catch (Throwable $exception) {
            return $this->fallbackResponse($code);
        }
    }

    private function generatePng(string $code): string
    {
        $generator = new BarcodeGeneratorPNG();

        return $generator->getBarcode(
            $code,
            $generator::TYPE_CODE_128,
            3,
            60
        );
    }

    private function normalizeCodeForPath(string $code): string
    {
        return preg_replace('/[^A-Za-z0-9_-]/', '_', $code) ?: 'barcode';
    }

    private function fallbackResponse(string $message): Response
    {
        $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
        $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="260" height="70" viewBox="0 0 260 70">
    <rect width="260" height="70" fill="#ffffff"/>
    <rect x="1" y="1" width="258" height="68" rx="8" fill="none" stroke="#d1d5db"/>
    <text x="130" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#111827">{$safeMessage}</text>
</svg>
SVG;

        return response($svg, 200, [
            'Content-Type' => 'image/svg+xml',
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
        ]);
    }
}
