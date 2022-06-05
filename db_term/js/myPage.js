var cancel = document.getElementById("cancel");
var main = document.getElementById("main");
cancel.addEventListener("click", cancel_);
main.addEventListener("click", go_main);
var search_ = document.getElementById("category_search");
search_.addEventListener("click", search);
function go_main() {
  open("../html/index.html", "_self");
}

db_infos = []; //ticket_schedule 배열
db_mids = [];
function search() {
  let id0 = sessionStorage.getItem("id");
  console.log(id0);
  console.log(`myPage`);
  $.ajax({
    url: "../php/myPage.php",
    type: "GET",
    data: {
      id: Number(id0),
      type: "ticket_schedule",
    },
    success: function (res) {
      console.log(res);
      let text = JSON.parse(res);
      console.log(text);
      for (let i = 0; i < text.length; i++) {
        let info = [];
        let room = text[i].TNAME;
        let sdate = text[i].SDATETIME;
        let mid = text[i].MID;
        let sid = text[i].SID;
        let seats = text[i].SEATS;
        info.push(room);
        info.push(sdate);
        info.push(mid);
        info.push(sid);
        info.push(seats);
        db_infos[i] = info;
        db_mids[mid] = Number(mid);
      }
      console.log(db_mids);
      console.log(db_infos);

      $.ajax({
        url: "../php/myPage.php",
        type: "GET",
        data: {
          type: "movie",
          mid: db_mids,
        },
        success: function (res) {
          let movie_info = []; //영화의mid가 담길 배열.
          console.log(res);
          let text = JSON.parse(res);
          console.log(text); //text는 회원이 예약한 내역들의 영화 정보들을 모두 리턴한다.

          for (let i = 0; i < text.length; i++) {
            movie_info[text[i].MID] = text[i].MID; // mid 값 담음.
          }
          console.log(movie_info);
          console.log(db_infos);
          $("tbody").empty();
          for (let i = 0; i < db_infos.length; i++) {
            let infos = []; //db_infos 파싱한 배열.
            infos.push(db_infos[i]); //2idx가 mid
            console.log(infos[0][0]);
            console.log(infos[0]);
            let movie_title;

            for (let i = 0; i < text.length; i++) {
              if (Number(text[i].MID) == Number(infos[0][2])) {
                //mid동일. 찾음.
                movie_title = text[i].TITLE;
              }
            }
            $(`#tbody`).append(`<tr>
                                                <td>${movie_title}</td>
                                                <td>${infos[0][0]}</td>
                                                <td>${infos[0][1]}</td>
                                                <td>${infos[0][1]}</td>
                                                
                                                <td><input class = "check" disabled="true" type="checkbox"></td>
                                                
                                                <tr>`);
            console.log(movie_title);
          }
        },
        error: function (e) {
          console.log(e);
        },
      });
    },
    error: function (e) {
      console.log(e);
    },
  });
}
function cancel_() {
  //예약내용 취소.
  //db 연동하여 db 데이터 변경

  alert("취소되었습니다.");
}
