<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;

// Set environment
require_once('../../common/php/environment.php');


$content = file_get_contents('./data/opinions.json');
$data = Util::jsonDecode($content);

// Connect to database
$db = new Database();

$args = array();
foreach($data as $row) {
  $args = array_merge($args, array_values($row)); 
}

// Set query
$query = "INSERT INTO `opinions` 
					(`img`, `name`, `rating`, `review`) 
					VALUES";

// Execute query
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('Sikertelen');
}

// Set response
Util::setResponse("Köszönjük az értékelésed!");