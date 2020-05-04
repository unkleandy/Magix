<?php
	require_once("action/CommonAction.php");

	class GameAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PLAYER);
		}

		protected function executeAction() {

			$data["key"] = $_SESSION["key"];
			$data["type"] = $_POST["type"];
			$data["uid"] = $_POST["uid"];
			$data["targetuid"] = $_POST["targetuid"];
			
			$result='';
			$result = CommonAction::callAPI("games/action", $data);
			
			return compact('result');
		}

	}