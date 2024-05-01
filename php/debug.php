<?php
declare(strict_types=1);

$_POST['data'] = '{"data":{"name":"Ódry Attila","country_code":"36","phone":"701234123","email":"odry.attila@keri.mako.hu","address":"Szeged","card_name":"Ódry Attila","card_number":"1111111111111111111","cvv":"123","expiration":"2025/03"},"cart":[{"flights_id":49,"quantity":3,"price":40000,"total":120000},{"flights_id":56,"quantity":2,"price":40000,"total":80000},{"flights_id":70,"quantity":1,"price":42000,"total":42000},{"flights_id":63,"quantity":1,"price":40000,"total":40000}]}';

// Call php file to debug
require_once('./cart.php');