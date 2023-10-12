var _dir;

_dir = function($rootScope, $document, ApiService, $timeout) {
  var directive, link, template;
  template = "<div id=\"{{config.id}}\" class=\"dialog modal fade\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type='button' class=\"close\" data-dismiss='modal'>×</button>\n        <h2><b>{{config.title}}</b></h2>\n      </div>\n      <div class=\"modal-body\" ng-transclude>\n      </div>\n      <div class=\"modal-footer\">\n        <button class=\"btn primary\" ng-click=\"ok()\">{{ config.yes || 'Đồng ý' }}</button>\n        <button class=\"btn primary\" data-dismiss='modal'>{{ config.no || 'Hủy bỏ' }}</button>\n      </div>\n    </div>\n  </div>\n</div>";
  link = function($scope, $element, $attr) {
    return $scope.ok = function() {
      $($element).find('.modal').modal('hide');
      return $scope.config.ok();
    };
  };
  directive = {
    restrict: "E",
    transclude: true,
    scope: {
      config: "=ngConfig"
    },
    template: template,
    link: link
  };
  return directive;
};

_dir.$inject = ["$rootScope", "$document", "ApiService", "$timeout"];

angular.module("appweb").directive("galaxyModal", _dir);
