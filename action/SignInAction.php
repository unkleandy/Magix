<?php

	require_once("action/CommonAction.php");

	class SignInAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$connectionError = true;

			if (isset($_POST["username"]) && isset($_POST["password"])){
				$data["username"] = $_POST["username"];
				$data["password"] = $_POST["password"];
				$result = CommonAction::callAPI("signin", $data);

				if ($result == "INVALID_USERNAME_PASSWORD") {
					// err
				}
				else {
					//var_dump($result);exit;
					$key = $result->key;
					$_SESSION["key"] = $key;
					$_SESSION["username"] =$_POST["username"];
					header("Location:lobby.php");
					exit;
				}
			}

		}


	}