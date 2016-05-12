<?php
$link = mysql_connect('localhost','root','');
        mysql_select_db('mediamondb',$link);
		mysql_query('SET character_set_results=utf8');
		mysql_query('SET character_set_client=utf8');
		mysql_query('SET character_set_connection=utf8');
?>

