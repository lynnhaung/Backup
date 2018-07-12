<?php

include './file_cache/src/FileCache.php';

//File Cache of graph data.
$whole_class_data = null;

$whole_class_data = array(
    node_person => 'test1',
	node_inwords => '測試詞1',
	node_outwords => '測試詞2'
);

$cache = new FileCache();

$id = "personal_data"; //cache id
$data = $whole_class_data; //cache data
$lifetime = 3600; //cache lifetime

$cache->save($id, $data, $lifetime);

print_r ($cache->get($id));