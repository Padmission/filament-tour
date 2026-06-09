<?php

namespace JibayMcs\FilamentTour\Tour;

use Filament\Facades\Filament;
use JibayMcs\FilamentTour\Tour\Traits\CanConstructRoute;

trait HasTour
{
    use CanConstructRoute;

    public function constructTours($class): array
    {
        $prefixId = config('filament-tour.tour_prefix_id');

        $tours = [];

        foreach ($this->tours() as $tour) {

            if ($tour instanceof Tour) {

                if ($tour->getRoute() && Filament::auth()->user()) {
                    $this->setRoute($tour->getRoute());
                }

                $steps = json_encode(collect($tour->getSteps())->mapWithKeys(function (Step $step, $item) use ($tour) {

                    $data[$item] = [
                        'uncloseable' => $step->isUncloseable(),

                        'popover' => [
                            'title' => view('filament-tour::tour.step.popover.title')
                                ->with('title', $step->getTitle())
                                ->with('icon', $step->getIcon())
                                ->with('iconColor', $step->getIconColor())
                                ->render(),
                            'description' => $step->getDescription(),
                            'width' => $step->getWidth(),
                        ],

                        'progress' => [
                            'current' => $item,
                            'total' => count($tour->getSteps()),
                        ],
                    ];

                    if (! $tour->hasDisabledEvents()) {
                        $data[$item]['events'] = [
                            'redirectOnNext' => $step->getRedirectOnNext(),
                            'clickOnNext' => $step->getClickOnNext(),
                            'notifyOnNext' => $step->getNotifyOnNext(),
                            'dispatchOnNext' => $step->getDispatchOnNext(),
                        ];
                    }

                    if ($step->getElement()) {
                        $data[$item]['element'] = $step->getElement();
                    }

                    if ($step->isInteractive()) {
                        $data[$item]['interactive'] = true;
                        $data[$item]['continueEvent'] = $step->getContinueEvent();
                        $data[$item]['continueSelector'] = $step->getContinueSelector();
                        $data[$item]['continueDelay'] = $step->getContinueDelay();
                    }

                    // v6: the highlighted control is usable by DEFAULT. A step is only locked
                    // (driver.js's .driver-no-interaction) when it is explicitly marked passive() and is
                    // not interactive. disableActiveInteraction is emitted per-step so it overrides the
                    // driver instance default; the `passive` flag lets the JS re-assert the lock state
                    // after a Livewire morph (which would otherwise strip the runtime class).
                    $locked = $step->isPassive() && ! $step->isInteractive();
                    $data[$item]['passive'] = $locked;
                    $data[$item]['disableActiveInteraction'] = $locked;

                    // When set, the JS waits for this step's element to appear (with a timeout) instead
                    // of skipping the step — needed for steps inside an async-appearing modal/slideover.
                    if ($step->isAwaitingElement()) {
                        $data[$item]['awaitElement'] = true;
                    }

                    return $data;
                })->toArray());

                if ($steps) {

                    $route = $this->getRoute($class);

                    $tours[] = [
                        'routesIgnored' => $tour->isRoutesIgnored(),

                        'uncloseable' => $tour->isUncloseable(),

                        'confirmClose' => $tour->isConfirmClose(),
                        'confirmCloseMessage' => $tour->getConfirmCloseMessage(),
                        'redirectOnClose' => $tour->getRedirectOnClose(),

                        'route' => $route,

                        'id' => "{$prefixId}{$tour->getId()}",

                        'alwaysShow' => $tour->isAlwaysShow(),

                        'colors' => [
                            'light' => $tour->getColors()['light'],
                            'dark' => $tour->getColors()['dark'],
                        ],

                        'steps' => $steps,

                        'nextButtonLabel' => $tour->getNextButtonLabel(),
                        'previousButtonLabel' => $tour->getPreviousButtonLabel(),
                        'doneButtonLabel' => $tour->getDoneButtonLabel(),
                    ];
                }
            }
        }

        return $tours;
    }

    /**
     * Define your tours here.
     */
    abstract public function tours(): array;
}
