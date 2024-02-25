<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;

// Set environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Get date now
$dateNow = date("Y-m-d H:i:s");

// Connect to database
$db = new Database();

// Set query (Check email already exist)
$query = "SELECT `id`,
								 `ended`
					 	FROM `newsletter` 
					 WHERE `email` = :email
					 LIMIT 1;";

// Execute query with argument
$result = $db->execute($query, $args);

// Check result
if (!is_null($result)) {

	// Simplifies result
	$result = $result[0];

	// Check is ended
	if (!is_null($result['ended']))
				Util::setResponse("Ön már leíratkozott hírlevelünkről!");
	else 	Util::setError('Ezen az email címen már felíratkoztak a hírlevelünkre!', $db);
}

// Set query
$query = "INSERT INTO `newsletter` (`email`, `begin`) VALUES";

// Execute query
$result = $db->execute($query, array(
	'email' => $args['email'],
	'begin'	=> $dateNow
));

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('A felíratkozás a hírlevelünkre nem sikerült!');
}

// Set response
Util::setResponse("Köszönjük hogy felíratkozott a hírlevelünkre!");