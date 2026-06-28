# Legacy files

These files were the original procedural (IIFE/closure-based) implementation
of the site's JavaScript. They have been superseded by the ES6 class
architecture in `js/core/` and are kept here only for reference/diff
purposes. No HTML page includes these anymore.

| Legacy file        | Replaced by (in js/core/)                                  |
|---------------------|--------------------------------------------------------------|
| main.js             | progress-store.js, ui-services.js, app.js                  |
| layout.js           | site-layout.js                                              |
| topic-render.js     | diagram-renderer.js, quiz-engine.js, topic-page-renderer.js |
| playground.js       | code-playground.js                                          |
| terminal.js         | virtual-file-system.js, terminal-emulator.js                |
