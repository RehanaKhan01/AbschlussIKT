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
    include_once '../models/Product.php';
    // Instantiate Product object
    $product = new Product($dbConn);
    
    $product->getProduct($id);
    $category = $product->getCategory();

    $responseArray = array(
        'id' => $product->product_id,
            'name' => $product->product_name,
            'category' => array(
                'id' => $category->cat_id,
                'name' => $category->cat_name,
                'image' => $category->cat_image,
                'active' => $category->cat_active
            ),
            'price' => $product->product_price,
            'quantity' => $product->product_quantity,
            'image' => $product->product_image,
            'active' => $product->product_active
    );
}

echo json_encode($responseArray);
?>