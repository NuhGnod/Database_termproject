var myPage = document.getElementById("my_page");
myPage.addEventListener("click", my_page);
var reservation = document.getElementById("reservation");
reservation.addEventListener("click", reservation_);
var _login = document.getElementById("login");
var _logout = document.getElementById("logout");
_login.addEventListener("click", login_);
_logout.addEventListener("click", logout_);

var search_ = document.getElementById("category_search");
var title_ = document.getElementById("category_input");
var yy_ = document.getElementById("yy");
var mm_ = document.getElementById("mm");
var dd_ = document.getElementById("dd");
var select = search_.addEventListener("click", search);
function search() {
  let db_mid;
  let db_title;
  let db_open_day;
  let db_director;
  let db_actors = [];
  let actors = [];
  let db_ticketing_infoR = [];
  let db_ticketing_infoW = [];
  let db_length;
  let db_rating;
  let db_mids = [];
  let db_ticketing;
  let db_actor;
  let db_sids = new Array(); //해당 영화의 스케쥴 id값들.
  let data_length; //검색 후 나온 영화 결과값 갯수.
  var title = title_.value;
  var yy = Number(yy_.value);
  var mm = Number(mm_.value);
  var dd = Number(dd_.value);
  let movieText;
  let scheduleText;
  let ticketingText;
  let movieInfos = [];
  // console.log(title)
  if (title != "" && yy != "" && mm != "" && dd != "") {
    $("tbody").empty();
    $.ajax({
      url: "../php/main.php",
      type: "GET",
      data: {
        keyword: title,
        type: "movie_actor", //영화 정보와, 출연자 데이터 받음.
      },
      success: function (res) {
        console.log(res);
        if (res == "") {
          console.log("NULL");
          alert(`검색결과가 없습니다.`);
        } else {
          let text = JSON.parse(res);
          movieText = text;
          console.log(text);
          data_length = text.length;
          let be_mid = text[0].MID;
          db_mids.push(be_mid);
          for (let i = 0; i < data_length; i++) {
            db_mid = text[i].MID;
            if (be_mid != db_mid) {
              db_actors[be_mid] = actors;
              actors = [];
              be_mid = db_mid;
              db_mids.push(db_mid);
            }
            db_title = text[i].TITLE;
            db_open_day = text[i].OPEN_DAY;
            db_director = text[i].DIRECTOR;
            db_length = text[i].LENGTH;
            db_rating = text[i].RATING;
            db_actor = text[i].AC_NAME;
            actors.push(db_actor);
            // db_actors.push(db_actor);
          }
          db_actors[db_mid] = actors;
          actors = [];
          be_mid = db_mid;

          console.log(db_mids);
          console.log(db_actors);
          console.log(text.length);

          //
          $.ajax({
            url: "../php/main.php",
            type: "GET",
            data: {
              keyword: title,
              type: "schedule", //스케쥴 데이터를 얻음.
              mid: db_mids,
            },
            success: function (res) {
              console.log(res);

              let text = JSON.parse(res);
              scheduleText = text;
              console.log(text);
              let len = text.length;
              for (let i = 0; i < len; i++) {
                db_sids[i] = text[i].SID;
              }
              console.log(db_sids);
              console.log(typeof db_sids);

              //
              $.ajax({
                url: "../php/main.php",
                type: "GET",
                data: {
                  keyword: title,
                  type: "ticketing", //스케쥴 데이터를 얻음.
                  sids: db_sids,
                },
                success: function (res) {
                  if (res == "") {
                    alert(`데이터 없음.`);
                  }
                  console.log(res);
                  console.log(db_sids);
                  let text = JSON.parse(res);
                  console.log(text);
                  ticketingText = text;
                  console.log(movieText);
                  console.log(scheduleText);
                  console.log(ticketingText);
                  //초기화 과정

                  for (let i = 0; i < movieText.length; i++) {
                    // let cid = Number(text[i].CID);
                    //mid별로 관리

                    db_ticketing_infoR[movieText[i].MID] = 0;
                    db_ticketing_infoW[movieText[i].MID] = 0;
                  }
                  let mid_sid = [];
                  for (let q = 0; q < db_mids.length; q++) {
                    let mid = Number(db_mids[q]);
                    console.log(`mid : ${mid}`);

                    for (let i = 0; i < movieText.length; i++) {
                      movieInfos[movieText[i].MID] = movieText[i];
                      mid_sid[mid] = 0;
                    }
                    console.log(movieInfos);
                    for (let i = 0; i < scheduleText.length; i++) {
                      let sid = Number(scheduleText[i].SID);

                      for (let j = 0; j < ticketingText.length; j++) {
                        let status = ticketingText[i].STATUS;

                        if (
                          scheduleText[i].MID == mid &&
                          Number(sid) == Number(ticketingText[j].SID)
                        ) {
                          //동일 영화 동일 스케쥴
                          if (status == "r") {
                            db_ticketing_infoR[mid] += Number(
                              ticketingText[j].SEATS
                            );
                          }
                          if (status == "w") {
                            db_ticketing_infoW[mid] += Number(
                              ticketingText[j].SEATS
                            );
                          }
                        }
                      }
                    }

                    let d1 = new Date(2000 + yy, mm, dd); //사용자 입력 예매 날짜
                    let openDay = movieText[q].OPEN_DAY;
                    for (let k = 0; k < movieText.length; k++) {
                      if (Number(movieText[k].MID) == Number(mid)) {
                        openDay = movieText[k].OPEN_DAY;
                        break;
                      }
                    }
                    console.log(openDay);
                    let day = openDay.split("/");
                    console.log(day);
                    let db_yy = Number(day[0]);
                    let db_mm = Number(day[1]);
                    let db_dd = Number(day[2]);

                    let d2 = new Date(2000 + db_yy, db_mm, db_dd); //db영화 개봉일.
                    console.log(d1);
                    console.log(d2);
                    console.log(d1 < d2);
                    console.log(d1 - d2);
                    console.log(d1.getTime() - d2.getTime());
                    const diffDate = d1.getTime() - d2.getTime();

                    const dateDays = Math.abs(diffDate / (1000 * 3600 * 24));

                    console.log(dateDays);
                    console.log(db_open_day);
                    console.log(mid);

                    console.log(db_actors);
                    console.log(typeof db_actors);
                    console.log(db_actors[mid]);

                    if (d1 < d2) {
                      //예매 일이 더 크다
                      //개봉 예정임.
                      console.log(movieInfos[mid].TITLE);
                      $(`#tbody`).append(`<tr>
                                                <td>${movieInfos[mid].TITLE}</td>
                                                <td>${openDay}</td>
                                                
                                                <td>${movieInfos[mid].DIRECTOR}</td>
                                                <td>${db_actors[mid]}</td>
                                                <td>${movieInfos[mid].LENGTH}</td>
                                                <td>${movieInfos[mid].RATING}</td>
                                                <td>${db_ticketing_infoR[mid]}</td>
                                                <td>${db_ticketing_infoW[mid]}</td>
                                                <td><input class = "check" disabled="true" type="checkbox"></td>
                                                
                                                <tr>`);
                    } else {
                      //상영 중임.
                      $(`#tbody`).append(`<tr>
                      <td>${movieInfos[mid].TITLE}</td>
                      <td>${openDay}</td>
                      
                      <td>${movieInfos[mid].DIRECTOR}</td>
                      <td>${db_actors[mid]}</td>
                      <td>${movieInfos[mid].LENGTH}</td>
                      <td>${movieInfos[mid].RATING}</td>
                      <td>${db_ticketing_infoR[mid]}</td>
                      <td>${db_ticketing_infoW[mid]}</td>
                                                <td><input class="check"  type="checkbox"></td>
                                                
                                                <tr>`);
                    }
                  }

                  console.log(db_ticketing_infoR);
                  console.log(db_ticketing_infoW);
                  let sids = [];
                },
                error: function (e) {
                  console.log(e);
                },
              });
              //
            },
            error: function (e) {
              console.log(e);
            },
          });
          //
        }
      },
      error: function (e) {
        console.log(e);
      },
    });
  } else {
    alert("제목 과 날짜를 입력해주세요");
  }
}
init();

//

function init() {
  let login_bool = sessionStorage.getItem("login");
  let login_id = sessionStorage.getItem("id");
  console.log("init");
  console.log(login_bool);
  if (login_bool == "true") {
    console.log("hide");

    $(`#login`).hide();
    $(`#logout`).show();
  } else {
    $(`#login`).show();

    $(`#logout`).hide();
  }
}
function logout_() {
  sessionStorage.setItem("login", "false");
  sessionStorage.setItem("id", 0);
  location.reload();
}
function login_() {
  //asdasdd
  open("../html/login.html", "_self");
}

function my_page() {
  open("../html/myPage.html", "_self");
}

function reservation_() {
  //관람 등급과 회원의 만나이 계산.
  //개봉일에 따라 상영중, 상영예정 갈림

  //성공 시,
  open("../html/reservation.html", "_self");
}
