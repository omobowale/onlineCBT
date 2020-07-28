<?php 
if (isset($_REQUEST['submit_btn'])){
	setcookie("matricnumber", $_POST['matno']);
	setcookie("groupnumber", $_POST['groupno']);
}
?>

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
<?php 
$servername = 'localhost';
$username = 'root';
$password = '147258stiga';
$dbname = 'ResultDB';
?>

<div class="container" style="">
		
		 <nav role="navigation" id="navigate" class="navbar navbar-expand-lg navbar-light bg-dark mt-0 mb-5 fixed-top">
    	<a class="navbar-brand btn btn-outline-secondary disabled text-white" href="#">C B T</a>
        <button  class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarContent" data-target="#navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        	<span class="navbar-toggler-icon border-dark"></span>
        </button>
        
        <div class="collapse navbar-collapse bg-transparent" id="navbarContent">
        <ul class="navbar-nav mr-auto">
        	<li class="nav-item ">
            	<a class="nav-link active text-white" href="index.html">Home<span class="sr-only">(current)</span></a>
            </li>
           <li class="nav-item">
            	<a class="nav-link text-white" href="checkResult.php">Result<span class="sr-only">(current)</span></a>
            </li>
           
        </ul>
        
        <button class="modalToggler btn mr-5 btn-outline-secondary" id="loginButton" data-toggle="modal" data-target="#loginModal">Start Test</button>
        
        <form class="form-inline my-2 my-lg-0">
        	
            
        	<div class="input-group">
                <input class="form-control" type="search" placeholder="Search" aria-label="Search"/>
                <div class="input-group-append"><button type="submit" class="btn btn-outline-info">Go</button></div>
            </div>
        </form>
        </div>
    </nav>

<div id="confirmModal" class="modal col-xs-12 col-md-5 bg-white">
	<div class="modal-dialog">
		<div class="modal-content px-4 py-4 mt-4">
			<div class="modal-header">
				<h3 class="text-center">Please confirm your details here:</h3>
			</div>
			<div class="modal-body">
				<p>Matric No: <span id="matNoValue" class="text-uppercase"></span></p>
				<p>Group No: <span id="groupNoValue"></span></p>
			</div>
			<div class="modal-footer">
				<button id="detailsCancel" class="btn btn-danger">Cancel</button>
				<button id="okButton" class="btn btn-success">Correct</button>
			</div>
		</div>
	</div>
</div>



<!--beginning of login modal div-->
<div class="modal fade col-xs-12 col-md-6 bg-white" id="loginModal">
	<div class="modal-dialog">
    	<div class="modal-content px-4 py-4 mt-4">  <!--beginning of modal content div-->
        	<div class="modal-header">
            	<h4 class="modal-title" id="loginTitle"><?php echo "Please enter your details here to start test";?></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            <div class="modal-body">
            
            	<div class="form-group">
                    <label class="col-form-label sr-only" for="username">Matric Number</label>
                    <input id="matno" maxlength="19" name="matno" class="form-control border-secondary inputter text-uppercase" type="text" placeholder="CST/NDCOMS/2017/000"/>
                    <label id="matricNo" class="text-success font-weight-bold"></label>
                </div>
                
                <div class="form-group">
                	<select name="groupno" id="grpno" class="form-control inputter">
                    	<option disabled selected>Select your group</option>
                    	<option value="1">Group 1</option>
                        <option value="2">Group 2</option>
                        <option value="3">Group 3</option>
                        <option value="4">Group 4</option>
                        <option value="5">Group 5</option>
                        <option value="6">Group 6</option>
                    </select>
                    <label id="groupNo" class="text-success font-weight-bold"></label>
                </div>
            </div>
            
            <div class="modal-footer">
            
                	<button id="goButton" type="button" data-toggle="modal" data-target="#loginModal" class="btn btn-info">Go</button>
					
            </div>
           
           
        </div> <!--end of modal content div-->
        
	</div>
</div>
<!--end of login modal div-->



		<!--beginning of timer div-->
		<div id="timer" class="mt-5"><span id="scoreSpan" class="ml-3 float-left">
            Note : You must select an option before moving to a next question
            </span>
            <span class="float-right pt-1 pr-5" id="timerSpan">Time Alloted = 5 min(s) : 00 sec(s)</span>
        </div>
        <!--end of timer div-->
        
        
            <?php
			$conn = new mysqli($servername, $username, $password);
			if($conn->connect_error){
				die('connection failed : ' . $conn->connect_error);
				}
			else
				{
					
					}
			

?>     
    	<div class="card mt-1 col-12">
        	<div class="card-header lead font-weight-bold" id="questionNumber">
            	Instructions 
            </div>
            
            <div class="card-body">
            	<h5 class="card-title mb-5 font-italic">Please read the following instructions carefully</h5>
                
              <div id="cover">
                <div id="optionsDiv"> <!--beginning of options div-->
                    <ul>
                    	<li>There are ten(10) questions to be answered within 5 minutes.</li>
                        <li>All questions carry equal marks.</li>
                        <li>You must answer a question before going to the next.</li>
                        <li>Be sure of your answer before going to a next question as there is no provision for going back.</li>
                        <li>Wish you all the best!!!</li>
                    </ul>
                
                </div> <!--end of options div-->
               </div>

                <div style="text-align:center">
                    <button id="startButton" type="button" class="modalToggler btn btn-lg text-success bg-white border-success" data-toggle="modal" data-target="#loginModal">Start Test</button>
                    <button id="nextButton" type="button" class="btn btn-lg text-success bg-white border-success float-right">Next</button>
                    <form action="resultPage.php" method="post">
                        <button id="resultButton" type="submit" class="btn btn-lg text-success bg-white border-success float-right" name="result">Show Result</button>
                    </form>
				</div>
                
            </div><!--end of card-body div-->
            
          </div> 
    <!--end of card div-->
    
   <div id="showAllDiv"> 
   </div>
    
	
	
</div>


<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>

<script src="js/codes3.js"></script>


</body>
</html>
