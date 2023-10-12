function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "unknown";
};

switch (getMobileOperatingSystem()) {
  case 'Android':
    setTimeout(function () {
      window.location = "https://play.google.com/store/apps/details?id=com.galaxy.cinema";
    }, 100);
    window.location = "galaxycinema://";
    break;
  case 'iOS':
    setTimeout(function () { window.location = "https://apps.apple.com/vn/app/id593312549"; }, 100);
    window.location = "galaxycinema://";
    break;
}