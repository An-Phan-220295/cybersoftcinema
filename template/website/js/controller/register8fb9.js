var _registerController;

_registerController = function(ApiService, $scope, $rootScope, UtitService) {
  var geoError, geoFound, options;
  $scope.message = '';
  $scope.isSubmit = false;
  $scope.isCountdownRefresh = true;
  $scope.captchaConfig = {
    type: 'register',
    refesh: function() {
      return console.log('init Refesh');
    }
  };
  $scope.openPolicy = function() {
    return $rootScope.$broadcast('$openPolicy');
  };
  $scope.user = {
    email: '',
    password: '',
    fullName: '',
    mobilePhone: '',
    confirmPassword: '',
    suburb: '',
    dateOfBirth: '',
    platform: '',
    coordinate: ''
  };
  $scope.genderSelect = {
    currentValue: '3d',
    options: [
      {
        id: 'Male',
        name: 'Nam'
      }, {
        id: 'Female',
        name: 'Nữ'
      }
    ],
    disablePlaceholder: true,
    placeholder: {
      name: 'Chọn giới tính',
      id: '3d'
    },
    keyValue: 'id',
    keyName: 'name'
  };
  $scope.registerStep = 'register';
  $scope.otpCountDown = 0;
  $scope.otpCountDownTime = 0;
  $scope.otpCountDownTimer = null;
  $scope.otpSender = '';
  $scope.$watch('genderSelect.currentValue', function(name) {
    return $scope.user.gender = name;
  });
  options = {
    url: "/api/city/find",
    method: 'GET',
    data: {}
  };
  ApiService.request(options, function(error, result) {
    var currentCity;
    if (error) {
      return UtitService.notify(null, error.message);
    }
    $scope.citySelect.options = result;
    currentCity = _.findWhere(result, {
      name: $scope.user.city
    });
    if (!currentCity) {
      return;
    }
    $scope.citySelect.currentValue = currentCity.id;
    return $scope.districtSelect.currentValue = $scope.user.suburb;
  });
  $scope.submit = function() {
    var code, data, dataLayer;
    $scope.message = null;
    code = $scope.user.code;
    if (!$scope.user.code) {
      $scope.message = "Chưa nhập code OTP!";
      return;
    }
    data = {
      fullName: $scope.user.fullName,
      email: $scope.user.email,
      mobilePhone: $scope.user.mobilePhone,
      password: $scope.user.password,
      confirmPassword: $scope.user.confirmPassword,
      gender: $scope.user.gender,
      dateOfBirth: $scope.user.dateOfBirth,
      platform: 'website',
      coordinate: localStorage.getItem('geoCoords') || ''
    };
    dataLayer = window.dataLayer || [];
    if ($scope.otpSender === 'zalo') {
      options = {
        url: "/api/v2/mobile/sms/validate-otp",
        method: 'POST',
        data: {
          phone: $scope.user.mobilePhone,
          pinCode: code
        }
      };
      ApiService.request(options, function(error, result) {
        if (error || result.response.code !== 0) {
          $scope.message = error.message;
          return;
        }
        options = {
          url: "/api/auth/register",
          method: 'POST',
          data: data
        };
        return ApiService.request(options, function(error, result) {
          $scope.isSubmit = false;
          if (error || result.code !== 0) {
            $scope.message = error.message;
            return;
          }
          dataLayer.push({
            event: "sign_up",
            customer: {
              customerId: result.memberId,
              customerGender: data.gender
            }
          });
          $scope.message = "";
          $scope.user = {
            email: '',
            password: '',
            fullName: '',
            mobilePhone: '',
            confirmPassword: '',
            city: '',
            suburb: '',
            dateOfBirth: '',
            address: ''
          };
          $scope.closeModel();
          $(".btn-select-input.date").datepicker('setDate', null);
          return $('#success-modal').modal('show');
        });
      });
      return;
    }
    if (!window.confirmationResult) {
      $scope.message = "Captcha hết hiệu lực, vui lòng thử lại";
      return;
    }
    window.confirmationResult.confirm(code).then((function(_this) {
      return function(result) {
        options = {
          url: "/api/auth/register",
          method: 'POST',
          data: data
        };
        return ApiService.request(options, function(error, result) {
          $scope.isSubmit = false;
          if (error || result.code !== 0) {
            $scope.message = error.message;
            return;
          }
          dataLayer.push({
            event: "sign_up",
            customer: {
              customerId: result.memberId,
              customerGender: data.gender
            }
          });
          $scope.message = "";
          $scope.user = {
            email: '',
            password: '',
            fullName: '',
            mobilePhone: '',
            confirmPassword: '',
            city: '',
            suburb: '',
            dateOfBirth: '',
            address: ''
          };
          $scope.closeModel();
          $(".btn-select-input.date").datepicker('setDate', null);
          return $('#success-modal').modal('show');
        });
      };
    })(this))["catch"]((function(_this) {
      return function(error) {
        $scope.message = "Mã OTP không hợp lệ, vui lòng thử lại";
        $scope.isSubmit = false;
      };
    })(this));
  };
  $scope.submitOTP = function() {
    var data, dob, phoneNumber, phonePattern;
    $scope.message = null;
    if ($scope.isSubmit) {
      return;
    }
    $scope.isSubmit = true;
    phonePattern = /^(\+84|0)(\d{9}|\d{10})$/i;
    if (!$scope.user.mobilePhone.match(phonePattern)) {
      $scope.message = "Số điện thoại chưa đúng!";
      $scope.isSubmit = false;
      return;
    }
    if (!$scope.user.gender || $scope.user.gender === '3d') {
      $scope.message = "Chưa chọn giới tính!";
      $scope.isSubmit = false;
      return;
    }
    if (!$scope.user.dateOfBirth) {
      $scope.message = "Chưa chọn ngày sinh!";
      $scope.isSubmit = false;
      return;
    }
    if ($scope.user.password.length < 8) {
      $scope.message = "Vui lòng mật khẩu trên 8 ký tự.";
      $scope.isSubmit = false;
      return;
    }
    if ($scope.user.password !== $scope.user.confirmPassword) {
      $scope.message = "Mật khẩu xác nhận không khớp";
      $scope.isSubmit = false;
      return;
    }
    phoneNumber = $scope.user.mobilePhone.replace(/^0/i, '+84');
    dob = moment($scope.user.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data = {
      fullName: $scope.user.fullName,
      email: $scope.user.email,
      phone: phoneNumber,
      password: $scope.user.password,
      gender: $scope.user.gender,
      birthDay: dob,
      platform: 'website'
    };
    options = {
      url: "/api/v2/mobile/user/send-otp",
      method: 'POST',
      data: data
    };
    return ApiService.request(options, function(error, result) {
      var appVerifier, ref;
      $scope.isSubmit = false;
      if (error || result.response.code !== 0) {
        $scope.message = error.data.message;
        return;
      }
      $scope.otpSender = result != null ? (ref = result.data) != null ? ref.sender : void 0 : void 0;
      if ($scope.otpSender === 'zalo') {
        $scope.registerStep = 'otp';
        $scope.otpCountDownTime = result.data.countTime;
        $scope.otpCountDown = $scope.otpCountDownTime;
        $scope.otpCountDownTimer = setInterval(function() {
          $scope.otpCountDown--;
          $scope.$apply();
          if ($scope.otpCountDown <= 0) {
            return clearInterval($scope.otpCountDownTimer);
          }
        }, 1000);
        return;
      }
      if (!firebase.apps.length) {
        firebase.initializeApp(window.firebaseConfig);
      } else {
        firebase.app();
      }
      $('#recaptcha-container').remove();
      $('<div>', {
        id: 'recaptcha-container'
      }).appendTo($('body'));
      appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (function(_this) {
          return function(response) {
            return {};
          };
        })(this),
        'expired-callback': (function(_this) {
          return function() {
            return {};
          };
        })(this)
      });
      return firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then((function(_this) {
        return function(confirmationResult) {
          window.confirmationResult = confirmationResult;
          if (appVerifier) {
            appVerifier.clear();
          }
          $scope.registerStep = 'otp';
          $scope.otpCountDownTime = result.data.countTime;
          $scope.otpCountDown = $scope.otpCountDownTime;
          return $scope.otpCountDownTimer = setInterval(function() {
            $scope.otpCountDown--;
            $scope.$apply();
            if ($scope.otpCountDown <= 0) {
              return clearInterval($scope.otpCountDownTimer);
            }
          }, 1000);
        };
      })(this))["catch"](function(err) {
        $scope.message = "Hệ thống không thể gửi OTP đến số điện thoại đăng ký, vui lòng thử lại";
        $scope.isSubmit = false;
      });
    });
  };
  $scope.recallOTP = function() {
    var phoneNumber;
    phoneNumber = $scope.user.mobilePhone.replace(/^0/i, '+84');
    if ($scope.otpSender === 'zalo') {
      $scope.isSubmit = true;
      options = {
        url: "/api/v2/mobile/sms/send-otp",
        method: 'POST',
        data: {
          phone: window.registerUser.phone
        }
      };
      ApiService.request(options, function(error, result) {
        $scope.isSubmit = false;
        if (error || result.response.code !== 0) {
          $scope.message = error.data.message;
          return;
        }
        $scope.otpCountDown = $scope.otpCountDownTime;
        return $scope.otpCountDownTimer = setInterval(function() {
          $scope.otpCountDown--;
          $scope.$apply();
          if ($scope.otpCountDown <= 0) {
            return clearInterval($scope.otpCountDownTimer);
          }
        }, 1000);
      });
      return;
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(window.firebaseConfig);
    } else {
      firebase.app();
    }
    options = {
      url: "/api/v2/mobile/user/send-otp",
      method: 'POST',
      data: window.registerUser
    };
    return ApiService.request(options, function(error, result) {
      var appVerifierRecall;
      $scope.isSubmit = false;
      if (error) {
        $scope.message = error.data.message;
        return;
      }
      if (result.response.code === 0) {
        if (!firebase.apps.length) {
          firebase.initializeApp(window.firebaseConfig);
        } else {
          firebase.app();
        }
        $('#recaptcha-container').remove();
        $('<div>', {
          id: 'recaptcha-container'
        }).appendTo($('body'));
        appVerifierRecall = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (function(_this) {
            return function(response) {
              return {};
            };
          })(this),
          'expired-callback': (function(_this) {
            return function() {
              return {};
            };
          })(this)
        });
        return firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifierRecall).then((function(_this) {
          return function(confirmationResult) {
            window.confirmationResult = confirmationResult;
            $scope.otpCountDown = result.data.countTime;
            if (appVerifierRecall) {
              appVerifierRecall.clear();
            }
            return $scope.otpCountDownTimer = setInterval(function() {
              $scope.otpCountDown--;
              $scope.$apply();
              if ($scope.otpCountDown <= 0) {
                return clearInterval($scope.otpCountDownTimer);
              }
            }, 1000);
          };
        })(this))["catch"](function(err) {
          $scope.message = "Hệ thống không thể gửi OTP đến số điện thoại đăng ký, vui lòng thử lại";
          $scope.isSubmit = false;
        });
      }
    });
  };
  $scope.closeModelSuccess = function() {
    return $('#success-modal').modal('hide');
  };
  geoFound = function(position) {
    return localStorage.setItem('geoCoords', position.coords.latitude + ',' + position.coords.longitude);
  };
  geoError = function(error) {
    return localStorage.setItem('geoCoords', '');
  };
  return navigator.geolocation.getCurrentPosition(geoFound, geoError);
};

_registerController.$inject = ['ApiService', '$scope', '$rootScope', 'UtitService'];

angular.module("appweb").controller('registerController', _registerController);
