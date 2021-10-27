<?php
include_once 'Category.php';
class Product
{
    // DB stuff
    private $dbConn;
    private $dbTable = 'products';
    private $category;     

    //Product Properties
    public $product_id;
    public $product_name;
    public $cat_id;
    public $product_price;
    public $product_quantity;
    public $product_image;
    public $product_active;

    // Constructor with DB-Connection
    public function __construct($dbConn)
    {
        $this->dbConn = $dbConn;
        $this->category = new Category($dbConn);
    }

    // Get all Products
    public function getAll()
    {
        // Create query
        $query="SELECT * FROM {$this->dbTable} ORDER BY product_name ASC";
        
        // Prepare statement
        $statement=$this->dbConn->prepare($query);
        
        //Execute query
        $statement->execute();
        return $statement;
    }


    // Filter Products By Category
    public function getProducts($cat_id)
    {
        // Create query
        $query="SELECT * FROM {$this->dbTable} WHERE cat_id = ? ORDER BY product_name ASC";
        
        // Prepare statement
        $statement=$this->dbConn->prepare($query);
        
        // Bind Category-ID
        $statement->bindParam(1, $cat_id);

        //Execute query
        $statement->execute();
        return $statement;
    }

    // Get One Product
    public function getProduct($id)
    {
        // Create query
        $query="SELECT * FROM {$this->dbTable} WHERE product_id = ? LIMIT 0,1";
        
        // Prepare statement
        $statement=$this->dbConn->prepare($query);
        
        // Bind ID
        $statement->bindParam(1, $id);
        //Execute query
        $statement->execute();

        $row = $statement->fetch(PDO::FETCH_ASSOC);

        if($row['product_active'] == 1)
        {
            $active = true;
        }
        else
        {
            $active = false;
        }
        
        // Set Properties
        $this->product_id = intval($row['product_id']);
        $this->product_name = $row['product_name'];
        $this->cat_id = intval($row['cat_id']);
        $this->product_price = doubleval($row['product_price']);
        $this->product_quantity = intval($row['product_quantity']);
        $this->product_image = $row['product_image'];
        $this->product_active = $active;
    }

    // Get Product Category
    public function getCategory()
    {
        $this->category->getCategory($this->cat_id);
        return $this->category;
    }

}
?>