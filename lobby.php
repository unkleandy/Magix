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
</head>
<body>
<div><a href="?logout=true">logout</a> </div>
<div><a href="?pvp=true">pvp</a> </div>
<div><a href="?training=true">training</a> </div>
	<input class="button" a href="?logout=true" value="déconnexion" />
	<input type="submit"  class="button" name="play" value="jouer partie" />

<iframe style="width:700px;height:240px;"
		src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"]?>">
</iframe>

</body>
</html>