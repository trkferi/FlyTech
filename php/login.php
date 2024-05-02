<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;

// Set environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Set query
$query = "SELECT 	`id`, 
									`name`,
									`born` 
									`country_code`, 
									`phone`, 
									`address` 
						FROM 	`users` 
						WHERE `email` = :email AND
									BINARY `password` = BINARY :password;";

// Execute query with arguments
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check result
if (is_null($result)) {

	// Set error
	Util::setError('Az email cím, vagy a jelszó hibás!');
}

// Simplify result
$result = $result[0];

// Set response
Util::setResponse($result);