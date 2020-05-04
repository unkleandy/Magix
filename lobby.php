<?php
	require_once("action/LobbyAction.php");
	$action = new LobbyAction();
	$data = $action->execute();
?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Magix-Time -- Lobby</title>
	<script src="./js/lobby.js"></script>
	<script src="js/utils.js"></script>
	<script src="js/sprite/PrismoEye.js"></script>
	<script src="js/sprite/PrismoBeam.js"></script>
	<link rel="stylesheet" href="css/style.css">
</head>
<body class = "lobby">
	
	<div class= "prismo">
		<div class = "prismo_eye"></div>
		<div class = "prismo_body"></div>
	</div>
	<div class = "prismo_vertical"></div>
	<div class = "prismo_corner"></div>
	<div class = "window">

		<iframe style="width:600px;height:600px;" onload="applyStyles(this)" 
			src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"]?>">
		</iframe>
	</div>
	<div class = "prismo_horizontal">
		<div class = "options">
			<a href="?pvp=true">
				<p>pvp</p>
				<img src="./img/pvp.png">
			</a> 
		</div>
		<div class = "options">
			<a href="?training=true">
				<p>training</p>
				<img src="./img/training.png">
			</a> 
		</div>
		<div class = "options">
			<a href="?logout=true">
				<p>logout</p>
				<img src="./img/logout.png">
			</a>
		</div>
	</div>
	

</body>
</html>
