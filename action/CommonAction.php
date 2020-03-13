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
			if (!isset($_SESSION["visibility"])) {
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
			}

			//supposed to be hidden == return to login page
			if($_SESSION ["visibility"]< $this->pageVisibility){
				header("location:index.php");
				exit();
			}

			//execute childcode
			// template design pattern
			$data = $this->executeAction();
			$data["isConnected"]= $_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC;
			$data["username"]= empty($_SESSION["username"]) ? null : $_SESSION["username"];
			return $data;
		}
		/**
		 * data = array('key1' => 'value1', 'key2' => 'value2');
		 */
		public function callAPI($service, array $data) {
			$apiURL = "https://magix.apps-de-cours.com/api/" . $service;

			$options = array(
				'http' => array(
					'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
					'method'  => 'POST',
					'content' => http_build_query($data)
				)
			);
			$context  = stream_context_create($options);
			$result = file_get_contents($apiURL, false, $context);

		if (strpos($result, "<br") !== false) {
				var_dump($result);
				exit;
			}

		return json_decode($result);
		}

	}