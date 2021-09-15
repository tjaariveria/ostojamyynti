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
                date_default_timezone_set("Europe/Helsinki");
                $ilmoitus_aika = date("Y-m-d");

                $ilmoittaja_id = $_SESSION["kayttaja_id"];
                if (isset($_SESSION['LOGGEDIN']) && $_SESSION['LOGGEDIN'] == 1) {
                    echo "
                    <form action='ilmoitushallinta.php' method='post'>
                    <h3>Lisää ilmoitus</h3>
                    <div class='table'>
                        <div class='tr'>
                            <div class='td'>Ilmoitustyyppi:</div>
                            <div class='td'><select name='ilmoitus_laji'>
                                <option value='1'>Myydään</option>
                                <option value='2'>Ostetaan</option>
                            </select> </div>
                        </div>
                        <div class='tr'>
                            <div class='td'>Kohteen nimi:</div>
                            <div class='td'><input type='text' name='ilmoitus_nimi' maxlength='50' size='50'></div>
                        </div>
                        <div class='tr'>
                            <div class='td'>Kohteen kuvaus:</div>
                            <div class='td'><textarea name='ilmoitus_kuvaus' maxlength='7000' cols='80' rows='5'></textarea></div>
                        </div>
                        <div class='tr'>
                            <div class='td'><input type='hidden' name='ilmoittaja_id' value='$ilmoittaja_id'></div>
                            <div class='td'><input type='hidden' name='ilmoitus_paivays' value='$ilmoitus_aika'></div>
                            <div class='td'><input type='hidden' name='lomaketunnistin' value='1'></div>
                        </div>
                        <div class='tr'>
                            <div class='td'></div>
                            <div class='td'><input type='submit' value='Lähetä'></div>
                        </div>
                    </div>
                </form>";
                } else {
                    echo "Teidän täytyy <a href='kirjautuminen.html'>kirjautua sisään</a>, jotta voitte lähettää ilmoituksia.";
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