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



try {
    $conn = new PDO($dns, $username, $password);        
    $type = $_GET['type'];
    if($type == "ticket_schedule"){
        $id = $_GET['id'];  

        $sql = 
        "SELECT * from schedule s ,(select sid, seats,ticketing_id, status from ticketing where cid = '".$id."') ts
        where  ts.sid = s.sid "; 
    
        // $sql = "SELECT * FROM ticketing t WHERE t.cid = '".$id."'  ";
        $stmt = $conn -> prepare($sql);
        $stmt->execute();
        
        while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
            // print $row;
            echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
            // echo "@@";
        }
    }else if($type == "movie"){
        $mid = $_GET['mid'];
        $st="";
        // var_dump($mid);
        for($i = 0; $i < count($mid)-1; $i+=1){
            if($mid[$i] != ""){
            // echo $sids[$i];
                $st = $st . $mid[$i]. ",";
            }
        }
        $st = $st . $mid[count($mid)-1];
        
        $sql = "SELECT * from movie m
            where m.mid in (".$st.")";
        
    
        // $sql = "SELECT * FROM ticketing t WHERE t.cid = '".$id."'  ";
        $stmt = $conn -> prepare($sql);
        $stmt->execute();
        
        while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
            // print $row;
            echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
            // echo "@@";
        }
    }
    else if($type == "cancel")
    {
        $cancel = $_GET['cancel'];
        // var_dump($cancel[0][1]);
        $st="";
        for($i = 0; $i < count($cancel)-1; $i+=1){
            if($cancel[$i] != ""){
            // echo $sids[$i];
                $st = $st . $cancel[$i][5]. ",";
            }
        }
        $st = $st . $cancel[count($cancel)-1][5];
        echo $st;
       
        $sql = "UPDATE ticketing set status = 'c' where ticketing_id in (".$st.")";

        
        // $sql = "SELECT * FROM ticketing t WHERE t.cid = '".$id."'  ";
        $stmt = $conn -> prepare($sql);
        try {
            $conn -> beginTransaction();
            $stmt->execute();
            $conn-> commit();
        } catch (PDOException $e) {
            $conn -> rollback();
            echo("에러 내용: ".$e->getMessage());
        }
        
        // while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
        //     // print $row;
        //     echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        //     // echo "@@";
        // }


    }   
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}

?>