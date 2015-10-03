<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	$language = $_POST["language"];
	$classes = $_POST["classes"];
	$classNames = json_decode($_POST["names"]);
} else {
	header("Location: index.html");
	exit;
}
