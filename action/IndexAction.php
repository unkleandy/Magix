<?php

	require_once("action/CommonAction.php");

	class IndexAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$return=[];
			$connectionError = true;

			//LOGIN
			if (isset($_POST["username"]) && isset($_POST["password"])){
				$data["username"] = $_POST["username"];
				$data["password"] = $_POST["password"];
				$result = CommonAction::callAPI("signin", $data);
				if ($result == "INVALID_USERNAME_PASSWORD") {
					echo "<script>";
					echo "alert('nom d'usager et mot de passe invalides');";
					echo "window.location='index.php'; ";
					echo "</scrit>";
				}
				else {
					//var_dump($result);exit;
					$key = $result->key;
					$_SESSION["key"] = $key;
					$_SESSION["username"] =$_POST["username"];
					$_SESSION["visibility"]= CommonAction::$VISIBILITY_MEMBER;
					header("location:lobby.php");

				}
			}
			//COOKIES
			$username = "";

			if (!empty($_POST["username"])) {
				setcookie("username", $_POST["username"], 0);
				$username =  $_POST["username"];
			}
			else {
				if (!empty($_COOKIE["username"])) {
					$username = $_COOKIE["username"];
				}
			}
			$return["connectionError"]= $connectionError;
			$return["username"]=$username;
			return $return;
		}
	}