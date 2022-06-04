var cancel = document.getElementById("cancel");
var main = document.getElementById("main");
cancel.addEventListener("click", cancel_);
main.addEventListener("click", go_main);
function go_main(){
    open("../html/index.html", "_self");
}
function cancel_(){
    //예약내용 취소.
    //db 연동하여 db 데이터 변경

    
    alert("취소되었습니다.");
}