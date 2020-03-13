<?php
	require_once("action/CommonAction.php");

	class GameAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PLAYER);
		}

		protected function executeAction() {

			return null;
		}
	}