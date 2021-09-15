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
    <link rel="stylesheet" href="styles/global.css">
    <link rel="stylesheet" href="styles/topnav.css">
    <link rel="stylesheet" href="styles/content.css">
    <link rel="stylesheet" href="styles/text.css">
    <link rel="stylesheet" href="styles/footer.css">
    <title>Osto- ja myyntipalsta</title>
</head>

<body>
    <div class="background">
        <nav class="topnav" id="nav">
            <div class="stabilizer">
                <a href="index.php" class="active">Etusivu</a>

                <?php
                if (isset($_SESSION['LOGGEDIN']) && $_SESSION['LOGGEDIN'] == 1) {

                    echo "
                    <div class='dropdown'>
                        <button class='dropbtn'>
                            <img src='pictures/profile.png' alt='Profile image'>" . $_SESSION["kayttaja_tunnus"] . "
                        </button>
                        <div class='dropdown-content'>
                            <a href='lisaailmoitus.php'>Lisää ilmoitus</a>
                            <a href='tiedot.php'>Muuta tietoja</a>
                            <a href='uloskirjautuminen.php'>Kirjaudu ulos</a>
                        </div>
                    </div>";
                } else {
                    echo "<a href='kirjautuminen.html' class='right'>Kirjaudu sisään</a>
                    <a href='rekisterointi.html' class='right'>Rekisteröidy</a>.";
                }
                ?>
                <a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="navigate()">&#9776;</a>
            </div>
        </nav>

        <article class="content">
            <img class="banner" src="pictures/banner.jpg" alt="Logo banner">
            <section>
                <?php
                if (isset($_POST['muokkaa_id'])) {
                    $ilmoitus_id = $_POST['muokkaa_id'];

                    $query = mysqli_query($dbconnect, "SELECT * FROM ilmoitukset WHERE ilmoitus_id = '$ilmoitus_id'");

                    $row = mysqli_fetch_assoc($query);
                    $ilmoitus_nimi = $row["ilmoitus_nimi"];
                    $ilmoitus_kuvaus = $row["ilmoitus_kuvaus"];
                    $ilmoitus_laji = $row["ilmoitus_laji"];



                    echo "
                    <form action='ilmoitushallinta.php' method='post'>
                    <h3>Muokkaa ilmoitusta</h3>
                    <div class='table'>
                        <div class='tr'>
                            <div class='td'>Ilmoitustyyppi:</div>
                            <div class='td'><select name='ilmoitus_uusilaji'>";
                    if ($ilmoitus_laji == 1) {
                        $ilmoitus_laji = "Myydään";
                        echo "<option value='1' selected='selected'>Myydään</option>
                            <option value='2'>Ostetaan</option>";
                    }
                    if ($ilmoitus_laji == 2) {
                        $ilmoitus_laji = "Ostetaan";
                        echo "<option value='1'>Myydään</option>
                            <option value='2' selected='selected'>Ostetaan</option>";
                    }
                    echo "</select> </div>
                        </div>
                        <div class='tr'>
                            <div class='td'>Kohteen nimi:</div>
                            <div class='td'><input type='text' name='ilmoitus_uusinimi' value='$ilmoitus_nimi' maxlength='50' size='50'></div>
                        </div>
                        <div class='tr'>
                            <div class='td'>Kohteen kuvaus:</div>
                            <div class='td'><textarea name='ilmoitus_uusikuvaus' maxlength='7000' cols='80' rows='5'>$ilmoitus_kuvaus</textarea></div>
                        </div>
                        <div class='tr'>
                            <div class='td'><input type='hidden' name='ilmoitus_id' value='$ilmoitus_id'></div>
                            <div class='td'><input type='hidden' name='lomaketunnistin' value='2'></div>
                        </div>
                        <div class='tr'>
                            <div class='td'></div>
                            <div class='td'><input type='submit' value='Lähetä'></div>
                        </div>
                    </div>
                </form>";
                } else {
                    echo "Jotain meni vikaan. <a href='index.php'>Palaa etusivulle</a>.";
                }
                ?>
            </section>
        </article>

        <footer>
            <div class="footer">
                <div class="mail"><img src="pictures/mail.png" alt="Phone icon"> firma.email@gmail.com</div>
                <div class="phone"><img src="pictures/phone.png" alt="Phone icon"> 0123456789</div>
            </div>
        </footer>
    </div>

</body>

</html>