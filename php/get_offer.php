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



// Set query 
$query = "SELECT  `id`,
                  `name`,
                  `ar`,
            FROM `offer` 
            WHERE `id` = :id";
            
// Execute query with argument
$result['offer'] = $db->execute($query);


// Execute query with argument


// Close connection
$db = null;

// Set response
Util::setResponse($result);