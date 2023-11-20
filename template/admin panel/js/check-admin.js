$(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
  console.error("Lỗi yêu cầu Ajax:", jqXHR.status, thrownError);
  console.log(jqXHR.status === 403);
  if (jqXHR.status === 403) {
    alert("Vui lòng đăng nhập!");
    window.location.href = "../index.html";
  }
});
