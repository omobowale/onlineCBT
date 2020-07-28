
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
	
		<div id="timer" class="bg-default mt-5"><span style="display:block" id="scoreSpan" class="ml-0 float-left">
		Test Completed!!!
        </span>
		<span class="float-right pt-1 pr-5" id="timerSpan"></span></div>
		<?php
		
		
		
		
		
		
		
		
			$servername = 'localhost';
			$username = 'root';
			$password = '147258stiga';
			$dbname = 'ResultDB';
			$checker = 0;
			
			$conn = mysqli_connect($servername, $username, $password, $dbname);
			if(!$conn){
				die('connection failed : ' . mysqli_connect_error());
				}
			else
				{
					//echo "connected successfully" . '<br>';
					}
					
			$sql = "SELECT matnumber FROM resultTable";
			
			$result = mysqli_query($conn, $sql);// or die(mysqli_error($conn));
			
			if (mysqli_num_rows($result)>0){
				//echo "i got here";
				while ($row = mysqli_fetch_assoc($result)){
					if ($row['matnumber'] == $_COOKIE['matricnumber']){
						$checker = 1;
						}
					else{
						//echo "nothing found";
					}
					}
					mysqli_free_result($result);
				}
			

			if ($checker==0){
				//insert data into database
				$sql2 = "insert into resultTable (matnumber, groupnumber, score, remark) values (" 
				. "'". $_COOKIE['matricnumber'] . "'," 
				. $_COOKIE['groupnumber'] . ","
				. $_COOKIE['score'] . ","
				. "'" . $_COOKIE['remark'] . "'"
				. ")";
				
				if ($conn->query($sql2)=== TRUE){
					echo "Result successfully uploaded";
					}
				else {
					echo "Error : " . $sql2 . '<br>' . $conn->error;
					}
				
			}
			
			else {
				echo "Result already in database";
				}
			
			
			//close connection
			mysqli_close($conn);
		?>
        
        
        <div>
    	<div class="card mt-1">
        	<div class="card-header lead font-weight-bold" id="questionNumber">
            	Result 
            </div>
            
            <div class="card-body">
            	<h5 class="card-title mb-5 font-italic">Result Details</h5>
               
                <div id="optionsDiv">
                    <span>Matric No : <span class='text-uppercase'><?php echo $_COOKIE['matricnumber'] ?></span></span>
                    <br><hr>
                    <span>Group No : <span class='text-uppercase'><?php echo $_COOKIE['groupnumber'] ?></span></span>
                    <br><hr>
                    <span>Score : <span class='text-uppercase'><?php echo $_COOKIE['score'] ?></span> / 20</span>
                    <br><hr>
                    <span>Remark : <span class='text-uppercase'><?php echo $_COOKIE['remark'] ?></span></span>
                    <br><hr>
                    <a href='index.html' class='btn btn-success btn-lg'>OK</a>
                </div>
                
             
            </div>
          </div>
            
        </div>
    
    
    
    
</div>




<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/codes3.js"></script>

</body>
</html>
