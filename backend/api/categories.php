<?php
include_once '../models/Category.php';
include_once './response_header.php';

// Instantiate Category object
$category = new Category($dbConn);

// Categories query
$result = $category->getAll();
// Get row count
$rowCount = $result->rowCount();

// Check if any Categories
if($rowCount > 0)
{
    // Categories array
    $categoriesArray = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC))
    {
        extract($row);
        if($cat_active == 1)
        {
            $active = true;
        }
        else
        {
            $active = false;
        }
        
        $categoryItem = array(
            'id' => intval($cat_id),
            'name' => $cat_name,
            'image' => $cat_image,
            'active' => $active
        );

        array_push($categoriesArray, $categoryItem);
    }

    // Turn to JSON & Output
    echo json_encode($categoriesArray);
}
else
{
    // No Categories
    echo json_encode(
        array('message' => 'No Categories Found' )
    );
}
?>