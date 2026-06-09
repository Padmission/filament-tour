<?php

namespace JibayMcs\FilamentTour\Tour;

use Closure;
use Filament\Support\Concerns\EvaluatesClosures;
use Illuminate\Support\Facades\Lang;
use JibayMcs\FilamentTour\Tour\Traits\CanReadJson;

class Tour
{
    use CanReadJson;
    use EvaluatesClosures;

    private string $id;

    private array $steps = [];

    private ?string $route = null;

    private array $colors = [];

    private bool $alwaysShow = false;

    private bool $visible = true;

    private bool $uncloseable = false;

    private bool $confirmClose = false;

    private ?string $confirmCloseMessage = null;

    private ?string $redirectOnClose = null;

    private bool $disableEvents = false;

    private bool $ignoreRoutes = false;

    private string $nextButtonLabel;

    private string $previousButtonLabel;

    private string $doneButtonLabel;

    public function __construct(string $id, array $colors)
    {
        $this->id = $id;
        $this->colors = $colors;

        $this->nextButtonLabel = Lang::get('filament-tour::filament-tour.button.next');
        $this->previousButtonLabel = Lang::get('filament-tour::filament-tour.button.previous');
        $this->doneButtonLabel = Lang::get('filament-tour::filament-tour.button.done');
    }

    /**
     * Create the instance of your tour.
     * <br>
     * Define an **$id** to be able to call it later in a livewire event.
     */
    public static function make(...$params): static
    {
        $params = collect($params);

        switch ($params->keys()->map(fn ($key) => $key)->toArray()[0]) {
            case 'url':
            case 'json':
                return self::fromJson($params->first());
            default:
                return app(static::class,
                    [
                        'id' => $params->first(),
                        'colors' => [
                            'dark' => '#fff',
                            'light' => 'rgb(0,0,0)',
                        ],
                    ]);
        }
    }

    /**
     * Set the route where the tour will be shown.
     *
     * @return $this
     */
    public function route(string $route): self
    {
        $this->route = $route;

        return $this;
    }

    /**
     * Set the colors of your background highlighted elements, based on your current filament theme.
     * <br>
     *  - **rgb(0,0,0)** by default for **$light**
     * <br>
     * - **rgb(var(--gray-600))** by default for **$dark**
     *
     * @return $this
     */
    public function colors(string $light, string $dark): self
    {
        $this->colors = [
            'light' => $light,
            'dark' => $dark,
        ];

        return $this;
    }

    /**
     * Set the tour as always visible, even is already viewed by the user.
     *
     * @return $this
     */
    public function alwaysShow(bool|Closure $alwaysShow = true): self
    {
        $this->alwaysShow = $this->evaluate($alwaysShow);

        return $this;
    }

    /**
     * Set the tour as visible or not.
     *
     * @return $this
     */
    public function visible(bool|Closure $visible = true): self
    {
        $this->visible = $this->evaluate($visible);

        return $this;
    }

    /**
     * Set the tour steps uncloseable.
     *
     * @return $this
     */
    public function uncloseable(bool|Closure $uncloseable = true): self
    {
        $this->uncloseable = $this->evaluate($uncloseable);

        return $this;
    }

    /**
     * The tour can only be dismissed via the popover's close (×) button, which asks for confirmation
     * first; an overlay click, the Escape key and the arrow keys do nothing. Use this for guided
     * walkthroughs an accidental click must not abandon, while still giving a deliberate way out.
     *
     * @return $this
     */
    public function confirmClose(bool|Closure $confirmClose = true, ?string $message = null): self
    {
        $this->confirmClose = $this->evaluate($confirmClose);
        $this->confirmCloseMessage = $message;

        return $this;
    }

    /**
     * Navigate the browser to this URL after the tour is closed (the × — confirmed first when
     * confirmClose is set). Use it to return the user to where they launched the walkthrough from
     * instead of leaving them stranded on the (now-abandoned) page.
     *
     * @return $this
     */
    public function redirectOnClose(?string $url): self
    {
        $this->redirectOnClose = $url;

        return $this;
    }

    /**
     * Disable all events on the tour.
     * default: false
     *
     * @return $this
     */
    public function disableEvents(bool|Closure $disableEvents = true): self
    {
        $this->disableEvents = $this->evaluate($disableEvents);

        return $this;
    }

    /**
     * Bypass the route check to show your tour on any routes.
     *
     * @return $this
     */
    public function ignoreRoutes(bool|Closure $ignoreRoutes = true): self
    {
        $this->ignoreRoutes = $this->evaluate($ignoreRoutes);

        return $this;
    }

    /**
     * Set the label of the next button.
     *
     * @return $this
     */
    public function nextButtonLabel(string $label): self
    {
        $this->nextButtonLabel = $label;

        return $this;
    }

    /**
     * Set the label of the previous button.
     *
     * @return $this
     */
    public function previousButtonLabel(string $label): self
    {
        $this->previousButtonLabel = $label;

        return $this;
    }

    /**
     * Set the label of the done button.
     *
     * @return $this
     */
    public function doneButtonLabel(string $label): self
    {
        $this->doneButtonLabel = $label;

        return $this;
    }

    /**
     * Set the steps of your tour.
     *
     * @return $this
     */
    public function steps(Step ...$steps): self
    {
        $this->steps = $steps;

        return $this;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getRoute(): ?string
    {
        return $this->route;
    }

    public function getSteps(): array
    {
        return $this->steps;
    }

    public function getColors(): array
    {
        return $this->colors;
    }

    public function isAlwaysShow(): bool
    {
        return $this->alwaysShow;
    }

    public function isVisible(): bool
    {
        return $this->visible;
    }

    public function getNextButtonLabel(): string
    {
        return $this->nextButtonLabel;
    }

    public function getPreviousButtonLabel(): string
    {
        return $this->previousButtonLabel;
    }

    public function getDoneButtonLabel(): string
    {
        return $this->doneButtonLabel;
    }

    public function isUncloseable(): bool
    {
        return $this->uncloseable;
    }

    public function isConfirmClose(): bool
    {
        return $this->confirmClose;
    }

    public function getConfirmCloseMessage(): ?string
    {
        return $this->confirmCloseMessage;
    }

    public function getRedirectOnClose(): ?string
    {
        return $this->redirectOnClose;
    }

    public function hasDisabledEvents(): bool
    {
        return $this->disableEvents;
    }

    public function isRoutesIgnored(): bool
    {
        return $this->ignoreRoutes;
    }
}
