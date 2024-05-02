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

// Merge arguments with default
$args = Util::objMerge(array(
  "name" => null,
	"born" => null,
	"country_code" => null,
	"phone" => null, 
	"address" => null, 
  "email" => null, 
  "password" => null,
), $args, true);

// Set query
$query = "INSERT INTO `users` 
					(`name`, `born`, `country_code`, `phone`, 
					 `address`, `email`, `password`) VALUES";

// Execute query with arguments
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('A regisztráció sikertelen!');
}

// Set response
Util::setResponse($result);