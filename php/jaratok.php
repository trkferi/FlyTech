<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;
$_POST['data'] = '{"id":1}';

// Set environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Get next day (24h)
$args['start'] = date('Y-m-d H:i:s', strtotime(' +1 day'));

// Set query 
$query = "SELECT  `flights_id`,
                  `name`,
                  `distance`, 
                  `period`, 
                  `price`,
                  `start`
            FROM `flights` 
            WHERE `starting_id` = :id AND
                  `start` > :start";
            
// Execute query with argument
$result['flights'] = $db->execute($query, $args);

// Set query 
$query = "SELECT DISTINCT `name`,
                          `direction`
                     FROM `flights` 
                    WHERE `starting_id` = :id AND
                          `start` > :start";

// Execute query with argument
$result['names'] = array();
$names = $db->execute($query, $args);
foreach($names as $row) {
  $result['names'][] = $row['name'];
}

// Close connection
$db = null;

// Set response
Util::setResponse($result);