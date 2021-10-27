<?php
include_once '../models/Product.php';
include_once './response_header.php';

// Instantiate Product object
$product = new Product($dbConn);

$cat_id =isset($_GET['category']) ? $_GET['category'] : 0;
// Products query
if($cat_id>0)
{
    $result = $product->getProducts($cat_id);
}
else
{
    $result = $product->getAll();
}

// Get row count
$rowCount = $result->rowCount();

// Check if any Products
if($rowCount > 0)
{
    // Products array
    $productsArray = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC))
    {
        extract($row);
        if($product_active == 1)
        {
            $active = true;
        }
        else
        {
            $active = false;
        }
        
        $product->cat_id =$cat_id;
        $category = $product->getCategory();

        $productData = array(
            'id' => intval($product_id),
            'name' => $product_name,
            'category' => array(
                'id' => $category->cat_id,
                'name' => $category->cat_name,
                'image' => $category->cat_image,
                'active' => $category->cat_active
            ),
            'price' => doubleval($product_price),
            'quantity' => intval($product_quantity),
            'image' => $product_image,
            'active' => $active
        );

        array_push($productsArray, $productData);
    }

    // Turn to JSON & Output
    echo json_encode($productsArray);
}
else
{
    // No Products
    echo json_encode(
        array('message' => 'No Products Found' )
    );
}
?>