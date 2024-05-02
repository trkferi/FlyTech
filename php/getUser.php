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
$query ="SELECT `name`,
								`born`,
								`country_code`,
								`phone`,
								`address`,
								`email`
					 FROM `users`
					WHERE `id` = :id
					LIMIT 1;";

// Execute query
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not found
if (is_null($result)) {

	// Set error
	Util::setError("A felhasználó nem létezik!");
}

// Simplifies result
$result = $result[0];

// Set response
Util::setResponse($result);