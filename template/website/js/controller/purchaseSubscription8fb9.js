var _purchaseSubscriptionController;

_purchaseSubscriptionController = function($rootScope, $scope, NewApiService, UtitService) {
  $scope.logged = true;
  $scope.userInfo = {};
  $scope.subscriptionDetails = {};
  $scope.paymentGateways = {};
  $scope.userSubscription = {};
  $scope.selectedPaymentMethod = "";
  $scope.paymentMethodOptions = {
    placeholder: "Chọn hình thức thanh toán",
    items: []
  };
  $scope.autoRenew = false;
  $scope.purchase = function() {
    var data, options, ref, ref1, ref2;
    data = {
      subscriptionId: $scope.subscriptionDetails.id,
      method: $scope.selectedPaymentMethod,
      platform: 'web',
      version: '1.15.0'
    };
    if ((ref = data.method) === "" || ref === null || ref === (void 0)) {
      return UtitService.notify(null, 'Vui lòng chọn phương thức thanh toán', 'Thông báo');
    }
    if (((ref1 = $scope.userSubscription) != null ? ref1.haveSub : void 0) && ((ref2 = $scope.userSubscription) != null ? ref2.isUsing : void 0)) {
      return UtitService.notify(null, 'Không thể sử dụng 2 gói đăng ký cùng lúc', 'Lỗi');
    }
    options = {
      url: "/api/v2/mobile/subscription/purchase",
      method: 'POST',
      data: data
    };
    return NewApiService.request(options, {}, function(error, result) {
      var code, ref3, ref4, ref5, ref6, ref7;
      code = error != null ? (ref3 = error.data) != null ? (ref4 = ref3.response) != null ? ref4.code : void 0 : void 0 : void 0;
      if (code === 100004) {
        $("#purchase-subscription-modal").modal();
        return;
      }
      if (code === 100007) {
        $("#update-national-id-modal").modal();
        return;
      }
      if (error) {
        return UtitService.notify(null, error != null ? (ref5 = error.data) != null ? (ref6 = ref5.data) != null ? ref6.message : void 0 : void 0 : void 0);
      }
      return location.href = result != null ? (ref7 = result.data) != null ? ref7.url : void 0 : void 0;
    });
  };
  $scope.returnSubscriptions = function() {
    return window.location.href = "/ve-uu-dai/";
  };
  $rootScope.$on('getUserInfo', function(event, userInfo) {
    if (userInfo != null ? userInfo.memberId : void 0) {
      $scope.userInfo = userInfo;
      return $scope.logged = true;
    } else {
      $scope.logged = false;
      return $rootScope.$broadcast('open-login', null, {
        enableSkip: false
      });
    }
  });
  $rootScope.$on('$loginSuccess', function(event, userInfo) {
    if (userInfo != null ? userInfo.memberId : void 0) {
      $scope.userInfo = userInfo;
      return $scope.logged = true;
    } else {
      $scope.logged = false;
      return $rootScope.$broadcast('open-login', null, {
        enableSkip: false
      });
    }
  });
  $rootScope.$on('$logoutSuccess', function() {
    $scope.userInfo = {};
    $scope.logged = false;
    return $rootScope.$broadcast('open-login', null, {
      enableSkip: false
    });
  });
  $scope.confirm = function() {
    return $("#confirm-payment-info").modal();
  };
  $scope.confirmPaymentInfo = {
    id: "confirm-payment-info",
    title: "Xác nhận thông tin thanh toán",
    yes: "Đúng, Tôi muốn mua",
    no: "Không",
    ok: function() {
      return $scope.purchase();
    }
  };
  $scope.purchaseSubscriptionModal = {
    id: "purchase-subscription-modal",
    title: "Thanh toán gói đăng ký với ví đã được liên kết",
    yes: "Thanh toán",
    ok: function() {
      var data, donePurchase, optionsLinked;
      donePurchase = function(error, result) {
        var historyId, ref, ref1, ref2;
        if (error) {
          return UtitService.notify(null, error != null ? (ref = error.data) != null ? (ref1 = ref.data) != null ? ref1.message : void 0 : void 0 : void 0);
        }
        historyId = result != null ? (ref2 = result.data) != null ? ref2.seoId : void 0 : void 0;
        return location.href = "/lich-su-goi-dang-ky/" + historyId;
      };
      data = {
        subscriptionId: $scope.subscriptionDetails.id,
        method: $scope.selectedPaymentMethod
      };
      optionsLinked = {
        url: "/api/v2/web/subscriptions/purchaseWithAccountLinked",
        method: 'POST',
        data: data
      };
      return NewApiService.request(optionsLinked, {}, donePurchase);
    }
  };
  $scope.updateNationalIDModal = {
    id: "update-national-id-modal",
    title: "Thiếu thông tin Chứng Minh Nhân Dân",
    yes: "Đến trang thành viên",
    ok: function() {
      return location.href = "/thanh-vien";
    }
  };
  return $scope.init = function(subscriptionDetails, paymentGateways, userSubscription) {
    console.log('purchaseSubscriptionController - subscriptionDetails', subscriptionDetails);
    console.log('purchaseSubscriptionController - paymentGateways', paymentGateways);
    console.log('purchaseSubscriptionController - userSubscription', userSubscription);
    $scope.subscriptionDetails = subscriptionDetails;
    $scope.paymentMethodOptions.items = _.map(paymentGateways.data, function(item) {
      return {
        text: item.name,
        value: item.id
      };
    });
    return $scope.userSubscription = userSubscription;
  };
};

_purchaseSubscriptionController.$inject = ['$rootScope', '$scope', 'NewApiService', 'UtitService'];

angular.module("appweb").controller('purchaseSubscriptionController', _purchaseSubscriptionController);
