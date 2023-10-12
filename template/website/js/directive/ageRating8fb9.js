var _ageRating;

_ageRating = function() {
  var directive, link, template;
  template = "<span ng-if='rating' class='age-rating'>{{ rating }}</span>";
  link = function($scope, $element, $attr) {
    $scope.rating = null;
    return $scope.$watch('age', function(age) {
      switch (age) {
        case '18':
          return $scope.rating = 'T18';
        case '16':
          return $scope.rating = 'T16';
        case '13':
          return $scope.rating = 'T13';
        case 'k':
          return $scope.rating = 'K';
        case 'c':
          return $scope.rating = 'C';
        default:
          return $scope.rating = '';
      }
    });
  };
  directive = {
    restrict: 'E',
    scope: {
      age: '=ngAge'
    },
    template: template,
    link: link
  };
  return directive;
};

angular.module('appweb').directive("galaxyAgeRating", _ageRating);
