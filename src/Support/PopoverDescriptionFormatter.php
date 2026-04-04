<?php

namespace JibayMcs\FilamentTour\Support;

class PopoverDescriptionFormatter
{
    public static function format(?string $description): ?string
    {
        if (blank($description)) {
            return null;
        }

        $paragraphs = collect(
            preg_split('/\n\s*\n+/u', str_replace(["\r\n", "\r"], "\n", $description)) ?: []
        )
            ->map(fn (string $paragraph): string => trim($paragraph))
            ->filter(fn (string $paragraph): bool => $paragraph !== '')
            ->map(function (string $paragraph): string {
                $paragraph = preg_replace('/\h*\n\h*/u', ' ', $paragraph) ?? $paragraph;
                $paragraph = preg_replace('/[^\S\n]+/u', ' ', $paragraph) ?? $paragraph;

                return '<p>'.e(trim($paragraph)).'</p>';
            })
            ->values();

        if ($paragraphs->isEmpty()) {
            return null;
        }

        return $paragraphs->implode('');
    }
}
