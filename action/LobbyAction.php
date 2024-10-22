<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
			if (!empty ($_GET["logout"])){
				$data = array("key" => $_SESSION["key"]);
				CommonAction::callAPI("signout", $data);
				session_unset();	 // suppression des variables de session
				session_destroy();	 // suppression des données associées à la session
				header("location:index.php");
				session_start();
				exit;
			}
			if (!empty($_GET["pvp"])){
				$data = array("key" => $_SESSION["key"]);
				$data["type"] = "PVP";
				CommonAction::callAPI("games/auto-match", $data);
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PLAYER;
				header("location:game.php");
				exit;
			}
			if (!empty($_GET["training"])){
				$data = array("key" => $_SESSION["key"]);
				$data["type"]= "TRAINING";
				CommonAction::callAPI("games/auto-match", $data);
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PLAYER;
				header("location:game.php");
				exit;
			}

			$key = $_SESSION["key"];
			return compact("key");
		}

	}