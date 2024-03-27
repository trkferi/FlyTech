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
$query = "SELECT 
                  `distance`, 
                  `period`, 
                  `price`,
                  `start`
            FROM `flights` 
            WHERE `starting_id` = :id";
            
$query1 = "SELECT 
            `direction`
      FROM `flights` 
      WHERE `starting_id` = :id";

// Execute query with argument
$result2 = $db->execute($query, $args);

// Execute query with argument
$result = $db->execute($query1, $args);

// Close connection
$db = null;

// Set response
Util::setResponse($result);