// humanize date
export var hdate = require("human-date");

// ------------------------------------------
// text transform
export function titleCase(str) {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

export function goBack() {
  window.location.reload();
  // return (
  //   <Redirect
  //     to={"/user/" + localStorage.getItem("portfolio_id") + "/portfolio"}
  //   />
  // );
}

// ------------------------------------------
// month, year date format
var option1 = {
  year: "numeric",
  month: "long"
  // day: "numeric"
};

// datetime format
var option2 = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "Asia/Manila"
};

export var date = new Intl.DateTimeFormat("en-US", option1);
export var datetimeformat = new Intl.DateTimeFormat("en-US", option2);

// ------------------------------------------
// get current datetime

var tempDate = new Date();
export var datetime =
  tempDate.getFullYear() +
  "" +
  (tempDate.getMonth() + 1) +
  "-" +
  tempDate.getDate() +
  " " +
  tempDate.getHours() +
  ":" +
  tempDate.getMinutes() +
  ":" +
  tempDate.getSeconds();

// -------------------------------
// display image selected from storage
export function displayImage(preview, file) {
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function() {
      // convert image file to base64 string
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
