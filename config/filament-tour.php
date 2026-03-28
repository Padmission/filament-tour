<?php

// config for JibayMcs/FilamentTour
return [

    'only_visible_once' => true,
    'enable_css_selector' => false,

    // When true, clicking outside the tour overlay will permanently dismiss
    // the tour (same as clicking the X button). When false (default), clicking
    // outside only closes the tour temporarily — it will appear again on the
    // next page load.
    'dismiss_on_overlay_click' => false,

    'tour_prefix_id' => 'tour_',
    'highlight_prefix_id' => 'highlight_',
];
