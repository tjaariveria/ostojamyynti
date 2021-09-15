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
<div class = "shade"></div>
<div class = "content">
<?php
    if (!isset($_SESSION['LOGGEDIN'])) {
        header("Location:index.php");
        exit();
    }
    if($_SESSION['LOGGEDIN'] == 1) {
        session_unset();
        session_destroy();
        echo "Uloskirjautuminen onnistui! <br><a href='kirjautuminen.html'>Kirjaudu sisään</a> tai <a href='index.php'>palaa etusivulle</a>."; 
    } else {
        header("Location:index.php");
        exit();
    }
?>
</div>
</body>
</html>
