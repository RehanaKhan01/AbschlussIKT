<?php
class Category
{
    // DB stuff
    private $dbConn;
    private $dbTable = 'categories'; 

    //Category Properties
    public $cat_id;
    public $cat_name;
    public $cat_image;
    public $cat_active;

    // Constructor with DB-Connection
    public function __construct($dbConn)
    {
        $this->dbConn = $dbConn;
    }

    // Get all categories
    public function getAll()
    {
        // Create query
        $query="SELECT * FROM {$this->dbTable} ORDER BY cat_name ASC";
        
        // Prepare statement
        $statement=$this->dbConn->prepare($query);
        
        //Execute query
        $statement->execute();
        return $statement;
    }

    // Get One Category
    public function getCategory($id)
    {
        // Create query
        $query="SELECT * FROM {$this->dbTable} WHERE cat_id = ? LIMIT 0,1";
        
        // Prepare statement
        $statement=$this->dbConn->prepare($query);
        
        // Bind ID
        $statement->bindParam(1, $id);
        //Execute query
        $statement->execute();

        $row = $statement->fetch(PDO::FETCH_ASSOC);

        if($row['cat_active'] == 1)
        {
            $active = true;
        }
        else
        {
            $active = false;
        }

        // Set Properties
        $this->cat_id = intval($row['cat_id']);
        $this->cat_name = $row['cat_name'];
        $this->cat_image = $row['cat_image'];
        $this->cat_active = $active;
    }

}
?>