<?php

$post_username = "";
$post_score = 0;
$post_country = "";

if(isset($_POST['username']) == TRUE)
{
	$post_username = $_POST['username'];
}
else $error = "LEADERBOARD ERROR: NO USERNAME";

if(isset($_POST['score']) == TRUE)
{
	$post_score = $_POST['score'];
}
else $error = "LEADERBOARD ERROR: NO SCORE";

if(isset($_POST['country']) == TRUE)
{
	$post_country = $_POST['country'];
}
else $error = "LEADERBOARD ERROR: NO COUNTRY";

///////////////////////////////////////////
//=> CONNECT TO THE DATABASE
///////////////////////////////////////////
$servername = "sql212.byethost7.com";
$username = "b7_16895945";
$password = "b3SdnsRGqSsf6XtG";

$db_name = "b7_16895945_runforest_leaderboard";

//Create connection
$conn = new mysqli($servername, $username, $password, $db_name);

//Check connection
if($conn->connect_error) {
	die("DB Connection failed: " . $conn->connect_error);
}

///////////////////////////////////////////
//=> CHECK IF USER ALREADY EXISTS IN THE DATABASE
///////////////////////////////////////////
$sql = "SELECT username, score FROM TB_LEADERBOARD WHERE username = '" . $post_username .  "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$row = $result->fetch_assoc();

    // check if his current top score is greater than the saved one
    $user_top_score = $row["score"];
    if($post_score > $user_top_score) {
    	//update player's score
    	///////////////////////////////////////////
		//=> UPDATE THE DATABASE
		///////////////////////////////////////////
		$sql = "UPDATE TB_LEADERBOARD " .
				"SET score=" . $post_score . ", country='" . $post_country . "' " .
				"WHERE username='" . $post_username .  "'";

		if($conn->query($sql) === TRUE) {
			echo "Username: " . $post_username . 
				", score: " . $post_score . 
				", country: " . $post_country . 
				" UPDATED successfully.";
		}
		else {
			echo "Error " . $sql . "<br>" . $conn->error;
		}
    }
} else {
	echo "0 results. Insert score into the database.";
    ///////////////////////////////////////////
	//=> INSERT INTO THE DATABASE
	///////////////////////////////////////////
	$sql = "INSERT INTO TB_LEADERBOARD (username, score, country)
			VALUES ('" . $post_username .  "', '" . $post_score .  "', '" . $post_country .  "')";

	if($conn->query($sql) === TRUE) {
		echo "Username: " . $post_username . 
			", score: " . $post_score . 
			", country: " . $post_country . 
			" CREATED successfully.";
	}
	else {
		echo "Error " . $sql . "<br>" . $conn->error;
	}
}

$conn->close();

?>