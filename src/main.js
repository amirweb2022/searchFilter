let searchKey = {};
window.onload = function () {
  let mock1 = new House(
    "۶۰ متر نوساز یک خواب",
    "/src/images/1.webp",
    "آژانس املاک در جنت آباد جنوبی",
    "buy",
    "apartment",
    "سعادت آباد",
    2100000000,
    60,
    1,
    1401,
    1,
    true,
    true,
    true
  );
  let mock2 = new House(
    "۶۰ متر نوساز یک خواب",
    "/src/images/2.webp",
    "آژانس املاک در جنت آباد جنوبی",
    "rent",
    "apartment",
    "سعادت آباد",
    2100000000,
    60,
    1,
    1401,
    1,
    true,
    true,
    true
  );
  let mock3 = new House(
    "واحد ۸۷ متری معلم پارک کسمائی فول امکانات",
    "https://s101.divarcdn.com/static/pictures/1660497878/gYk7_iNQ.jpg",
    "مشاورین املاک هاشمی فرد",
    "rent",
    "apartment",
    "پارک کسمائی",
    1850000000,
    87,
    4,
    1392,
    2,
    true,
    true,
    true
  );
  HouseHandler.addData(mock1);
  HouseHandler.addData(mock2);
  HouseHandler.addData(mock3);
  fillData(HouseHandler.getDataList());
  locationAdd();
};
function openNewAdsBox() {
  const addAdsHolder = document.getElementById("add-ads-holder");
  addAdsHolder.style.display = "block";
}
function closeNewAdsBox() {
  const addAdsHolder = document.getElementById("add-ads-holder");
  addAdsHolder.style.display = "none";
}
function clearForm() {
  let addForm = document.getElementById("add-form");
  (addForm["title"].value = ""),
    (addForm["image"].value = ""),
    (addForm["agency"].value = ""),
    (addForm["adsType"].value = ""),
    (addForm["houseType"].value = ""),
    (addForm["location"].value = ""),
    (addForm["price"].value = ""),
    (addForm["area"].value = ""),
    (addForm["roomCount"].value = ""),
    (addForm["year"].value = ""),
    (addForm["floor"].value = ""),
    (addForm["warehouse"].value = ""),
    (addForm["elevator"].value = ""),
    (addForm["parking"].value = "");
}
function fillData(datelist) {
  let template = document.getElementById("ads-item-template").innerHTML;
  let holder = document.getElementById("main-holder");
  holder.innerHTML = "";
  for (let index = 0; index < datelist.length; index++) {
    let curentTeplate = template;
    let curentTemplateItem = datelist[index];
    curentTeplate = curentTeplate.replace(
      "__TITLE__",
      curentTemplateItem.title
    );
    curentTeplate = curentTeplate.replace(
      "__PRICE__",
      curentTemplateItem.price
    );
    curentTeplate = curentTeplate.replace(
      "__AGENCY__",
      curentTemplateItem.agency
    );
    curentTeplate = curentTeplate.replace("__IMG__", curentTemplateItem.image);
    holder.innerHTML += curentTeplate;
  }
}
function createNewAds() {
  if (!isValidate()) {
    return;
  }
  let addForm = document.getElementById("add-form");
  let data = new House(
    addForm["title"].value,
    addForm["image"].value,
    addForm["agency"].value,
    addForm["adsType"].value,
    addForm["houseType"].value,
    addForm["location"].value,
    Number(addForm["price"].value),
    Number(addForm["area"].value),
    Number(addForm["roomCount"].value),
    Number(addForm["year"].value),
    Number(addForm["year"].value),
    Boolean(addForm["warehouse"].value),
    Boolean(addForm["elevator"].value),
    Boolean(addForm["parking"].value)
  );
  HouseHandler.addData(data);
  fillData(HouseHandler.getDataList());
  clearForm();
  closeNewAdsBox();
}

