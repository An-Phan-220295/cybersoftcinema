let accessToken = getCookie("access-token");
$(document).ready(function () {
  var personType = document.getElementById("person-type");
  var HTMLAdd = `<option value="0">Vui lòng chọn</option>`;
  personType.innerHTML += HTMLAdd;
  $.ajax({
    url: `http://localhost:8080/admin/persontype`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    let data = result.data;
    data.forEach((item) => {
      var HTMLAdd = `<option value="${item.personTypeId}">${item.personTypeName}</option>`;
      personType.innerHTML += HTMLAdd;
    });
  });

  var country = document.getElementById("country");
  var HTMLAdd = `<option value="0">Vui lòng chọn</option>`;
  country.innerHTML += HTMLAdd;
  $.ajax({
    url: `http://localhost:8080/admin/country`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    let data = result.data;
    data.forEach((item1) => {
      var HTMLAdd = `<option value="${item1.countryId}">${item1.countryName}</option>`;
      country.innerHTML += HTMLAdd;
    });
  });
});

$(document).on("click", "#btn-add", function (e) {
  e.preventDefault();
  var name = $("#name").val();
  var birthday = $("#birthday").val();
  var personType = $("#person-type").val();
  var country = $("#country").val();
  var story = $("#story").val();
  var file_data = $("#picture").prop("files")[0];

  if (
    !Boolean(name) ||
    !Boolean(birthday) ||
    !Boolean(personType) ||
    !Boolean(country) ||
    !Boolean(story)
  ) {
    alert("Vui lòng điền thông tin đăng ký");
  } else {
    var form_data = new FormData();
    form_data.append("name", name);
    form_data.append("personTypeId", personType);
    form_data.append("picture", file_data);
    form_data.append("dob", birthday);
    form_data.append("countryId", country);
    form_data.append("story", story);

    $.ajax({
      url: "http://localhost:8080/admin/person/insert",
      headers: { Authorization: "Bearer " + accessToken },
      method: "post",
      contentType: false,
      processData: false,
      data: form_data,
    }).done(function (data) {
      console.log(data);
      if (data.message == "Successfully") {
        alert("Thêm thành công");
        location.reload();
      } else {
        alert("Email đã tồn tại, vui lòng thử lại!");
      }
    });
  }
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
