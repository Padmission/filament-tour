<?php

use Illuminate\Support\HtmlString;
use JibayMcs\FilamentTour\Support\PopoverDescriptionFormatter;
use JibayMcs\FilamentTour\Tour\Step;

it('returns null for blank descriptions', function () {
    expect(PopoverDescriptionFormatter::format(null))->toBeNull()
        ->and(PopoverDescriptionFormatter::format(''))->toBeNull()
        ->and(PopoverDescriptionFormatter::format(" \n\t "))->toBeNull();
});

it('formats a single paragraph as safe html', function () {
    expect(PopoverDescriptionFormatter::format('Welcome to the tour.'))
        ->toBe('<p>Welcome to the tour.</p>');
});

it('formats blank-line separated paragraphs and collapses single line breaks', function () {
    $description = "First sentence.\nSecond sentence.\n\nNew paragraph.";

    expect(PopoverDescriptionFormatter::format($description))
        ->toBe('<p>First sentence. Second sentence.</p><p>New paragraph.</p>');
});

it('escapes html tags in plain text descriptions', function () {
    expect(PopoverDescriptionFormatter::format('<script>alert("x")</script>'))
        ->toBe('<p>&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</p>');
});

it('preserves html string descriptions', function () {
    $step = Step::make()->title('Welcome')->description(new HtmlString('<strong>Trusted</strong>'));

    expect($step->getDescription())->toBe('<strong>Trusted</strong>');
});

it('preserves view descriptions', function () {
    $step = Step::make()->title('Welcome')->description(
        view('filament-tour::tour.step.popover.title', [
            'title' => 'View Content',
            'icon' => null,
            'iconColor' => null,
        ])
    );

    expect($step->getDescription())
        ->toContain('View Content')
        ->toContain('<div class="flex items-center">');
});
