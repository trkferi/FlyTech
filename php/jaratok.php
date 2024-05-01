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

// Get next day (+24h)
$args['start']  = date('Y-m-d H:i', strtotime('+1 day'));

// Set query 
$query = "SELECT  `flights_id`,
                  `name`,
                  `distance`, 
                  `period`, 
                  `price`,
                  `direction`,
                  LEFT(`start`, 16) AS `start`
            FROM `flights` 
            WHERE `starting_id` = :id AND
                  LEFT(`start`, 16) > :start 
                  ORDER BY `start` ASC";
            
// Execute query with argument
$result['flights'] = $db->execute($query, $args);

// Set query 
$query = "SELECT DISTINCT `name`,
                          `direction`            
                     FROM `flights` 
                    WHERE `starting_id` = :id AND
                          LEFT(`start`, 16) > :start";

// Execute query with argument
$result['names'] = $db->execute($query, $args);

// Close connection
$db = null;

// Set response
Util::setResponse($result);