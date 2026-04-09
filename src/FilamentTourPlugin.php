<?php

namespace JibayMcs\FilamentTour;

use Closure;
use Filament\Contracts\Plugin;
use Filament\Panel;
use Filament\Support\Concerns\EvaluatesClosures;
use Illuminate\Support\Facades\Blade;

class FilamentTourPlugin implements Plugin
{
    use EvaluatesClosures;

    private ?bool $onlyVisibleOnce = null;

    private ?bool $enableCssSelector = null;

    private bool|Closure $autoStartTours = true;

    private static bool|Closure $resolvedAutoStartTours = true;

    private string $historyType = 'local_storage';

    public static function make(): static
    {
        return app(static::class);
    }

    public static function get(): static
    {
        /** @var static $plugin */
        $plugin = filament(app(static::class)->getId());

        return $plugin;
    }

    public function getId(): string
    {
        return 'filament-tour';
    }

    public function register(Panel $panel): void
    {
        $panel->renderHook('panels::body.start', fn () => Blade::render('<livewire:filament-tour-widget/>'));
    }

    public function boot(Panel $panel): void {}

    public function onlyVisibleOnce(bool $onlyVisibleOnce = true): self
    {
        $this->onlyVisibleOnce = $onlyVisibleOnce;

        return $this;
    }

    public function isOnlyVisibleOnce(): ?bool
    {
        return $this->onlyVisibleOnce;
    }

    // Generate documentation
    public function enableCssSelector(bool|Closure $enableCssSelector = true): self
    {
        if (is_callable($enableCssSelector)) {
            $this->enableCssSelector = $enableCssSelector();
        } elseif (is_bool($enableCssSelector)) {
            $this->enableCssSelector = $enableCssSelector;
        }

        return $this;
    }

    public function isCssSelectorEnabled(): ?bool
    {
        return $this->enableCssSelector;
    }

    public function autoStartTours(bool|Closure $condition = true): self
    {
        $this->autoStartTours = $condition;
        self::$resolvedAutoStartTours = $condition;

        return $this;
    }

    public function shouldAutoStartTours(): bool
    {
        return (bool) $this->evaluate($this->autoStartTours);
    }

    public static function resolveAutoStartTours(): bool
    {
        $value = self::$resolvedAutoStartTours;

        if ($value instanceof Closure) {
            return (bool) app(static::class)->evaluate($value);
        }

        return (bool) $value;
    }

    public function historyType(string $type): self
    {
        $this->historyType = $type;

        return $this;
    }

    public function getHistoryType(): string
    {
        return $this->historyType;
    }
}
