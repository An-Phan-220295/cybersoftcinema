var _summarySeatsDir, _summaryTicketDir, _summaryVoucherDir;

_summaryTicketDir = function($rootScope, $document) {
  var directive, link, templatePrice;
  templatePrice = "<span>{{((bookingTotal != -1 ? bookingTotal : totalTicket) + totalConcession - discount - loyaltyDiscount) | currency : \"\" : 0}} VNĐ</span>";
  link = function($scope, $element, $attr) {
    $scope.$watch('concessionsGroup', function(data) {
      if (data === void 0) {
        return;
      }
      $scope.concessions = [];
      _.map(data, function(item) {
        return $scope.concessions = _.union(item.concessionItems, $scope.concessions);
      });
      $scope.totalConcession = 0;
      return _.map($scope.concessions, function(item) {
        return $scope.totalConcession = $scope.totalConcession + item.defaultQuantity * item.displayPrice;
      });
    }, true);
    $scope.$watch('items', function(data) {
      $scope.totalTicket = 0;
      return _.map(data, function(item) {
        return $scope.totalTicket = $scope.totalTicket + item.defaultQuantity * item.displayPrice;
      });
    }, true);
    return $scope.$watch('bookingTickets', function(data) {
      if (!data.length) {
        $scope.bookingTotal = -1;
        return;
      }
      $scope.bookingTotal = 0;
      return _.map(data, function(item) {
        return $scope.bookingTotal += parseInt(item.price);
      });
    }, true);
  };
  directive = {
    restrict: 'E',
    scope: {
      items: '=ngModel',
      concessionsGroup: '=ngConcession',
      discount: '=ngDiscount',
      loyaltyDiscount: '=ngLoyaytyDiscount',
      bookingTickets: '=ngBookingTickets'
    },
    template: templatePrice,
    link: link
  };
  return directive;
};

_summaryTicketDir.$inject = ['$rootScope', '$document'];

_summarySeatsDir = function() {
  var directive, link, template;
  template = "<span class='select-seat'>{{seatLabel.toString()}}</span>\n<ul class='booking-ticket-seats' ng-if='items.length'>\n  <li ng-repeat='item in items'>\n    <strong>{{item.qty}}x</strong> <strong>{{item.description}}:</strong> <strong>{{item.price | currency : \"\" : 0}} VNĐ</strong>\n  </li>\n</ul>";
  link = function($scope) {
    return $scope.$watch('tickets', function(data) {
      $scope.items = [];
      return _.map(data, function(ticket) {
        var description, item, price, seatName, ticketTypeCode;
        ticketTypeCode = ticket.ticketTypeCode, description = ticket.description, seatName = ticket.seatName, price = ticket.price;
        item = $scope.items.find(function(ele) {
          return ele.ticketTypeCode === ticketTypeCode;
        });
        if (!item) {
          item = {
            qty: 1,
            description: description,
            ticketTypeCode: ticketTypeCode,
            price: price,
            seats: [seatName]
          };
          return $scope.items.push(item);
        } else {
          item.qty++;
          item.price += price;
          return item.seats.push(seatName);
        }
      });
    }, true);
  };
  directive = {
    restrict: 'E',
    scope: {
      tickets: '=ngModel',
      seatLabel: '=ngSeatLabel'
    },
    template: template,
    link: link
  };
  return directive;
};

_summarySeatsDir.$inject = [];

_summaryVoucherDir = function() {
  var directive, link, template;
  template = "<div class='voucher-summary'>\n  <p ng-if='items.length'>\n    <strong>Danh sách voucher đã sử dụng:</strong>\n  </p>\n  <ul class='applied-voucher-items' ng-if='items.length'>\n    <li ng-repeat='item in items'>\n      <strong>{{item.name}}</strong>\n      <a class='remove-voucher' ng-click='removeVoucher(item)'>X</a>\n    </li>\n  </ul>\n  <p class='discount-amount' ng-if='discountAmount > 0'>\n    <strong>Khuyến mãi:</strong>\n    <strong class='price'>{{discountAmount | currency : \"\" : 0}} VNĐ</strong>\n  </p>\n</div>";
  link = function($scope) {};
  directive = {
    restrict: 'E',
    replace: true,
    scope: {
      items: '=ngModel',
      discountAmount: '=ngDiscountAmount',
      removeVoucher: '=ngRemoveVoucher'
    },
    template: template,
    link: link
  };
  return directive;
};

_summaryVoucherDir.$inject = [];

angular.module('appweb').directive("galaxySummaryTicket", _summaryTicketDir);

angular.module('appweb').directive("galaxySummarySeats", _summarySeatsDir);

angular.module('appweb').directive("galaxySummaryVoucher", _summaryVoucherDir);
