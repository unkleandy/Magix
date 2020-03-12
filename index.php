<?php
	require_once("action/SignInAction.php");
	$action= new SignInAction();
	$data = $action->execute();

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Magix Connexion</title>
</head>

<body>
	<div class="login">
		<form action="index.php" method="post">
			<div>
				<label>Nom d'usager</label>
				<input type="text" name="username" value="" id="username" required="">
			</div>
			<div>
				<label>Mot de passe : </label>
				<input type="password" name="password" id="pwd" required="">
			</div>
			<div>
				<button class="btn-magix" type="submit">Connexion</button>
			</div>
		</form>
	</div>


</body></html>