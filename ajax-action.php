<?php    
	require_once("action/GameAction.php");

	$action = new GameAction();
	$data =$action->execute();
	
    echo json_encode($data["result"]);
    
    