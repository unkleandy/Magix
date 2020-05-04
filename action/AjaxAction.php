<?php
	require_once("action/CommonAction.php");

	class AjaxAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PLAYER);
		}

		protected function executeAction() {
			$result='';
            $data = array("key" => $_SESSION["key"]);
            $result = CommonAction::callAPI("games/state", $data);
			return compact('result');
		}
	}
