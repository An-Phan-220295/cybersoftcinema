// XMLHttpRequest.prototype.open = (function (open) {
//   return function (method, url, async) {
//     open.apply(this, arguments);
//     this.setRequestHeader(
//       "Authorization",
//       "Bearer " + localStorage.getItem("token")
//     );
//   };
// })(XMLHttpRequest.prototype.open);
function tryit() {
  var win = window.open("_blank");
  downloadFile("/pdf", function (blob) {
    var url = URL.createObjectURL(blob);
    win.location = url;
  });
}
function downloadFile(url, success) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  xhr.responseType = "blob";
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (success) success(xhr.response);
    }
  };
  xhr.send(null);
}
