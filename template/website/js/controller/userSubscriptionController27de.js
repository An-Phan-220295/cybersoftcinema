var _userSubscriptionController;

_userSubscriptionController = function($rootScope, $scope, $location, ApiService, UtitService) {
  var mapStatus, options;
  $scope.disableCancelAuto = function(userSubscription) {
    var ref;
    return !userSubscription.autoRenew || ((ref = userSubscription.status) === "Canceled" || ref === "Expired");
  };
  $scope.disableCancel = function(userSubscription) {
    var ref;
    return !(userSubscription != null ? userSubscription.status : void 0) || ((ref = userSubscription.status) === "Canceled" || ref === "Expired");
  };
  $scope.statusClass = function(status) {
    return {
      "qualified": status === "Qualified",
      "expired": (status === "Canceled" || status === "Expired")
    };
  };
  mapStatus = function(status) {
    if (status === "Qualified") {
      return "Đang sử dụng";
    } else if (status === "Expired") {
      return "Hết hạn";
    } else {
      return "Bị hủy bỏ";
    }
  };
  $scope.userSubscription = {};
  $scope.configCancelAutoRenew = {
    id: "cancelAutoRenew",
    title: "HỦY BỎ TỰ ĐỘNG GIA HẠN",
    ok: function() {
      var optionsCancel;
      optionsCancel = {
        url: "/api/v2/web/subscriptions/user-subscription/cancel-auto-renew",
        method: "PUT",
        data: {}
      };
      return ApiService.request(optionsCancel, function(error, result) {
        if (error) {
          return;
        }
        console.log("cancelAutoRenew", result);
        $scope.userSubscription.autoRenew = false;
        return UtitService.notify(null, "Hủy bỏ tự động gia hạn thành công!", "Thông báo");
      });
    }
  };
  $scope.configCancel = {
    id: "cancel",
    title: "HỦY BỎ GÓI ĐĂNG KÝ",
    ok: function() {
      var optionsCancel;
      optionsCancel = {
        url: "/api/v2/web/subscriptions/user-subscription/cancel",
        method: "PUT",
        data: {}
      };
      return ApiService.request(optionsCancel, function(error, result) {
        if (error) {
          return;
        }
        console.log("cancel", result);
        UtitService.notify(null, "Hủy bỏ gói đăng ký thành công!", "Thông báo");
        $scope.userSubscription.status = "Canceled";
        return $scope.userSubscription.statusTxt = mapStatus("Canceled");
      });
    }
  };
  options = {
    url: "/api/v2/web/subscriptions/user-subscription",
    method: "GET",
    data: {}
  };
  ApiService.request(options, function(error, result) {
    var data, ref, ref1, ref2, ref3;
    if (error) {
      return;
    }
    data = (result != null ? result.data : void 0) || {};
    data.subscription = data.subscription || {};
    return $scope.userSubscription = {
      haveSub: data.haveSub,
      name: data.subscription.name,
      description: data.subscription.description,
      price: data.subscription.price,
      expiryDate: moment(data.expiryDate).toDate(),
      renewDate: moment(data.expiryDate).add(1, 'd').toDate(),
      autoRenew: data.autoRenew,
      status: data.status,
      statusTxt: mapStatus(data.status),
      ticketName: (ref = data.subscription.tickets) != null ? ref[0].name : void 0,
      ticketDes: (ref1 = data.subscription.tickets) != null ? ref1[0].description : void 0,
      ticketAmount: (ref2 = data.subscription.tickets) != null ? ref2[0].amount : void 0,
      ticketReAmount: (ref3 = data.tickets) != null ? ref3[0].remainingAmount : void 0,
      image: data.subscription.image
    };
  });
  $scope.cancelAutoRenew = function() {
    return $("#cancelAutoRenew").modal('show');
  };
  $scope.cancel = function() {
    return $("#cancel").modal('show');
  };
  return $scope.init = function(userSubscription) {
    return console.log("userSubscriptionController - userSubscription", userSubscription);
  };
};

_userSubscriptionController.$inject = ['$rootScope', '$scope', '$location', 'ApiService', 'UtitService'];

angular.module("appweb").controller('userSubscriptionController', _userSubscriptionController);
