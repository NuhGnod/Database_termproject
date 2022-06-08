init();
var q1div = document.getElementById("q1");
// q1div.innerHTML = "asd";
function init() {
  $.ajax({
    url: "../php/manager.php",
    type: "POST",
    data: {
      type: "q1",
    },
    success: function (res) {
      let text;
      if (res != "") {
        text = JSON.parse(res);
      }
      console.log(text);
      $(`#tb1`).empty();
      for (let i = 0; i < text.length; i++) {
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
