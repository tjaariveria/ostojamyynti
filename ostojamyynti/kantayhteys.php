<?php
header('Content-Type: text/html; charset=utf8');
$servername = "localhost";
$username = "root";
$password = "koira123";
$database = "tietokanta";

// Create connection
$dbconnect= new mysqli($servername, $username, $password, $database);
mysqli_set_charset($dbconnect, 'utf8');

// Check connection
if (!$dbconnect) {
  die("Yhteys tietokantaan ei toimi: " . $conn->connect_error);
}
