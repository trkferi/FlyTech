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
$query = "INSERT INTO `checkout` 
					(`name`, `country_code`, `phone`, `email`, `address`, `cardNumber`, `cardName`, `expiration`, 'cvc') 
					VALUES";
					

// Execute query
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('Sikertelen fizetés');
}

// Set response
Util::setResponse("Sikeres fizetés!");