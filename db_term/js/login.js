var sign_up = document.getElementById("signup");
sign_up.addEventListener("click", signup_display);
var mainLogo = document.getElementById("main");
mainLogo.addEventListener("click", open_main);
//회원가입 페이지로 이동
function signup_display() {
  window.open("../html/signup.html", "_self");
}

function open_main() {
  open("../html/index.html", "_self");
}

//로그인
document.getElementById("login").addEventListener("click", login);
var loginOk = 0;

function login() {
  var id0 = document.getElementById("id").value;
  var pw0 = document.getElementById("password").value;

  if (id0 == "" || pw0 == "") {
    alert("빈칸을 입력해주세요.");
  } else {
    var b = false;
    //db와 연동하여 로그인 확인
    $.ajax({
      url: "../php/login.php",
      type: "GET",
      data: {
        id: id0,
        pw: pw0,
      },

      success: function (res) {
        console.log(res);
        let text = JSON.parse(res);
        console.log(text);
        console.log(id0 + pw0);
        if (
          Number(text[0].CID) == Number(id0) &&
          Number(text[0].PASSWORD) == Number(pw0)
        ) {
          b = true;
        }
        if (b == true) {
          sessionStorage.setItem("id", id0);
          sessionStorage.setItem("login", true);

          if (Number(id0) == 99999) {
            alert("관리자 로그인 되었습니다.");

            //관리자 로그인.
            open("../html/manager.html", "_self");
          } else {
            alert("로그인 되었습니다.");

            open("../html/index.html", "_self");
          }
        } else {
          alert(`사용자 정보가 틀립니다.`);
        }
      },
      error: function (e) {
        console.log(e);
      },
    });

    //성공시,
  }
}
