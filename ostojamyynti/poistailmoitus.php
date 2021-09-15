<?php
session_start();
include("kantayhteys.php");
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="fi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/tunnistus.css">
    <title>Osto- ja myyntipalsta</title>
</head>

<body>
    <div class="shade"></div>
    <div class="content">
        <?php
        if (isset($_POST['poista']) && isset($_POST['poista_id'])){ 
            $poista = $_POST['poista']; 
            $ilmoitus_id = $_POST['poista_id']; 

            $query= mysqli_query($dbconnect, "DELETE FROM ilmoitukset WHERE ilmoitus_id = '$ilmoitus_id'"); 
         
        echo "Ilmoitus poistettu. <br><a href='index.php'>Palaa etusivulle</a>."; 
        } else {
            echo "Jotain meni pieleen. <br><a href='index.php'>Palaa etusivulle</a>."; 
        }
        ?>
    </div>
</body>

</html>