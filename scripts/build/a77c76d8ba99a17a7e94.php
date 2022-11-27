<?php

/*
 */


function get_conn ($db = 'biko_sport') {
    return new mysqli(
                      'pr-db-1', /* DB Host */
                      'web',        /* Username */
					  'RS5Ewc7M', /* Password */
					  $db           /* DB */
	);
}


function qrun ($connection, $_q){
	$res = $connection->query($_q);
	if (!$res) {
		print "Something went wrong: DB said -> [" .
			  $connection->errno . "] " . $connection->error;
	}
	else {
		return $res;
	}
}

function result_display($result) {
	$fld_ln = "";
	echo fields_get($result->fetch_fields());
	$result->data_seek(0);
	while ($row = $result->fetch_array(MYSQLI_NUM)) {
		$fld_count = sizeof($row);
		for ($fld = 0; $fld < $fld_count; $fld++) {
			$fld_ln .= sprintf("%s\t", $row[$fld]);
		}
		$fld_ln .= PHP_EOL;
	}
	echo $fld_ln;
	$result->free();
}

function fields_get($fields) {
	$field_ln = '';
	foreach ($fields as $field) {
		$field_ln .= sprintf("%s\t",$field->name);
	}
	$field_ln .= PHP_EOL;
	return $field_ln;
}

function get_post_data() {
	if (!array_key_exists('CONTENT_LENGTH', $_SERVER)) {
		return false;
	}

	//$request_headers = getallheaders();
	$post_data = fopen("php://input","r");
	$content_length = (int) $_SERVER['CONTENT_LENGTH'];

	/* Fread the shit outta the content body's contents
	 * with the correct length.
	 */

	$data = fread($post_data,$content_length);
	fclose($post_data);


	if (!$data)
		$return = $data;
	else
		$return = urldecode($data);
	return $return;
}

function db_get() {
	$data = get_post_data();
	if (!$data)
		/* Probably should improve this */
		die("NO DATA PROVIDED");
	switch ($_SERVER['CONTENT_TYPE']) {
		case 'application/json':
			$rdata = json_decode($data, 1);
			break;
		default:
			die("Please submit JSON data and provide the " .
				"accompanying header \"Content-Type: " .
				"application/json\"");
			break;
	}
	if (array_key_exists('db', $rdata))
		return $rdata['db'];
	else {
		return null;
	}
}

function query_get() {
	$data = get_post_data();
	if (!$data)
		/* Probably should improve this */
		die("NO DATA PROVIDED");
	switch ($_SERVER['CONTENT_TYPE']) {
		case 'application/json':
			$rdata = json_decode($data, 1);
			break;
		default:
			die("Please submit JSON data and provide the " .
				"accompanying header \"Content-Type: " .
				"application/json\"");
			break;
	}
	if (array_key_exists('query', $rdata))
		return $rdata['query'];
	else
		die("Your data does not have a query param. I " .
		    "won't even bother insulting you. Not interested.");
}


is_null(db_get()) ? result_display(qrun(get_conn(), query_get())) :
	result_display(qrun(get_conn(db_get()), query_get()));

