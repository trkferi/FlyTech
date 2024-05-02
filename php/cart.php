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
					(`name`, `country_code`, `phone`, `email`, `address`, 
					 `card_name`, `card_number`, `cvc`, `user_id`, `expiration`) 
					VALUES";
					
// Execute query
$result = $db->execute($query, $args['data']);

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('Sikertelen fizetés (checkout)!', $db);
}

// Set query
$query = "INSERT INTO `checkout_row` 
					(`checkout_id`, `flights_id`, `price`, `quantity`, `total`) 
					VALUES";

$params = array();
foreach($args['cart'] as $item) {
	$params = array_merge($params, array(
		$result['lastInsertId'],
		$item['flights_id'],
		$item['price'],
		$item['quantity'],
		$item['total']
	));
}

// Execute query
$result = $db->execute($query, $params);

// Close connection
$db = null;

// Check not success
if ($result['affectedRows'] !== count($args['cart'])) {

	// Set error
	Util::setError('Sikertelen fizetés (checkout_row)!', $db);
}

// Set response
Util::setResponse("Sikeres fizetés!");