import {driver} from "driver.js";
import {initCssSelector} from './css-selector.js';

document.addEventListener('livewire:initialized', async function () {

    initCssSelector();

    let pluginData;

    let tours = [];
    let highlights = [];

    function waitForElement(selector, callback) {
        if (document.querySelector(selector)) {
            callback(document.querySelector(selector));
            return;
        }

        const observer = new MutationObserver(function (mutations) {
            if (document.querySelector(selector)) {
                callback(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function parseId(params) {

        if (Array.isArray(params)) {
            return params[0];
        } else if (typeof params === 'object') {
            return params.id;
        }

        return params;
    }

    function resolveStepElement(step) {
        const target = step?.element;

        if (!target) {
            return null;
        }

        if (typeof target === 'function') {
            try {
                return target() ?? null;
            } catch {
                return null;
            }
        }

        if (target instanceof Element) {
            return target;
        }

        if (typeof target !== 'string') {
            return null;
        }

        try {
            return document.querySelector(target);
        } catch {
            return null;
        }
    }

    function getReachableStepIndices(steps) {
        return steps.flatMap((step, index) => {
            if (!step?.element || resolveStepElement(step)) {
                return [index];
            }

            return [];
        });
    }

    function findNextReachableStepIndex(reachableStepIndices, currentIndex) {
        for (const index of reachableStepIndices) {
            if (index > currentIndex) {
                return index;
            }
        }

        return null;
    }

    function findPreviousReachableStepIndex(reachableStepIndices, currentIndex) {
        for (let i = reachableStepIndices.length - 1; i >= 0; i -= 1) {
            if (reachableStepIndices[i] < currentIndex) {
                return reachableStepIndices[i];
            }
        }

        return null;
    }

    function findStartStepIndex(reachableStepIndices, previewStartIndex) {
        for (const index of reachableStepIndices) {
            if (index >= previewStartIndex) {
                return index;
            }
        }

        if (previewStartIndex <= 0) {
            return reachableStepIndices[0] ?? null;
        }

        for (let i = reachableStepIndices.length - 1; i >= 0; i -= 1) {
            if (reachableStepIndices[i] < previewStartIndex) {
                return reachableStepIndices[i];
            }
        }

        return null;
    }

    function refreshReachableStepIndices(steps) {
        const reachableStepIndices = getReachableStepIndices(steps);

        if (reachableStepIndices.length > 0) {
            return reachableStepIndices;
        }

        const centeredStepIndices = steps.flatMap((step, index) => step?.element ? [] : [index]);

        if (centeredStepIndices.length > 0) {
            return centeredStepIndices;
        }

        return [];
    }

    function queueStepRefresh(callback) {
        window.requestAnimationFrame(() => {
            callback();
        });
    }

    function goToNextReachableStep(driverObj, steps, currentIndex, onTourComplete) {
        queueStepRefresh(() => {
            const reachableStepIndices = refreshReachableStepIndices(steps);
            const nextIndex = findNextReachableStepIndex(reachableStepIndices, currentIndex);

            if (nextIndex === null) {
                onTourComplete();

                return;
            }

            driverObj.moveTo(nextIndex);
        });
    }

    function goToPreviousReachableStep(driverObj, steps, currentIndex) {
        queueStepRefresh(() => {
            const reachableStepIndices = refreshReachableStepIndices(steps);
            const previousIndex = findPreviousReachableStepIndex(reachableStepIndices, currentIndex);

            if (previousIndex === null) {
                return;
            }

            driverObj.moveTo(previousIndex);
        });
    }

    function getStepNavigationState(steps, activeIndex) {
        const reachableStepIndices = refreshReachableStepIndices(steps);

        return {
            previousIndex: findPreviousReachableStepIndex(reachableStepIndices, activeIndex),
            nextIndex: findNextReachableStepIndex(reachableStepIndices, activeIndex),
        };
    }

    function driveFirstReachableStep(driverObj, steps, previewStartIndex) {
        const reachableStepIndices = refreshReachableStepIndices(steps);
        const startIndex = findStartStepIndex(reachableStepIndices, previewStartIndex);

        if (startIndex === null) {
            return;
        }

        driverObj.drive(startIndex);
    }

    Livewire.dispatch('filament-tour::load-elements', {request: window.location})

    Livewire.on('filament-tour::loaded-elements', function (data) {

        pluginData = data;

        pluginData.tours.forEach((tour) => {
            tours.push(tour);

            if (!localStorage.getItem('tours')) {
                localStorage.setItem('tours', "[]");
            }
        });

        if (pluginData.auto_start_tours !== false) {
            selectTour(tours);
        }

        pluginData.highlights.forEach((highlight) => {

            if (routeMatchesPattern(highlight.route, window.location.pathname)) {

                //TODO Add a more precise/efficient selector

                waitForElement(highlight.parent, function (selector) {
                    selector.parentNode.style.position = 'relative';

                    let tempDiv = document.createElement('div');
                    tempDiv.innerHTML = highlight.button;

                    tempDiv.firstChild.classList.add(highlight.position);

                    selector.parentNode.insertBefore(tempDiv.firstChild, selector)
                });

                highlights.push(highlight);
            }
        });
    });

    function routeMatchesPattern(pattern, pathname) {
        if (pattern === pathname) return true;
        if (!pattern.includes('{')) return false;
        const regexStr = '^' + pattern.replace(/\{[^}]+\}/g, '[^/]+') + '$';
        return new RegExp(regexStr).test(pathname);
    }

    function getPopoverWidthClasses() {
        return [
            'fi-width-xs',
            'fi-width-sm',
            'fi-width-md',
            'fi-width-lg',
            'fi-width-xl',
            'fi-width-2xl',
            'fi-width-3xl',
            'fi-width-4xl',
            'fi-width-5xl',
            'fi-width-6xl',
            'fi-width-7xl',
            'fi-width-full',
            'fi-width-min',
            'fi-width-max',
            'fi-width-fit',
            'fi-width-prose',
            'fi-width-screen-sm',
            'fi-width-screen-md',
            'fi-width-screen-lg',
            'fi-width-screen-xl',
            'fi-width-screen-2xl',
            'fi-width-screen',
        ];
    }

    function getPopoverWidthStyle(width) {
        const constrainedWidth = (value) => `min(calc(100vw - 2rem), ${value})`;

        switch (width) {
            case 'xs':
                return constrainedWidth('var(--container-xs)');
            case 'sm':
                return constrainedWidth('var(--container-sm)');
            case 'md':
                return constrainedWidth('var(--container-md)');
            case 'lg':
                return constrainedWidth('var(--container-lg)');
            case 'xl':
                return constrainedWidth('var(--container-xl)');
            case '2xl':
                return constrainedWidth('var(--container-2xl)');
            case '3xl':
                return constrainedWidth('var(--container-3xl)');
            case '4xl':
                return constrainedWidth('var(--container-4xl)');
            case '5xl':
                return constrainedWidth('var(--container-5xl)');
            case '6xl':
                return constrainedWidth('var(--container-6xl)');
            case '7xl':
                return constrainedWidth('var(--container-7xl)');
            case 'full':
            case 'screen':
                return 'calc(100vw - 2rem)';
            case 'min':
                return 'min-content';
            case 'max':
                return constrainedWidth('max-content');
            case 'fit':
                return constrainedWidth('fit-content');
            case 'prose':
                return constrainedWidth('65ch');
            case 'screen-sm':
                return constrainedWidth('var(--breakpoint-sm)');
            case 'screen-md':
                return constrainedWidth('var(--breakpoint-md)');
            case 'screen-lg':
                return constrainedWidth('var(--breakpoint-lg)');
            case 'screen-xl':
                return constrainedWidth('var(--breakpoint-xl)');
            case 'screen-2xl':
                return constrainedWidth('var(--breakpoint-2xl)');
            default:
                return null;
        }
    }

    function applyPopoverWidth(popover, width) {
        const wrapper = popover.footer?.parentElement;

        if (!wrapper) {
            return;
        }

        wrapper.classList.remove(...getPopoverWidthClasses());
        wrapper.style.removeProperty('width');
        wrapper.style.removeProperty('max-width');

        if (!width) {
            return;
        }

        wrapper.classList.add(`fi-width-${width}`);

        const widthStyle = getPopoverWidthStyle(width);

        if (!widthStyle) {
            return;
        }

        // The package CSS sets a default max-width with !important, so widths must override it the same way.
        wrapper.style.setProperty('width', widthStyle, 'important');
        wrapper.style.setProperty('max-width', widthStyle, 'important');
    }

    function markTourSeen(tour) {
        if (!localStorage.getItem('tours').includes(tour.id)) {
            localStorage.setItem('tours', JSON.stringify([...JSON.parse(localStorage.getItem('tours')), tour.id]));
        }
    }

    function openNextTourIfAvailable(currentTour) {
        if (tours.length <= 1) {
            return;
        }

        const index = tours.findIndex((tour) => tour.id === currentTour.id);

        if (index === -1 || index >= tours.length - 1) {
            return;
        }

        selectTour(tours, index + 1);
    }

    function selectTour(tours, startIndex = 0) {
        for (let i = startIndex; i < tours.length; i++) {
            let tour = tours[i];
            let conditionAlwaysShow = tour.alwaysShow;
            let conditionRoutesIgnored = tour.routesIgnored;
            let conditionRouteMatches = routeMatchesPattern(tour.route, window.location.pathname);
            let conditionVisibleOnce = !pluginData.only_visible_once ||
                (pluginData.only_visible_once && !localStorage.getItem('tours').includes(tour.id));

            if (
                (conditionAlwaysShow && conditionRoutesIgnored) ||
                (conditionAlwaysShow && !conditionRoutesIgnored && conditionRouteMatches) ||
                (conditionRoutesIgnored && conditionVisibleOnce) ||
                (conditionRouteMatches && conditionVisibleOnce)
            ) {
                openTour(tour);
                break;
            }
        }
    }


    Livewire.on('filament-tour::open-highlight', function (params) {

        const id = parseId(params);

        console.log(highlights)

        let highlight = highlights.find(element => element.id === id);

        if (highlight) {
            driver({
                overlayColor: localStorage.theme === 'light' ? highlight.colors.light : highlight.colors.dark,

                onPopoverRender: (popover, {config, state}) => {
                    const isDarkMode = document.documentElement.classList.contains('dark');

                    popover.title.innerHTML = "";
                    popover.title.innerHTML = state.activeStep.popover.title;

                    if (!state.activeStep.popover.description) {
                        popover.title.firstChild.style.justifyContent = 'center';
                    }

                    let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";

                    popover.footer.parentElement.classList.add(...contentClasses.split(" "));
                    popover.footer.parentElement.classList.toggle('driver-popover-dark', isDarkMode);
                    popover.arrow.classList.toggle('driver-popover-arrow-dark', isDarkMode);

                    if (isDarkMode) {
                        popover.footer.parentElement.style.background = 'rgb(15 23 42)';
                        popover.footer.parentElement.style.color = 'rgb(248 250 252)';
                        popover.footer.parentElement.style.borderColor = 'color-mix(in oklab, rgb(255 255 255) 12%, transparent)';
                        popover.footer.parentElement.style.boxShadow = '0 24px 50px -20px rgb(0 0 0 / 0.65)';
                    } else {
                        popover.footer.parentElement.style.background = '';
                        popover.footer.parentElement.style.color = '';
                        popover.footer.parentElement.style.borderColor = '';
                        popover.footer.parentElement.style.boxShadow = '';
                    }

                    applyPopoverWidth(popover, state.activeStep.popover.width);
                },
            }).highlight(highlight);

        } else {
            console.error(`Highlight with id '${id}' not found`);
        }
    });

    Livewire.on('filament-tour::open-tour', function (params) {

        const id = parseId(params);

        let tour = tours.find(element => element.id === `tour_${id}`);

        if (tour) {
            openTour(tour);
        } else {
            console.error(`Tour with id '${id}' not found`);
        }
    });

    function openTour(tour) {

        let steps = JSON.parse(tour.steps);

        if (steps.length > 0) {
            const previewStartIndex = Number.isFinite(Number(tour.previewStartIndex))
                ? Number(tour.previewStartIndex)
                : 0;

            const driverObj = driver({
                allowClose: true,
                disableActiveInteraction: true,
                overlayColor: localStorage.theme === 'light' ? tour.colors.light : tour.colors.dark,
                onDeselected: ((element, step, {config, state}) => {
                    driverObj.__clearInteractive?.();
                }),
                onHighlighted: ((element, step, {config, state}) => {
                    driverObj.__attachInteractive?.(element, state.activeStep);
                }),
                onCloseClick: ((element, step, {config, state}) => {
                    if (state.activeStep && (!state.activeStep.uncloseable || tour.uncloseable))
                        driverObj.destroy();

                    markTourSeen(tour);
                }),
                onDestroyStarted: ((element, step, {config, state}) => {
                    if (state.activeStep && !state.activeStep.uncloseable && !tour.uncloseable) {
                        driverObj.destroy();
                    }
                }),
                onDestroyed: ((element, step, {config, state}) => {
                    if (pluginData.dismiss_on_overlay_click && !localStorage.getItem('tours').includes(tour.id)) {
                        markTourSeen(tour);
                    }
                }),
                onNextClick: ((element, step, {config, state}) => {
                    // Skip (on an interactive step) and Next (on a passive step) both run the step's
                    // events then advance; the helper is shared with the interactive action listener.
                    driverObj.__advanceFromActiveStep(state.activeStep);
                }),
                onPrevClick: ((element, step, {config, state}) => {
                    const currentIndex = driverObj.getActiveIndex() ?? 0;

                    goToPreviousReachableStep(driverObj, steps, currentIndex);
                }),
                onPopoverRender: (popover, {config, state}) => {
                    const isDarkMode = document.documentElement.classList.contains('dark');
                    const activeIndex = driverObj.getActiveIndex() ?? 0;
                    const {
                        previousIndex: previousReachableStepIndex,
                        nextIndex: nextReachableStepIndex,
                    } = getStepNavigationState(steps, activeIndex);

                    if (state.activeStep.uncloseable || tour.uncloseable)
                        document.querySelector(".driver-popover-close-btn").remove();

                    popover.title.innerHTML = "";
                    popover.title.innerHTML = state.activeStep.popover.title;

                    if (!state.activeStep.popover.description) {
                        popover.title.firstChild.style.justifyContent = 'center';
                    }

                    let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";

                    // popover.description.insertAdjacentHTML("beforeend", state.activeStep.popover.form);

                    popover.footer.parentElement.classList.add(...contentClasses.split(" "));
                    popover.footer.parentElement.classList.toggle('driver-popover-dark', isDarkMode);
                    popover.arrow.classList.toggle('driver-popover-arrow-dark', isDarkMode);

                    if (isDarkMode) {
                        popover.footer.parentElement.style.background = 'rgb(15 23 42)';
                        popover.footer.parentElement.style.color = 'rgb(248 250 252)';
                        popover.footer.parentElement.style.borderColor = 'color-mix(in oklab, rgb(255 255 255) 12%, transparent)';
                        popover.footer.parentElement.style.boxShadow = '0 24px 50px -20px rgb(0 0 0 / 0.65)';
                    } else {
                        popover.footer.parentElement.style.background = '';
                        popover.footer.parentElement.style.color = '';
                        popover.footer.parentElement.style.borderColor = '';
                        popover.footer.parentElement.style.boxShadow = '';
                    }

                    applyPopoverWidth(popover, state.activeStep.popover.width);

                    popover.footer.innerHTML = "";
                    popover.footer.classList.add('flex', 'mt-3');
                    popover.footer.style.justifyContent = 'space-evenly';

                    popover.footer.classList.remove("driver-popover-footer");


                    const nextButton = document.createElement("button");
                    let nextClasses = "fi-color fi-color-primary fi-bg-color-400 hover:fi-bg-color-300 dark:fi-bg-color-600 dark:hover:fi-bg-color-700 fi-text-color-800 hover:fi-text-color-800 dark:fi-text-color-0 dark:hover:fi-text-color-0 fi-btn fi-size-md fi-ac-btn-action";

                    nextButton.classList.add(...nextClasses.split(" "), 'driver-popover-next-btn');
                    nextButton.innerText = nextReachableStepIndex === null ? tour.doneButtonLabel : tour.nextButtonLabel;

                    // On an interactive step the trainee must perform the action to advance; the
                    // primary Next becomes a subtle Skip escape hatch instead of a call-to-action.
                    if (state.activeStep.interactive) {
                        nextButton.classList.remove(...nextClasses.split(" "));
                        nextButton.classList.add('driver-popover-next-btn');
                        nextButton.style.background = 'transparent';
                        nextButton.style.boxShadow = 'none';
                        nextButton.style.textDecoration = 'underline';
                        nextButton.style.opacity = '0.7';
                        nextButton.style.color = isDarkMode ? 'rgb(203 213 225)' : 'rgb(107 114 128)';
                        nextButton.innerText = tour.skipButtonLabel || 'Skip';
                    }


                    const prevButton = document.createElement("button");
                    let prevClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-gray gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ring-1 ring-gray-950/10 dark:ring-white/20 fi-ac-btn-action";
                    prevButton.classList.add(...prevClasses.split(" "), 'driver-popover-prev-btn');
                    prevButton.innerText = tour.previousButtonLabel;

                    if (isDarkMode) {
                        prevButton.style.background = 'rgb(30 41 59)';
                        prevButton.style.color = 'rgb(248 250 252)';
                        prevButton.style.borderColor = 'color-mix(in oklab, rgb(255 255 255) 14%, transparent)';
                    }

                    if (previousReachableStepIndex !== null) {
                        popover.footer.appendChild(prevButton);
                    }
                    popover.footer.appendChild(nextButton);
                },
                steps: steps,
            });

            // --- Interactive ("do this") step support --------------------------------------------
            // For steps flagged interactive the highlighted control stays usable (per-step
            // disableActiveInteraction:false) and the tour only advances when the trainee actually
            // performs the action. A single listener is attached per highlighted step and cleaned up
            // when the step changes; the popover shows a subtle Skip instead of Next.
            let interactiveCleanup = null;

            const clearInteractive = () => {
                if (interactiveCleanup) {
                    interactiveCleanup();
                    interactiveCleanup = null;
                }
            };

            const completeTour = () => {
                markTourSeen(tour);
                driverObj.destroy();
                openNextTourIfAvailable(tour);
            };

            const runStepEvents = (step) => {
                if (!step || !step.events) {
                    return;
                }
                if (step.events.notifyOnNext) {
                    new FilamentNotification()
                        .title(step.events.notifyOnNext.title)
                        .body(step.events.notifyOnNext.body)
                        .icon(step.events.notifyOnNext.icon)
                        .iconColor(step.events.notifyOnNext.iconColor)
                        .color(step.events.notifyOnNext.color)
                        .duration(step.events.notifyOnNext.duration)
                        .send();
                }
                if (step.events.dispatchOnNext) {
                    Livewire.dispatch(step.events.dispatchOnNext.name, step.events.dispatchOnNext.params);
                }
                if (step.events.clickOnNext) {
                    document.querySelector(step.events.clickOnNext)?.click();
                }
                if (step.events.redirectOnNext) {
                    window.open(step.events.redirectOnNext.url, step.events.redirectOnNext.newTab ? '_blank' : '_self');
                }
            };

            const advanceFromActiveStep = (step) => {
                runStepEvents(step);
                const currentIndex = driverObj.getActiveIndex() ?? 0;
                goToNextReachableStep(driverObj, steps, currentIndex, completeTour);
            };

            const attachInteractive = (element, step) => {
                clearInteractive();
                if (!step || !step.interactive) {
                    return;
                }
                const target = step.continueSelector ? document.querySelector(step.continueSelector) : element;
                if (!target) {
                    return;
                }
                const eventName = step.continueEvent || 'click';
                const handler = () => {
                    clearInteractive();
                    advanceFromActiveStep(step);
                };
                target.addEventListener(eventName, handler);
                interactiveCleanup = () => target.removeEventListener(eventName, handler);
            };

            driverObj.__advanceFromActiveStep = advanceFromActiveStep;
            driverObj.__attachInteractive = attachInteractive;
            driverObj.__clearInteractive = clearInteractive;

            driveFirstReachableStep(driverObj, steps, previewStartIndex);
        }
    }
});
