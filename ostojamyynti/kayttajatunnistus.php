<?php
session_start();
include("kantayhteys.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
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
        $sivu = mysqli_real_escape_string($dbconnect, $_POST['lomaketunnistin']);
        $kayttaja_tunnus = mysqli_real_escape_string($dbconnect, $_POST['kayttaja_tunnus']);
        //$kayttaja_salasana = md5(mysqli_real_escape_string($dbconnect, $_POST['kayttaja_salasana']));
        $kayttaja_salasana = password_hash($_POST['kayttaja_salasana'], PASSWORD_DEFAULT);

        //Rekisteröinti
        if ($sivu == 0) {
            $kayttaja_sahkoposti = mysqli_real_escape_string($dbconnect, $_POST['kayttaja_sahkoposti']);
            $varmistus = $_POST['varmistus'];
            if (!($kayttaja_tunnus) || !($kayttaja_salasana) || !($kayttaja_sahkoposti) || $varmistus !== 'kuusi') {
                die("Jätit tietoja täyttämättä. <br>Ole hyvä ja <a href='rekisterointi.html'>täytä lomake uudestaan</a>.");
            } else {
                $query = mysqli_query($dbconnect, "SELECT * FROM kayttajat WHERE kayttaja_tunnus = '$kayttaja_tunnus'");
                if (mysqli_num_rows($query) !== 0) {
                    die("Tunnus on jo käytössä! <br><a href='rekisterointi.html'>Yritä uudelleen</a>.");
                } else {
                    $query = mysqli_query($dbconnect, "INSERT INTO kayttajat (kayttaja_taso, kayttaja_tunnus, kayttaja_salasana, kayttaja_sahkoposti) 
                VALUES ('user', '$kayttaja_tunnus', '$kayttaja_salasana', '$kayttaja_sahkoposti')");
                echo "Rekisteröinti onnistui! <br><a href='kirjautuminen.html'>Kirjaudu sisälle</a> palveluun.";
                }
                
                
                
            }
            mysqli_close($dbconnect);
        }

        //Kirjautuminen
        if ($sivu == 1) {
            $query = mysqli_query($dbconnect, "SELECT * FROM kayttajat WHERE kayttaja_tunnus = '$kayttaja_tunnus'");

            if (mysqli_num_rows($query) !== 0 && password_verify($_POST['kayttaja_salasana'], $kayttaja_salasana)) {
                echo ("Kirjautuminen onnistui. <br><a href='index.php'>Siirry palveluun.</a>");

                $tiedot = mysqli_fetch_array($query) or die(mysqli_error($dbconnect));
                $_SESSION["kayttaja_id"] = $tiedot['kayttaja_id'];
                $_SESSION["kayttaja_taso"] = $tiedot['kayttaja_taso'];
                $_SESSION["kayttaja_tunnus"] = $tiedot['kayttaja_tunnus'];
                $_SESSION["kayttaja_salasana"] = $tiedot['kayttaja_salasana'];
                $_SESSION["kayttaja_sahkoposti"] = $tiedot['kayttaja_sahkoposti'];
                $_SESSION['LOGGEDIN'] = 1;
            } else {
                die("Väärä käyttäjänimi tai salasana. <br><a href='kirjautuminen.html'>Yritä uudelleen</a>.");
            }
            mysqli_close($dbconnect);
        }

        //Käyttäjätietojen muuttaminen
        if ($sivu == 2) {
            $kayttaja_uusisahkoposti = $_POST['kayttaja_uusisahkoposti'];
            function vaihdaSahkoposti()
            {
                global $kayttaja_uusisahkoposti;
                global $kayttaja_tunnus;
                global $dbconnect;

                if (!empty($kayttaja_uusisahkoposti)) {
                    $query = mysqli_query($dbconnect, "UPDATE kayttajat SET 
                    kayttaja_sahkoposti='$kayttaja_uusisahkoposti' WHERE kayttaja_tunnus = '$kayttaja_tunnus'");

                    $_SESSION["kayttaja_sahkoposti"] = $kayttaja_uusisahkoposti;
                } else {
                    echo "Jätit kentän tyhjäksi. <br><a href='tiedot.php'>Yritä uudelleen</a>.";
                }
            }

            //$kayttaja_uusisalasana = md5($_POST['kayttaja_uusisalasana']);
            $kayttaja_uusisalasana = password_hash($_POST['kayttaja_uusisalasana'], PASSWORD_DEFAULT);
            $query = mysqli_query($dbconnect, "SELECT * FROM kayttajat WHERE kayttaja_tunnus = 
            '$kayttaja_tunnus'");

            $tiedot = mysqli_fetch_array($query) or die(mysqli_error($dbconnect));

            if (empty($kayttaja_salasana) && $_SESSION["kayttaja_sahkoposti"] === $kayttaja_uusisahkoposti) {
                echo "Mitään tietoa ei ole muutettu. <br><a href='tiedot.php'>Palaa muuttamaan</a>.";
            } elseif (empty($kayttaja_salasana)) {
                vaihdaSahkoposti();
                echo "Tietojen muutos onnistui. <br><a href='index.php'>Palaa etusivulle</a>.";
            } else {
                if ($tiedot['kayttaja_salasana'] !== $kayttaja_salasana || empty($kayttaja_uusisalasana)) {
                    echo "Syötit väärän salasanan tai jätit tietoja täyttämättä. <br><a href='tiedot.php'>Yritä uudelleen</a>.";
                } else {
                    $query = mysqli_query($dbconnect, "UPDATE kayttajat SET 
                    kayttaja_salasana='$kayttaja_uusisalasana' WHERE kayttaja_tunnus = '$kayttaja_tunnus'");
                    vaihdaSahkoposti();

                    echo "Tietojen muutos onnistui. <br><a href='index.php'>Palaa etusivulle</a>.";
                }
            }
            mysqli_close($dbconnect);
        }
        ?>
    </div>
</body>

</html>