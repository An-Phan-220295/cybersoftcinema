var _dropdownDir;

_dropdownDir = function($rootScope, $document) {
  var directive, link, template;
  template = "<a class=\"btn btn-select login location\">\n  <span class=\"btn-select-value\">{{ selectedText || config.placeholder }}</span>\n  <span class=\"btn-select-arrow\"></span>\n  <select ng-model=\"model\" autocomplete=\"off\">\n    <option value=\"\">\n      {{ config.placeholder }}\n    </option>\n    <option ng-repeat='item in config.items' ng-value='item.value'>\n      {{ item.text }}\n    </option>\n  </select>\n</a>";
  link = function($scope, $element, $attr) {
    $scope.selectedText = "";
    return $scope.$watch("model", function(data) {
      var selectedItem;
      selectedItem = _.find($scope.config.items, function(item) {
        return item.value === data;
      });
      $scope.selectedText = (selectedItem != null ? selectedItem.text : void 0) || "";
      if ($scope.selectedText === "") {
        return setTimeout(function() {
          return $($($element).find("select")[0]).val("");
        }, 0);
      }
    }, true);
  };
  directive = {
    restrict: 'E',
    scope: {
      config: '=ngConfig',
      model: '=ngModel'
    },
    template: template,
    link: link
  };
  return directive;
};

_dropdownDir.$inject = ['$rootScope', '$document'];

angular.module("appweb").directive("galaxyDropDown", _dropdownDir);
