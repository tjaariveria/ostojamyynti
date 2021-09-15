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
                if (isset($_SESSION['LOGGEDIN']) && $_SESSION['LOGGEDIN'] == 1) {
                    $sahkoposti = $_SESSION["kayttaja_sahkoposti"];
                    $tunnus = $_SESSION["kayttaja_tunnus"];
                    echo "
                    <p>Muutetaan kayttäjätietoja käyttäjälle '<b>" . $tunnus . "</b>':</p>
                    <h3>Salasanatietojen muuttaminen</h3>
                    <form action='kayttajatunnistus.php' method='post'>
                        <div class='table'>
                            <div class='tr'>
                                <div class='td'>Vanha salasana:</div>
                                <div class='td'><input type='password' name='kayttaja_salasana'></div>
                            </div>
                            <div class='tr'>
                                <div class='td'>Uusi salasana:</div>
                                <div class='td'><input type='password' name='kayttaja_uusisalasana'></div>
                            </div>
                            <div class='tr'>
                                <div class='td'>Nykyinen sähköposti:</div>
                                <div class='td'>" . $sahkoposti . "</div>
                            </div>
                            <div class='tr'>
                                <div class='td'>Uusi sähköposti:</div>
                                <div class='td'><input type='text' name='kayttaja_uusisahkoposti' value='$sahkoposti'></div>
                            </div>
                            <div class='tr'>
                                <div class='td'><input type='hidden' name='kayttaja_kayttaja' value='$tunnus'></div>
                                <div class='td'><input type='hidden' name='lomaketunnistin' value='2'></div>
                            </div>
                            <div class='tr'>
                                <div class='td'><input type='submit' value='Muuta'></div>
                            </div>
                        </div>
                    </form>";

                    /*echo "<p>Muutetaan kayttäjätietoja käyttäjälle '<b>" . $tunnus . "</b>':</p>";
                    echo "<h3>Salasanatietojen muuttaminen</h3>";
                    echo "Vanha salasana: <input type='password' name='kayttaja_salasana'> <br>";
                    echo "Uusi salasana: <input type='password' name='kayttaja_uusisalasana'> <br>";
                    echo "Nykyinen sähköposti: " . $sahkoposti . "<br>";
                    echo "Uusi sähköposti: <input type='text' name='kayttaja_uusisahkoposti' value='$sahkoposti'> <br>";
                    echo "<input type='hidden' name='kayttaja_tunnus' value='$tunnus'>";
                    echo "<input type='hidden' name='lomaketunnistin' value='2'>";
                    echo "<input type='submit' value='Muuta'>";
                    echo "</form>";*/
                } else {
                    echo "Et ole kirjautunut sisään!";
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