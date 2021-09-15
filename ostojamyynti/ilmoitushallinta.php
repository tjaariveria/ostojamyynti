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
        $sivu= $_POST['lomaketunnistin']; 

        //Ilmoitusten lisäys
        if ($sivu == 1) {
            $ilmoitus_laji = $_POST['ilmoitus_laji'];
            $ilmoitus_nimi = $_POST['ilmoitus_nimi'];
            $ilmoitus_kuvaus = $_POST['ilmoitus_kuvaus'];
            $ilmoitus_paivays = $_POST['ilmoitus_paivays'];
            $ilmoittaja_id = $_POST['ilmoittaja_id'];

            if (!empty($ilmoitus_nimi) && !empty($ilmoitus_kuvaus)) {
                mysqli_query($dbconnect, "INSERT INTO ilmoitukset (ilmoitus_laji, ilmoitus_nimi, ilmoitus_kuvaus, 
                ilmoitus_paivays, ilmoittaja_id ) VALUES ('$ilmoitus_laji', '$ilmoitus_nimi', '$ilmoitus_kuvaus', 
                '$ilmoitus_paivays', '$ilmoittaja_id')");
                echo "Ilmoituksen lisääminen onnistui! <br><a href='index.php'>Palaa etusivulle</a>.";
            } else {
                echo "Jätit tietoja täyttämättä. <br>Ole hyvä ja <a href='lisaailmoitus.php'>täytä lomake 
                uudestaan</a>.";
            }
            mysqli_close($dbconnect);
        }
        if ($sivu == 2) {
            $ilmoitus_id = $_POST['ilmoitus_id'];
            $ilmoitus_uusilaji = $_POST['ilmoitus_uusilaji'];
            $ilmoitus_uusinimi = $_POST['ilmoitus_uusinimi'];
            $ilmoitus_uusikuvaus = $_POST['ilmoitus_uusikuvaus'];

            if (!empty($ilmoitus_uusinimi) && !empty($ilmoitus_uusikuvaus)) {
                mysqli_query($dbconnect, "UPDATE ilmoitukset SET ilmoitus_laji = '$ilmoitus_uusilaji', ilmoitus_nimi = '$ilmoitus_uusinimi', 
                ilmoitus_kuvaus = '$ilmoitus_uusikuvaus' WHERE ilmoitus_id = '$ilmoitus_id'");
                echo "Ilmoituksen muokkaaminen onnistui! <br><a href='index.php'>Palaa etusivulle</a>.";
            } else {
                echo "Jätit kenttiä tyhjiksi. <br>Ole hyvä ja <a href='index.php'>Palaa etusivulle;</a>.";
            }
            mysqli_close($dbconnect);
        }
        ?>
    </div>
</body>

</html>