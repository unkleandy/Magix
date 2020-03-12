<?php

	require_once("action/CommonAction.php");

	class SignInAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = array("key" => $_SESSION["key"]);
			CommonAction::callAPI("signout", $data);
			session_unset();	 // suppression des variables de session
			session_destroy();	 // suppression des données associées à la session
		}
	}
