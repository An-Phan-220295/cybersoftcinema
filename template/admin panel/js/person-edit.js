let accessToken = getCookie("access-token");
var idurl = window.location.search;
const urlParams = new URLSearchParams(idurl);
var personId = urlParams.get("personId");

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
      $.ajax({
        url: `http://localhost:8080/admin/person/getperson?personId=${personId}`,
        headers: { Authorization: "Bearer " + accessToken },
        method: "get",
        contentType: "application/json; charset=utf-8",
      }).done(function (result) {
        var list = document.getElementById("list");
        let item2 = result.data;

        var HTMLAdd = `<tr class= "user-info" value = "${item2.personId}">
          <td >${item2.personId}</td>
          <td>${item2.personName}</td>
          <td><img src="${item2.picture}" width="150px"></td>
          <td>${formatDate(item2.birthday)}</td>
          <td>${item2.personTypeName}</td>
          <td>${item2.countryName}</td>
          <td>${item2.story}</td>
        </tr>`;

        list.innerHTML += HTMLAdd;

        selectOptionByValue("person-type", item2.personTypeId);
        selectOptionByValue("country", item2.countryId);
        document.getElementById("name").value = `${item2.personName}`;
        document.getElementById("birthday").value = `${item2.birthday}`;
        document.getElementById("story").value = `${item2.story}`;
      });
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
  var checkImage = $("#picture").prop("files").length;

  if (
    !Boolean(name) ||
    !Boolean(birthday) ||
    !Boolean(personType) ||
    !Boolean(country) ||
    !Boolean(story)
  ) {
    alert("Vui lòng điền thông tin đăng ký");
  } else {
    if (checkImage === 0) {
      alert("Vui lòng thêm hình ảnh");
    } else {
      var form_data = new FormData();
      form_data.append("personId", personId);
      form_data.append("name", name);
      form_data.append("personTypeId", personType);
      form_data.append("picture", file_data);
      form_data.append("dob", birthday);
      form_data.append("countryId", country);
      form_data.append("story", story);

      $.ajax({
        url: "http://localhost:8080/admin/person/update",
        headers: { Authorization: "Bearer " + accessToken },
        method: "put",
        contentType: false,
        processData: false,
        data: form_data,
      }).done(function (data) {
        console.log(data);
        if (data.message == "Successfully") {
          alert("Cập nhật thành công");
          location.reload();
        } else {
          alert("Cập nhật thất bại, vui lòng thử lại!");
        }
      });
    }
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
function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}
function selectOptionByValue(selectId, itemValue) {
  var options = document.getElementById(selectId).options;

  for (var i = 0; i < options.length; i++) {
    if (options[i].value == itemValue) {
      document.getElementById(selectId).selectedIndex = i;
      break;
    }
  }
}
