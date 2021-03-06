<?php

/*
 * Aplicacao dinamica para qualquer tipo de base de dados
 * Nesta aplicacao voce podera criar sua api apenas criando patterns de exibição
 * Não necessitando conhecimento de desenvolvimento de software
 * A aplicacao é totalmente dinamica e automatica.
 * Para solicitar novos drivers de conexao contate-me guilhermecamacho.com
 * */

session_start();

$time_start = microtime(true);
//header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

setlocale(LC_ALL, 'pt_BR.UTF-8');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     //The request is using the POST method
     die();
}
/* as configuracoes a baixo sao para desenvolvimento */
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_erros', 1);
/* as configuracoes a acima sao para desenvolvimento */

/* Arquivos necessarios base para o funcionamento */
require 'config.php';
require 'controller/helpers/helpers.function.php';
require 'controller/urlservices/urlservice.php';
require 'controller/security/security.php';
require 'controller/pattern/pattern.php';
require 'controller/DriverConnection/DriverConnection.php';
require 'controller/CustomResponse/CustomResponse.php';
require 'controller/ProcessResult/ProcessResultClass.php';
/* Arquivos necessarios base para o funcionamento */

/*Inicio o controle de rota*/
$url = new urlService($_SERVER['REQUEST_URI']);
$route = $url->getPages();
/*Inicio a base de seguranca*/
$secure = new security('GET', $auth);

if ($secure->basicauth()) {
    $pattern = new pattern($route, $pattern_path);
    $pattern = $pattern->start();
    $result = $pattern;
    if (!in_array_r_like_key('error', $pattern)) {
        $driver = new DriverConnection($pattern);
        $result = $driver->start();
    }
    $ProcessResult = new ProcessResultClass($result);
    echo $ProcessResult->json();
} else {
    header('Content-Type: application/json');
    http_set_code(403);
    echo json_encode(['error' => 'Forbidden']);
}

$time_end = microtime(true);
$execution_time = round(($time_end - $time_start) * 1000);
