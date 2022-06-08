init();

function init() {
  // 관리자 페이지에서 각 통계를 출력하게 된다.
  $.ajax({
    url: "../php/manager.php",
    type: "POST",
    data: {
      type: "q1", //첫번째 통계의 처리를 위해 q1 q2 q3로 구분 하였다.
    },
    success: function (res) {
      let text;
      if (res != "") {
        //데이터의 결과 값이 있을경우, 배열형태로 다시 변환한다.
        text = JSON.parse(res);
      }
      console.log(text);
      $(`#tb1`).empty();
      for (let i = 0; i < text.length; i++) {
        //q1테이블로 각각의 정보를 테이블형태로 보여준다.
        $(`#tb1`).append(`<tr>
        <td>${text[i].MID}</td>
        <td>${text[i].TITLE}</td>
        <td>${text[i].OPEN_DAY}</td>
        <td>${text[i].DIRECTOR}</td>
        <td>${text[i].RATING}</td>
      
        
        <tr>`);
      }
      //   q1div.innerHTML = ;
      $.ajax({
        url: "../php/manager.php",
        type: "POST",
        data: {
          type: "q2",
        },
        success: function (res) {
          //   console.log(res);
          let text;
          if (res != "") {
            text = JSON.parse(res);
          }
          console.log(text);
          $(`#tb2`).empty();
          for (let i = 0; i < text.length; i++) {
            $(`#tb2`).append(`<tr>
        <td>${text[i].BIRTH_DATE}</td>
        <td>${text[i].COUNTCID}</td>
       
      
        
        <tr>`);
          }
          $.ajax({
            url: "../php/manager.php",
            type: "POST",
            data: {
              type: "q3",
            },
            success: function (res) {
              let text;
              if (res != "") {
                text = JSON.parse(res);
              }
              console.log(text);
              $(`#tb3`).empty();
              for (let i = 0; i < text.length; i++) {
                $(`#tb3`).append(`<tr>
        <td>${text[i].MID}</td>
        <td>${text[i].TITLE}</td>
        <td>${text[i].OPEN_DAY}</td>
        <td>${text[i].DIRECTOR}</td>
        <td>${text[i].RATING}</td>
        <td>${text[i].LENGTH}</td>
        <td>${text[i].RANK}</td>
      
        
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
