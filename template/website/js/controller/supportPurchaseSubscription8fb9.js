var _supportPurchaseSubscriptionController;

_supportPurchaseSubscriptionController = function(ApiService, $scope) {
  $scope.socket = null;
  $scope.payUrl = '';
  $scope.memberInfo = {
    test: 1122
  };
  $scope.currentStep = 'start';
  $scope.orderInfo = {};
  $scope.init = function() {
    return $scope.initSocket();
  };
  $scope.initSocket = function() {
    if (typeof io === "undefined") {
      return;
    }
    $scope.socket = io('http://localhost:8800');
    $scope.socket.on('purchase', function(data) {
      console.log('socket - purchase');
      return $scope.$apply(function() {
        $scope.currentStep = 'payment';
        $scope.payUrl = data.payUrl || '';
        return $scope.memberInfo = data.memberInfo || {};
      });
    });
    $scope.socket.on('reset', function() {
      console.log('socket - reset');
      return $scope.$apply(function() {
        $scope.currentStep = 'start';
        $scope.payUrl = '';
        return $scope.memberInfo = {};
      });
    });
    $scope.socket.on('checkout', function(orderInfo) {
      console.log('socket - checkout');
      return $scope.$apply(function() {
        $scope.currentStep = 'checkout';
        $scope.orderInfo = orderInfo;
        return console.log('socket - checkout $scope.orderInfo', $scope.orderInfo);
      });
    });
    return $scope.socket.on('thankyou', function(orderInfo) {
      console.log('socket - thankyou');
      return $scope.$apply(function() {
        return $scope.currentStep = 'thankyou';
      });
    });
  };
  $scope.thankyou = function() {
    $scope.initSocket();
    return $scope.socket.emit('thankyou', {});
  };
  return $scope.formatPrice = function(price) {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
};

_supportPurchaseSubscriptionController.$inject = ['ApiService', '$scope'];

angular.module("appweb").controller('supportPurchaseSubscriptionController', _supportPurchaseSubscriptionController).config(function($sceDelegateProvider) {
  return $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://test-payment.momo.vn/**']);
});
