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
        if($type == "q1"){
            
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
