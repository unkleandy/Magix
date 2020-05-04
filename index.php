<?php
	require_once("action/IndexAction.php");
	$action= new IndexAction();
	$data = $action->execute();

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Magix Connexion</title>
	<script src="js/sprite/Intro.js"></script>
	<script src="js/sprite/Sword.js"></script>
	<script src="js/sprite/LoginBox.js"></script>
	<script src="js/index.js"></script>
	<link rel="stylesheet" href="css/style.css">
</head>

<body class="index">
<div class=intro_title>
	<div class="intro_magix_tm"></div>
	<div class="intro_ie"></div>
	<div class="intro_sword"></div>
</div>

	<div class= "login_box" ></div>
		<form action="index.php" method="post">
			<div class="login">
				<div>
					<label>Nom d'usager</label>
					<input type="text" name="username" value="<?= $data["username"] ?>" id="username" required="">
				</div>
				<div>
					<label>Mot de passe : </label>
					<input type="password" name="password" id="pwd" required="">
				</div>
			</div>
			<div>
				<button class="btn-magix" type="submit">Connexion</button>
			</div>
		</form>
		
	</body>
	</html>