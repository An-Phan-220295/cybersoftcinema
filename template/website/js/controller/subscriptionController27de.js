var _subscriptionController;

_subscriptionController = function($rootScope, $scope, ApiService, UtitService) {
  $scope.featureList = [];
  $scope.subscriptionList = [];
  $scope.subscriptionItems = [];
  $scope.selectedSubscription = null;
  $scope.openNationalId = false;
  $scope.openDetail = false;
  $scope.openNationalSaved = false;
  $scope.isSubmit = false;
  $scope.message = '';
  $scope.init = function(subscriptionList) {
    var data;
    data = subscriptionList.data;
    if (!data) {
      return;
    }
    $scope.featureList = data.slice(0, 3);
    if (data.length) {
      return $scope.subscriptionList = data.slice(3, data.length);
    }
  };
  $scope.goDetails = function(subscription) {
    return window.location.href = "/ve-uu-dai/" + subscription.slug;
  };
  $scope.nationalIdInit = function() {
    var nationalId;
    if ($rootScope.userInfo) {
      nationalId = $rootScope.userInfo.nationalId;
      if (nationalId) {
        return $scope.openNationalSaved = true;
      }
    }
  };
  $scope.homepageInit = function(subscriptionList) {
    var data, i, index, item, len, results;
    data = subscriptionList.data;
    if (!data) {
      return;
    }
    results = [];
    for (index = i = 0, len = data.length; i < len; index = ++i) {
      item = data[index];
      if (index > 2) {
        break;
      }
      results.push($scope.subscriptionItems.push(item));
    }
    return results;
  };
  $scope.buySubscription = function(subscription) {
    var buySubscriptionUrl, nationalId, ref;
    $scope.selectedSubscription = subscription;
    if (!((ref = $rootScope.userInfo) != null ? ref.memberId : void 0)) {
      $scope.closeDetailModal();
      $rootScope.$broadcast('open-login', null, {
        enableSkip: false
      });
      return;
    }
    nationalId = $rootScope.userInfo.nationalId;
    if (!nationalId) {
      $scope.openNationalIdModal();
      return;
    }
    buySubscriptionUrl = "/thanh-toan-goi-dang-ky/" + subscription.slug;
    window.location.href = buySubscriptionUrl;
  };
  $scope.viewSubscription = function(subscription) {
    $scope.selectedSubscription = subscription;
    return $scope.openDetailModal();
  };
  $scope.openDetailModal = function() {
    $scope.openDetail = true;
    return $('#subscription-detail-modal').modal('show');
  };
  $scope.closeDetailModal = function() {
    $('#subscription-detail-modal').modal('hide');
    return $scope.openDetail = false;
  };
  $scope.openNationalIdModal = function() {
    $('#national-id-modal').modal('show');
    $scope.closeDetailModal();
    return $scope.openNationalId = true;
  };
  $scope.closeNationalIdModal = function() {
    $('#national-id-modal').modal('hide');
    $scope.openNationalId = false;
    if (!$scope.openNationalSaved) {
      return $rootScope.userInfo.nationalId = '';
    }
  };
  $scope.saveNationalId = function() {
    var nationalId, options;
    if ($scope.isSubmit) {
      return;
    }
    nationalId = $rootScope.userInfo.nationalId || '';
    if (!nationalId) {
      return;
    }
    if (!/^\d{9,12}$/i.test(nationalId)) {
      $scope.message = 'Vui lòng nhập số CMND/CCCD hợp lệ';
      return;
    }
    options = {
      url: "/api/user/update",
      method: 'POST',
      data: $rootScope.userInfo
    };
    $scope.isSubmit = true;
    $scope.message = '';
    return ApiService.request(options, function(error, result) {
      var buySubscriptionUrl, subscription;
      $scope.isSubmit = false;
      if (error) {
        $scope.message = 'Cập nhật thông tin thất bại, vui lòng thử lại sau ít phút';
        return;
      }
      $rootScope.userInfo = result;
      $scope.openNationalSaved = true;
      $scope.closeNationalIdModal();
      subscription = $scope.selectedSubscription;
      buySubscriptionUrl = "/thanh-toan-goi-dang-ky/" + subscription.slug;
      return window.location.href = buySubscriptionUrl;
    });
  };
  $scope.toggleDescription = function(e) {
    return $(e.target).closest('.description').toggleClass('active');
  };
  $rootScope.$on('$loginSuccess', function(result) {
    var buySubscriptionUrl, nationalId, subscription;
    if (!$rootScope.userInfo) {
      return;
    }
    nationalId = $rootScope.userInfo.nationalId;
    if (!nationalId) {
      $scope.openNationalIdModal();
      return;
    }
    subscription = $scope.selectedSubscription;
    buySubscriptionUrl = "/thanh-toan-goi-dang-ky/" + subscription.slug;
    return window.location.href = buySubscriptionUrl;
  });
  return $scope.updateNationalIDModal = {
    id: "update-national-id-modal",
    title: "Thiếu thông tin Chứng Minh Nhân Dân",
    yes: "Đến trang thành viên",
    ok: function() {
      return location.href = "/thanh-vien";
    }
  };
};

_subscriptionController.$inject = ['$rootScope', '$scope', 'ApiService', 'UtitService'];

angular.module("appweb").controller('subscriptionController', _subscriptionController);
