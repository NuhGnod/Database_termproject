var reservation = document.getElementById("reservation");
var logo = document.getElementById("main");
logo.addEventListener("click", go_main);
reservation.addEventListener("click", reservation_);
function go_main() {
  open("../html/index.html", "_self");
}
let theater_infos = []; // 상영관 이름, 상영관 총 좌석 수
let schedule_infos = [];
let movie_title;
function init() {
  //db연동
  let arr = [];
  let reservation = sessionStorage.getItem("reservation").split(",#,");
  let temp = [];
  for (let i = 0; i < reservation.length; i++) {
    let title = reservation[i].split(",")[0];
    movie_title = title;
    temp.push(title);

    arr.push(temp);
    temp = [];
  }
  //   console.log(arr);
  //   console.log(reservation[0]);
  //   console.log(reservation[1]);
  let sids = [];

  $.ajax({
    //해당 영화의 스케쥴 출력.
    url: "../php/reservation.php",
    type: "GET",
    data: {
      type: "init",
      reservation: arr,
    },
    success: function (res) {
      console.log(res);
      let text = JSON.parse(res); //seats도 총 좌석수.
      //{SDATETIME: '22/05/01 12:00:00.000000', TNAME: '2관', MID: '2', SID: '9', SEATS: '40'}
      console.log(text);

      for (let i = 0; i < text.length; i++) {
        schedule_infos.push(text[i]);
        // console.log(Number(text[i].SID));
        sids.push(Number(text[i].SID));
      }
      console.log(schedule_infos);
      $.ajax({
        //init으로 모든 상영관 정보 출력.
        url: "../php/reservation.php",
        type: "GET",
        data: {
          type: "theater",
        },
        success: function (res) {
          console.log(res);
          let text = JSON.parse(res);
          //{TNAME: '1관', SEATS: '30'}
          //   console.log(text);
          for (let i = 0; i < text.length; i++) {
            theater_infos.push(text[i]); //각 영화관의 상영관의 총좌석
          }
          console.log(theater_infos);

          console.log(sids);
          $.ajax({
            //{SID: '9', SUM(SEATS): '20'}

            //해당 영화 스케쥴 별로 예매자 수 출력.
            url: "../php/reservation.php",
            type: "GET",
            data: {
              type: "count", //예매자 수.
              sids: sids,
            },
            success: function (res) {
              console.log(res);
              let text = JSON.parse(res);
              console.log(text);
              $(`#tbody`).empty();
              for (let i = 0; i < schedule_infos.length; i++) {
                let title = movie_title;
                let tname = schedule_infos[i].TNAME;
                let date = schedule_infos[i].SDATETIME;
                let time = schedule_infos[i].SDATETIME;
                let remain_seats;
                let sumSeats = text[i].SUMSEATS; //예약된 좌석수
                // console.log(sumSeats);
                for (let j = 0; j < theater_infos.length; j++) {
                  let seats = theater_infos[j].SEATS; //해당 상영관 총 좌석수
                  let tname_ = theater_infos[j].TNAME;
                  if (tname_ == tname) {
                    //동일 영화룸
                    remain_seats = seats - sumSeats; //남아있는 좌석수
                    break;
                  }
                }

                $(`#tbody`).append(`<tr>
                                                <td>${title}</td>
                                                <td>${tname}</td>
                                                
                                                <td>${date}</td>
                                                <td>${time}</td>
                                                <td>${remain_seats}</td>
                                                <td><input type="number" max="10"> </td>

                                                <td><input class = "check" type="checkbox"></td>
                                                
                                                <tr>`);
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
    },
    error: function (e) {
      console.log(e);
    },
  });
}

function reservation_() {
  //체크박스 개수 1개 체크
  open("../html/index.html", "_self");
}
init();