function isValidate() {
  let addForm = document.getElementById("add-form");
  if (addForm["title"].value == "") {
    alert("لطفا عنوان آگهی را وارد کنید");
    return false;
  }
  if (addForm["agency"].value == "") {
    alert("لطفا آژانس املاکی را وارد کنید");
    return false;
  }
  if (addForm["image"].value == "") {
    alert("لطفا آدرس عکس را وارد کنید");
    return false;
  }
  if (addForm["location"].value == 0) {
    alert("لطفا محل را وارد کنید");
    return false;
  }
  if (addForm["price"].value == "") {
    alert("لطفا قیمت را وارد کنید");
    return false;
  }
  if (addForm["area"].value == "") {
    alert("لطفا متراژ را وارد کنید");
    return false;
  }
  if (addForm["roomCount"].value == "") {
    alert("لطفا تعداد اتاق را وارد کنید");
    return false;
  }
  if (addForm["year"].value == "") {
    alert("لطفا سال ساخت را وارد کنید");
    return false;
  }
  if (addForm["floor"].value == "") {
    alert("لطفا تعداد طبقه را وارد کنید");
    return false;
  }
  return true;
}

function locationAdd() {
  let locations = [
    "ونک",
    "سعدت آباد",
    "جردن",
    "پاسداران",
    "آزادی",
    "شهرک غرب",
    "بلوار ارتش",
    "چوکام",
  ];
  let element = document.getElementsByClassName("locations");
  for (elem of element) {
    for (loc of locations) {
      elem.innerHTML += `<option value="${loc}">${loc}</option>`;
    }
  }
}
function search() {
  const result = HouseHandler.getDataList().slice(0);
  let key = searchKey;
  for (let index = 0; index < result.length; index++) {
    if (
      key.adsType != undefined &&
      result[index].adsType.toLowerCase().indexOf(key.adsType.toLowerCase()) < 0
    ) {
      result.splice(index, 1);
      index--;
      continue;
    }
    if (
      key.houseType != undefined &&
      result[index].houseType
        .toLowerCase()
        .indexOf(key.houseType.toLowerCase()) < 0
    ) {
      result.splice(index, 1);
      index--;
      continue;
    }
    if (
      key.location != undefined &&
      result[index].location.indexOf(key.location) < 0
    ) {
      result.splice(index, 1);
      index--;
      continue;
    }
    if (
      key.minPrice != undefined &&
      key.minPrice != "" &&
      key.minPrice > 0 &&
      result[index].price >= 0
    ) {
      result.splice(index, 1);
      index--;
      continue;
    }
    if (
      key.maxPrice != undefined &&
      key.maxPrice != "" &&
      key.maxPrice > 0 &&
      result[index].price <= 0
    ) {
      result.splice(index, 1);
      index--;
      continue;
    }
    if (
      key.minArea != undefined &&
      key.minArea != "" &&
      key.minArea > 0 &&
      result[index].area <= 0
    ) {
      result.splice(index, 1);
      index--;
      continue;
    }
    if (
      key.maxArea != undefined &&
      key.maxArea != "" &&
      key.maxArea > 0 &&
      result[index].area <= 0
    ) {
      result.splice(index, 1);
      index--;
      continue;
    }
  }
  fillData(result);
}

function changeFilter(ele, key, value) {
  switch (key) {
    case "adsType":
      searchKey.adsType = value;
      for (let index = 0; index < ele.parentNode.children.length; index++) {
        ele.parentNode.children[index].style.color = "#808080";
      }
      ele.style.color = "#000";
      break;
    case "houseType":
      searchKey.houseType = value;
      for (let index = 0; index < ele.parentNode.children.length; index++) {
        ele.parentNode.children[index].style.color = "#808080";
      }
      ele.style.color = "#000";
      break;
    case "location":
      searchKey.location = ele.value;
      break;
      case "price":
        searchKey.price = ele.value;
        break;
      case "area":
        searchKey.area = ele.value;
        break;
  }
}