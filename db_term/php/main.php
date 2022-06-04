<?php
$tns = "
    (DESCRIPTION=
        (ADDRESS_LIST= (ADDRESS=(PROTOCOL=TCP)(HOST=59.27.30.7)(PORT=1521)))    
        (CONNECT_DATA = (SERVICE_NAME=XE))
    )"; 
$dns = "oci:dbname=".$tns.";charset=utf8";
$username = 'd201802057';
$password = 'p39pwt12';


try {
    $conn = new PDO($dns, $username, $password);        
    
    $keyword = $_GET['keyword'];  
    $keyword = "%".$keyword."%";
    $type = $_GET['type'];
    $sql;
    $stmt;
    
    if($type == "movie_actor"){
        $sql = "SELECT * FROM movie m, actor a WHERE a.mid = m.mid and m.title like '".$keyword."' order by a.mid ";
        $stmt = $conn -> prepare($sql);
        $stmt->execute();
        // echo"ASD";/
        while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
            
            echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        }
    }
    else if($type == "schedule"){
        $mid = $_GET['mid'];
        $sql = "SELECT * FROM schedule s where s.mid = '".$mid."' ";
        $stmt = $conn -> prepare($sql);
        $stmt -> execute();
        while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
            
            echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        }   
    }
    else if($type == "ticketing"){
        $sids = $_GET['sids'];
        // $sids =  json_decode($sids, true);
        // var_dump($sids);
        // echo $sids[0];

    //    echo ($sids);
    // echo count($sids);
        $st="";
        for($i = 0; $i < count($sids)-1; $i+=1){
            // echo $sids[$i];
            $st = $st . $sids[$i]. ",";
        }
        $st = $st . $sids[count($sids)-1];
        // echo $st;
        $sql = "SELECT * FROM ticketing t where t.sid in  (".$st.")";
            // echo $sql;
            // echo "ASD";
            $stmt = $conn -> prepare($sql);
            $stmt -> execute();
            // echo "#ASD";
            while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
                
                echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
                // echo $i;
                
            }   
    }

    //사용자로 부터 받은 데이터
    
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}

?>