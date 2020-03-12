<?php
	require_once("action/CommonAction.php");
	class LoginAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$connectionError = true;

			if (isset($_POST["username"])){
				$visibility = UserDAO::authenticate($_POST["username"], $_POST["password"]);

				if ($visibility>CommonAction::$VISIBILITY_PUBLIC){
					$connectionError = false;
					$_SESSION["username"]= $_POST["username"];
					$_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
					header("location:index.php");
					exit();
				}
			}
			return compact("connectionError");
		}
	}