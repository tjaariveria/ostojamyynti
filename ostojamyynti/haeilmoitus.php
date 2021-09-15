<?php
session_start();
include("kantayhteys.php");
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="en">

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
    <script></script>
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
                date_default_timezone_set('Europe/Helsinki');

                if (isset($_POST['haku'])) {
                    $haku = $_POST['haku'];
                }
                echo "<h3>Haun tulokset:</h3>
                    <form action='haeilmoitus.php' method='post'>
                        <input name='haku' type='text'>
                        <input type='submit' name='submit' value='Hae'>
                        <a href='haeilmoitus.php'>Tyhjennä haku</a>
                    </form></p>";

                if ((isset($_POST['submit'])) and (!empty($haku))) {
                    $query = ("SELECT * FROM ilmoitukset INNER JOIN kayttajat ON ilmoitukset.ilmoittaja_id=kayttajat.kayttaja_id 
                        WHERE ilmoitus_kuvaus LIKE '%" . $haku . "%' OR ilmoitus_nimi LIKE '%" . $haku . "%' ");

                    $result = mysqli_query($dbconnect, $query);
                    $num = mysqli_num_rows($result);

                    if ($num == 0) {
                        echo "Hakusanallesi '<b>" . $haku . "</b>' ei löytynyt ilmoituksia.";
                    } else {
                        echo "Hakusanallesi '<b>" . $haku . "</b>' löytyi ilmoituksia seuraavasti: <br>";

                        for ($i = 0; $i < $num; $i++) {
                            $row = mysqli_fetch_assoc($result);
                            $ilmoitus_id = $row["ilmoitus_id"];
                            $ilmoitus_laji = $row["ilmoitus_laji"];
                            $ilmoitus_nimi = $row["ilmoitus_nimi"];
                            $ilmoitus_kuvaus = $row["ilmoitus_kuvaus"];
                            $ilmoitus_paivays = $row["ilmoitus_paivays"];
                            $ilmoitus_oikeapaivays = date("d-m-Y", strtotime($ilmoitus_paivays));
                            $ilmoittaja_id = $row["ilmoittaja_id"];
                            $myyja_tunnus = $row["kayttaja_tunnus"];
                            $myyja_sahkoposti = $row["kayttaja_sahkoposti"];

                            if ($ilmoitus_laji == 1) {
                                $ilmoitus_laji = "Myydään";
                            }

                            if ($ilmoitus_laji == 2) {
                                $ilmoitus_laji = "Ostetaan";
                            }
                            echo "
                                <div class='ilmoitus'>
                                    <div class='tr1'>
                                        <div class='tdOtsikko'>$ilmoitus_laji: $ilmoitus_nimi</div>
                                    </div>
                                    <div class='tr1'>
                                        $ilmoitus_kuvaus
                                    </div>
                                    <div class='line'></div>
                                    <div class='tr1'>
                                        <div class='td1'>Ilmoitus jätetty:</div>
                                        <div class='td2'>$ilmoitus_oikeapaivays</div>
                                    </div>
                                    <div class='tr1'>
                                        <div class='td1'>Ilmoittaja:</div>
                                        <div class='td2'>$myyja_tunnus (<a href='mailto: $myyja_sahkoposti'>$myyja_sahkoposti</a>)</div>
                                    </div>";

                            if ((isset($_SESSION['kayttaja_id']) && $_SESSION['kayttaja_id'] == $ilmoittaja_id) ||
                                (isset($_SESSION['kayttaja_taso']) && $_SESSION['kayttaja_taso'] == "admin")
                            ) {
                                echo "
                                    <div class='tr1'>
                                        <form action='poistailmoitus.php' method='post'>
                                            <div><input type='hidden' name='poista' value='1'></div>
                                            <div><input type='hidden' name='poista_id' value='$ilmoitus_id'></div>
                                            <div class='tdl'><input type='submit' value='Poista'></div>
                                        </form>
                                        <form action='muokkaailmoitus.php' method='post'>
                                            <div><input type='hidden' name='muokkaa_id' value='$ilmoitus_id'></div>
                                            <div class='tdl'><input type='submit' value='Muokkaa'></div>
                                        </form>
                                    </div>";
                            }
                            echo "</div>";
                        }
                    }
                } else {
                    echo "Syötä hakusana yllä olevaan kenttään";
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