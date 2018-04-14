<?php

    //Data base Connect
    $SQL1 = mysqli_connect($DB['SERVER'], $DB['USER'], $DB['PASSWORD'], $DB['DATABASE']);
    mysqli_set_charset($SQL1, 'utf8');
    
    //Get the global php data
    require_once(dirname(__FILE__)."/../config/global.php");

    //Get extra config from the bundle
    $configFile = dirname(__FILE__) . "/../bundles/" . $CONFIG['BUNDLE'] . "/config/bundle.php";
    if (file_exists($configFile)) {
        require_once($configFile);
    }

    //Get the bundle functions
    foreach (glob(dirname(__FILE__) . "/../bundles/" . $CONFIG['BUNDLE'] . "/api/functions/*.php") as $functions) {
        require_once($functions);
    }

