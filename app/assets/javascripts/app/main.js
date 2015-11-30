// Setup the main Angular App.
var bookApp = angular.module('bookApp', []).config(function($sceProvider) {
  // Disable sceProvider so we can embed the load review script, need to find a
  // better way so we don't have to disable it.
  $sceProvider.enabled(false);
});
