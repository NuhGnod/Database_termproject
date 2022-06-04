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
    $id = $_GET['id'];  
    $pw = $_GET['pw'];  
    $sql = "SELECT * FROM customer c WHERE c.cid = '".$id."' and c.password = '".$pw."'   ";
    $stmt = $conn -> prepare($sql);
    $stmt->execute();
    
    while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
        // print $row;
        echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        // echo "@@";
    }
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}

?>