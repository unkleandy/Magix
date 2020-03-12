<?php
	session_start();
	abstract class CommonAction{
		//const
		public static $VISIBILITY_PUBLIC = 0;
		public static $VISIBILITY_MEMBER = 1;
		public static $VISIBILITY_MODERATOR = 2;
		public static $VISIBILITY_ADMINISTRATOR = 3;

		private $pageVisibility;
		public function __construct($pageVisibility){
			$this->pageVisibility = $pageVisibility;
		}

		//abstractmethod
		protected abstract function executeAction();

		public function execute() {
			if (!empty ($_GET["logout"])){
				session_unset();
				session_destroy();
				session_start();
			}

			if (!isset($_SESSION["visibility"])) {
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
			}

			//supposed to be hidden == return to login page
			if($_SESSION ["visibility"]< $this->pageVisibility){
				header("location:login.php");
				exit();
			}

			//execute childcode
			// template design pattern
			$data = $this->executeAction();
			$data["isConnected"]= $_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC;
			$data["username"]= empty($_SESSION["username"]) ? null : $_SESSION["username"];
			return $data;
		}
	}