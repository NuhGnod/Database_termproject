<?php
$tns = "
    (DESCRIPTION=
        (ADDRESS_LIST= (ADDRESS=(PROTOCOL=TCP)(HOST=59.27.30.7)(PORT=1521)))    
        (CONNECT_DATA = (SERVICE_NAME=XE))
    )"; 
$dns = "oci:dbname=".$tns.";charset=utf8";
$username = 'd201802057';
$password = 'p39pwt12';
// echo"fucking";
    try{
        $conn = new PDO($dns, $username, $password);        
        $type = $_POST['type'];
        if($type == "q1"){ //첫번째 통계 쿼리문
             

            //스케쥴과 무비 테이블을 조인 하는데 이때 on조건은 두 테이블에서 mid값이 같은 경우 이다.
            //모든 영화의 스케쥴을 조인하게 된다.
            $sql = 
            "SELECT * from movie m join schedule s
                                on m.mid = s.mid" ; 
                                 $stmt = $conn -> prepare($sql);
                                 $stmt->execute();
                                 
           while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
                                     // print $row;
            echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
                                     // echo "@@";
                                 }
        }else if($type == "q2"){
            
            // 각 회원의 생일 별로 group을 지어 조회 하는데 birth_date순으로 출력하게 된다.
            $sql = 

            "select birth_date, count(cid) COUNTCID
            from customer
            group by birth_date";
            $stmt = $conn -> prepare($sql);
            $stmt->execute();
            
            while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
                // print $row;
                echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
                // echo "@@";
            } 
        }else if($type == "q3"){
            // 영화 테이블에서 영화 상영 길이 순으로 rank() 함수를 통해 순위를 매겨 출력하게 된다.
            $sql = 
            "select mid, title, open_day,director, rating, length, rank() over (order by length desc) rank
            from movie "; 
            $stmt = $conn -> prepare($sql);
            $stmt->execute();
            
            while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
                // print $row;
                echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
                // echo "@@";
            }
        }
    }
    catch (PDOException $e) {
        echo("에러 내용: ".$e->getMessage());
    }
    
?>
