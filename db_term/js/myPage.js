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
cancel_infos = [];

function search() {
  let s_date, e_date;
  s_date = document.getElementById("start_date").value;
  e_date = document.getElementById("end_date").value;
  console.log(s_date);
  console.log(e_date);
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
        let status = text[i].STATUS;
        info.push(room);
        info.push(sdate);
        info.push(mid);
        info.push(sid);
        info.push(seats);
        info.push(status);
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
            // console.log(infos[0][0]);
            // console.log(infos[0]);
            let movie_title;

            for (let i = 0; i < text.length; i++) {
              if (Number(text[i].MID) == Number(infos[0][2])) {
                //mid동일. 찾음.
                movie_title = text[i].TITLE;
              }
            }
            let csYY, csMM, csDD; //사용자 입력 시작 날짜.
            let ceYY, ceMM, ceDD; //사용자 입력 끝나는 날짜.
            csYY = s_date.split("/")[0]; //연도
            csMM = s_date.split("/")[1]; //월
            csDD = s_date.split("/")[2]; //일

            ceYY = e_date.split("/")[0];
            ceMM = e_date.split("/")[1];
            ceDD = e_date.split("/")[2];

            let d1 = new Date(2000 + Number(csYY), Number(csMM), Number(csDD));
            let d2 = new Date(2000 + Number(ceYY), Number(ceMM), Number(ceDD));

            console.log(d1 + " ", d2);
            let dateYY = infos[0][1].split(" ")[0].split("/")[0]; //쿼리문 상영 연도
            let dateMM = infos[0][1].split(" ")[0].split("/")[1]; //상영 월
            let dateDD = infos[0][1].split(" ")[0].split("/")[2]; //상영 일
            let dateTime = infos[0][1].split(" ")[1].split(".")[0];
            let dateDay = infos[0][1].split(" ")[0];
            console.log(dateYY + " " + dateMM + " " + dateDD);
            console.log(
              d1 -
                new Date(2000 + Number(dateYY), Number(dateMM), Number(dateDD))
            );
            let queryDate = new Date(
              2000 + Number(dateYY),
              Number(dateMM),
              Number(dateDD)
            ); //각 티켓팅 내역의 상영일 date객체.
            //범위 내의 내역만 보여준다.
            // if (d1 <= queryDate && d2 >= queryDate)
            if (infos[0][5] == "r") {
              // console.log(cYY);
              //예약 상태 =  아직 안봄.
              $(`#tbody`).append(`<tr class="row">
                                                <td>${movie_title}</td>
                                                <td>${infos[0][0]}</td>
                                                <td>${dateDay}</td>
                                                <td>${infos[0][1]}</td>
                                                <td>${infos[0][5]}</td>
                                                
                                                <td><input class = "check" type="checkbox"></td>
                                                
                                                <tr>`);
            } else {
              //예약 상태가 아닌것은 선택 불가.
              $(`#tbody`).append(`<tr class="row">
                <td>${movie_title}</td>
                <td>${infos[0][0]}</td>
                <td>${infos[0][1]}</td>
                <td>${infos[0][1]}</td>
                <td>${infos[0][5]}</td>
                
                <td><input class = "check" disabled="true" type="checkbox"></td>
                
                <tr>`);
            }

            // console.log(movie_title);
          }
          $(`.check`).on("click", function () {
            let temp = [];
            let title = $(this).parent().parent().children().eq(0).text();
            let room = $(this).parent().parent().children().eq(1).text();
            let dateDay = $(this).parent().parent().children().eq(2).text();
            let dateTime = $(this).parent().parent().children().eq(3).text();
            let status = $(this).parent().parent().children().eq(4).text();
            temp.push(title);
            temp.push(room);
            temp.push(dateDay);
            temp.push(dateTime);
            temp.push(status);
            cancel_infos.push(temp);
            console.log(cancel_infos);
            console.log($(this).parent().parent().children().eq(1).text());
          });
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
function box_click() {
  console.log($(this).children());
  //   $(this).parent();
  //   console.log($(this).parent().index());
}

function cancel_() {
  //   console.log("this");
  //예약내용 취소.
  //db 연동하여 db 데이터 변경
  $(`.check`).click(function () {
    console.log($(this));
  });
  $.ajax({
    url: "../php/myPage.php",
    type: "GET",
    data: {
      type: "cancel",
      cancel: cancel_infos,
    },
    success: function (res) {
      console.log(res);
    },
    error: function (e) {
      console.log(e);
    },
  });
  alert("취소되었습니다.");
}
