var cancel = document.getElementById("cancel");
cancel.addEventListener("click", cancel_display);
var mainLogo = document.getElementById("main");
mainLogo.addEventListener("click", open_main);
let check_id = false;

function open_main() {
    open("../html/index.html", "_self");
}

function cancel_display() {
    open("../html/login.html","_self");
}


document.getElementById("signup1").addEventListener("click", signup); 
//회원가입 정보 입력

function signup() {
    var kk = false;
    
    var name1 = document.getElementById("name").value;
    var id1 = document.getElementById("id1").value;
    var pw1 = document.getElementById("pw1").value;
    var email1 = document.getElementById("email").value;
    var sex1 = document.getElementById("sex").value;
    var birth_date1 = document.getElementById("birth_date").value;

    //아이디 중복검사
    //db와 연동하여 회원가입 절차 진행
    

    //완료시,
    open("../html/login.html", "_self");
}
