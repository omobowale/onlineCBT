
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="css/styles.css" />
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script src="jq/jquery-3.3.1.min.js"></script>
<script src="jquery_cookie.js"></script>
<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.min.css" />
<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.css" />
<script src="jquery-ui-1.12.1/jquery-ui.min.js"></script>

<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.theme.min.css" />
<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.structure.min.css" />
<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.structure.css" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes"/>

<link href="css/bootstrap.min.css" rel="stylesheet">
<title>CBT</title>

<body>

<div class="container" style="position:relative">

        <div>
    	<div class="card mt-1">
        	<div class="card-header lead font-weight-bold" id="questionNumber">
            	Result 
            </div>
            
            <div class="card-body">
            	<h5 class="card-title mb-5 font-italic">Result for all students is shown here<hr>
                <form method="post">
                <select name="groupNo" class="custom-select">
                	<option class="table-hover" value="0">Select a group</option>
                	<option value="1">Group 1</option>
                    <option value="2">Group 2</option>
                    <option value="3">Group 3</option>
                    <option value="4">Group 4</option>
                    <option value="5">Group 5</option>
                    <option value="6">Group 6</option>
                    <option value="0" selected>All Groups</option>
                </select>
                <button class="btn btn-success" disabled name="formSubmit" type="submit">check</button>
                </form>
                </h5>
               	<table class="table table-bordered table-hover table-striped">
                	<tr><th>S/N</th><th>Matric Number</th><th>Group No</th><th>Score</th><th>Remark</th></tr>
                
                
                <div id="optionsDiv">
                    <?php
						if(isset($_POST['formSubmit'])){
							$selection = $_POST['GroupNo'];
							if ($selection == 0)
								$sql = "SELECT * FROM resultTable where groupnumber=" . $selection;
							else
								$sql = "SELECT * FROM resultTable";
							}
						else{
							$sql = "SELECT * FROM resultTable";
							}
						$servername = 'localhost';
						$username = 'root';
						$password = '147258stiga';
						$dbname = 'resultdb';
						$checker = 0;
						$sn = 0;
						
						$conn = mysqli_connect($servername, $username, $password, $dbname);
						if(!$conn){
							die('connection failed : ' . mysqli_connect_error());
							}
						else
							{
								//echo "connected successfully" . '<br>';
								}
								
						
						
						$result = mysqli_query($conn, $sql);// or die(mysqli_error($conn));
						
						if (mysqli_num_rows($result) > 0){
							//echo "i got here";
							while ($row = mysqli_fetch_assoc($result)){
								 echo "<tr class='text-uppercase'><td>" . ++$sn . "</td><td>" . $row['matnumber']. "</td><td>". $row['groupnumber']. "</td><td>" . $row['score'] . "</td><td>" . $row['remark']. "</td></tr>";
								}
								mysqli_free_result($result);
							}
			
			
			
						//close connection
						mysqli_close($conn);
					?>
               </table> 
                  <a href='index.html' class='btn btn-success btn-lg'>OK</a>
                </div>
                
             
            </div>
          </div>
            
        </div>
    
    
    
    
</div>




<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/codes2.js"></script>

</body>
</html>
