
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
    $type =$_GET['type'];

    if($type == "init"){
        $reservation = $_GET['reservation'];
        // var_dump($reservation);
        // echo count($reservation);
        $st="";
        for($i = 0; $i < count($reservation)-1; $i+=1){
            
            $st = $st. "'".$reservation[$i][0]. "'". ",";

        }
        $st = $st ."'". $reservation[count($reservation)-1][0]."'";
        // echo $st;
    

        $sql = "SELECT s.sdatetime , s.tname, s.mid, s.sid, th.seats from schedule s,
                ( select mid from movie m where m.title in (".$st.")) mm , 
                (select tname, seats from theater) th
                where s.mid in (mm.mid) and th.tname in (s.tname) ";
        $stmt = $conn -> prepare($sql);
                    $stmt -> execute();
                    // echo "#ASD";
                    while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
                        
                        echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
                        // echo $i;
                
                    }   
    }
    else if($type == "theater"){
        $sql = "select * from theater";
       
        $stmt = $conn -> prepare($sql);
        $stmt -> execute();
                    // echo "#ASD";
        while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
                        
         echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
                        // echo $i;
                
        }   
    }else if($type == "count"){
        $sids = $_GET['sids'];
        $st="";
        // var_dump($sids);
        for($i = 0; $i < count($sids)-1; $i+=1){
            
            $st = $st.$sids[$i]. ",";

        }
        $st = $st . $sids[count($sids)-1];
        // echo $st;

        $sql = 
        "SELECT sid, sum(seats) sumSEATS from ticketing where sid in (".$st.") group by sid" ;

        $stmt = $conn -> prepare($sql);
        $stmt -> execute();
                    // echo "#ASD";
        while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
                        
         echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
                        // echo $i;
                
        }   
    }

    
}
catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}
?>