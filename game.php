<?php
	require_once("action/GameAction.php");

	$action = new GameAction();
	$data = $action->execute();


?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>MagixTime -- Game</title>
		<script src="./js/jquery.min.js"></script>
		<script src="./js/messages.js"></script>
		<script src="./js/Card.js"></script>
		<script src="./js/game.js"></script>
		<link rel="stylesheet" href="css/style.css">
	</head>



	<body class = "game">
		<div class = "endScreen"></div>
		<div class="flash">
		<div class = time></div>
		</div>

		<div class = "opponent">
			<div class = "character">
				<div class = "welcome_text"></div>
				<div class = "heroClass"></div>
				<div class = stats>
					<div class = "username"></div>
					<div class = "hp"></div>
					<div class = "handsize"></div>
					<div class = "cardsremaining"></div>
				</div>
			</div>
			<div class = "board container"></div>

		</div>

		<div class = "player">
			<div class = "board container"></div>
			
			
			<div class = "handsize"></div>
			<div class = "welcome_text"></div>
			<div class = "cardsremainding"></div>
			<div class = "hand container"> </div>
			<div class = "character">
				<div class = "heroClass"></div>
				<div class = info>
					<div class = stats>
						<div class = "hp"></div>
						<div class = "mp"></div>
					</div>
					<div class = "yourTurn">
						<div class = "heroPower">Hero Power</div>
						<div class = "endTurn"> End Turn</div>
					</div>
				</div>
			</div>
		</div>

		<template id="card-template">
			<div class="card">
				<div class = "image"></div>
				<div class = "special"></div>
				<div class = "id"></div>
				<div class = "type"></div>
				<div class = "cost"></div>
				<div class = "cardstats">
					<div class="hp"></div>
					<div class="atk"></div>

				</div>
				<div class="card__overlay">
					<div class="mechanics"></div>
				</div>
				
			</div>
		</template>

	</body>
</html>
