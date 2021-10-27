<?php
include_once './response_header.php';

// response array
$responseArray;
$id =isset($_GET['id']) ? $_GET['id'] : 0;
if($id == 0)
{
    $responseArray = array(
        'message' => 'Invalid query'
    );
}
else
{
    include_once '../models/Category.php';
    // Instantiate Category object
    $category = new Category($dbConn);

    $category->getCategory($id);

    $responseArray = array(
        'id' => $category->cat_id,
        'name' => $category->cat_name,
        'image' => $category->cat_image,
        'active' => $category->cat_active
    );
}

echo json_encode($responseArray);
?>