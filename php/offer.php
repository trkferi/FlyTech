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
$query = "INSERT INTO `offer` 
					( `depature`, `arrive`, `name`, `country_code`, `phone`, `email`, `address`, `comment`, `price` ) 
					VALUES";

// Get date now
$args['price'] = 1350000;

// Execute query
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('Valami hiba történt!');
}

// Set response
Util::setResponse("Köszönjük hogy jelenkezett tesztvezetésre!\nMunkatársunk hamarossan felveszi Önnel a kapcsolatot!");



