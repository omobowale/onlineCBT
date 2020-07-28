$(function(){
var questions = [];
var answers = [];
var answer = [];
var modAnswers = [];
var modQuestions = [];
var questionIndex = 0 ;
var questionLength = 10;
var totalNumberOfQuestions = 0;
var randomSelector = [];
var pointer = 0;
var answerIndex = 0;
var questionNumber = 1;
var difference = 0;
var choices = ["a", "b", "c", "d", "e", "f", "g"];
var selected = 0;
var score = 0;
var remark = "";
var timeMinute = 6;
var timeSecond = 60;
var status = false;
var matNo = "";
var groupNo = 0;
var gn = "gn";
var mn = "mn";
var cc = "";
var timer = null;

function getSelected(){	
	return selected;
}

$("#takeTest").click(function(){
	
/*	groupNo = $("#grpno option:selected").val();
	matNo = $("#matno").val();
	$.cookie("test", 5, {expires:7, path:'/'});
	
//	$.cookie(mn, matNo);
	//alert($.cookie("test"));*/
	window.location = "taketest.php";
	//alert($.cookie("test"));
	//alert(matNo);

	});
	
	
function populateRandomSelector(){
	while(randomSelector.length < questionLength){
		n = Math.round(Math.random() * totalNumberOfQuestions);
		if (!isIn(n, randomSelector)){
			randomSelector.push(n);
			}
		}
	}
	
function isIn(x, arr){
	for (var i = 0; i < arr.length; i++){
		if (x == arr[i]){
			return true;
			}
		}
		return false;
	}

function showArray(arr){
	var a = "";
	for (var i = 0; i < arr.length; i++){
		a = arr[i] + ", " + a;
		}
		alert(a);
	}			

function getSelectedBox(){
	var selected = document.forms.myform.radioGroup.value;
	}

function displayResultBoard(){
	if ((score * 2) >= 18){
		remark = "Excellent";
		//c = "bg-success";
		}
	else if ((score * 2) >= 16){
		remark = "Very Good";
		c = "bg-info";
		}
	else if ((score * 2) >=10){
		remark = "Good";
		//c = "bg-alert";
		}
	else if ((score * 2) >= 8){
		remark = "Fair";
		//c = "bg-warning";
		}
	else {
		remark = "Poor";
		//c = "bg-danger";
		}
	$("#scoreSpan").text("Test completed!!!");
	$("#questionNumber").text("");
	$(".card-title").text("");
	$("#optionsDiv").text("");
	$("#questionNumber").text("Result");
	$(".card-title").text("Result Details");
	$("#optionsDiv").html("<span>Matric No : <span class='text-uppercase'>" + matNo + "</span></span>" +  "<br><hr>" + "<span>Group No : " + groupNo + "</span>" +  "<br><hr>" + "<span>Score : " + score * 2 + " / " + questionLength * 2 + "</span>" + "<br><hr>" + "<span>Remark : " + remark + "</span>" +  "<br><hr>" + "<a href='index.html' class='btn btn-success btn-lg'>OK</a>");
	}


function getGroupNo(){
	var gn = $("#matno").val()[16];
	gn += $("#matno").val()[17];
	gn += $("#matno").val()[18];
	var cgn = parseInt(gn);
	if(cgn >=251)
		return 6;
	else if(cgn >= 201)
		return 5;
	else if(cgn >=151)
		return 4;
	else if(cgn >= 101)
		return 3;
	else if(cgn >=51)
		return 2;
	else if(cgn >=1)
		return 1;
	else{
		return 0;
		}
	}
	
/*$("#goButton").click(function (){
	var erro ="";
	
//	alert($.cookie("test"));
//alert("na wa wa o");
	if($("#matno").val().length != 19){
		erro+="check your matric no" + "\n";
		}
	
	else if($("#grpno option:selected").val() < 1){
		erro+="You have not selected your group number" + "\n";
		}
	else if(getGroupNo() != parseInt($("#grpno option:selected").val())){
		erro+="please, enter a valid group no: Your should be in group " + getGroupNo() + "\n";
		}
	else{
		}
	//alert(erro);
	if (erro.length==0){
		alert("correct");
		groupNo = $("#grpno option:selected").val();
		matNo = $("#matno").val();
	}
	
	else{
		 alert(erro);
		 }
});*/

$("#goButton").click(function(){
	$("#scoreSpan").show();
	var erro ="*";
	
//	alert($.cookie("test"));
//alert("na wa wa o");
	if($("#matno").val().length != 19){
		erro+="check your matric no" + "\n*";
		}
	
	if($("#grpno option:selected").val() < 1){
		erro+="You have not selected your group number" + "\n*";
		}
	if(getGroupNo() != parseInt($("#grpno option:selected").val())){
		erro+="please, enter a valid group no: You should be in group " + getGroupNo() + "\n";
		}
	else{
		}
	//alert(erro);
	if (erro.length<=1){
		//alert("correct");
		groupNo = $("#grpno option:selected").val();
		matNo = $("#matno").val();
	
	
	/*else{
		 alert(erro);
		 }*/
	
	
	window.onpopstate = function(){
	alert("You cannot go back on this test");
	}; history.pushState({}, '');
	
	/*$(window).bind('beforeunload',function(){
		return "bye for now";
		});*/
	
	status = true;
	timer = setInterval(function(){
		if(timeSecond==0){
			timeMinute--;
			timeSecond = 60;
			}
		if(timeMinute==-1){
			$("#timerSpan").hide();
			status = false;
			$("#nextButton").hide();
			displayResultBoard();
			//alert("You scored " + score + " out of " + questionLength);
			clearInterval(timer);
			}
		timeSecond--;
		if (timeSecond < 10){
			$("#timerSpan").text("Time Remaining = " + timeMinute + " min(s) " + " : " + "0" + timeSecond + " sec(s) ");
		}
		else{
			$("#timerSpan").text("Time Remaining = " + timeMinute + " min(s) " + " : " + timeSecond + " sec(s) ");
			}
		},1000);
	$("#optionsDiv").text("");
	$("#startButton").hide();
	$("#nextButton").hide();
	
	loadQandA();
	//showArray(randomSelector);
	//$("#nextButton").attr('disabled','disabled');
	
	$("#loginModal").modal('toggle');
	$(".detailsConfirmation").hide();
	$("#navigate").hide();
	}
	
	else
		{
			alert(erro);
			}
	//alert("i got here");
	});


$("#nextButton").click(function (){
	$(this).hide();
	getSelected();
	//alert("selected = " + selected.length);
	//alert("correct = " + answer[randomSelector[pointer]][0].length);
	if(selected == answer[randomSelector[pointer]][0]){
		score++;
		//alert(score);
		}
	selected = 0;
	if(questionIndex < questionLength - 1){
		questionIndex++;
		answerIndex++;
		pointer++;
		$("#optionsDiv").text("");
		startTest();
		questionNumber++;
		$("#questionNumber").text("Question " + questionNumber + " of " + questionLength);
	}
	
	else{
		$("#nextButton").hide();
		clearInterval(timer);
		displayResultBoard();
		//alert("You scored " + score + " out of " + questionLength);
		}
	});
	
function emptyArray(a){
		a.splice(0,a.length);
	}

function loadQandA(){
$.get('questions.txt', function(data){
	//alert(data);
	var  lines = data.split("###");
	$.each(lines, function(n, urlRecord){
		//$("#questionScreen").append("<ul>" + "<li>" + urlRecord +  "</li>" + "</ul>");
		
		questions.push(urlRecord);
		
		});
		totalNumberOfQuestions = questions.length;
		//alert(questions.length);
		
	})
	
$.get('answer.txt', function(data){
	//alert(data);
	var  lines = data.split("\n");
	$.each(lines, function(n, urlRecord){
		//$("#questionScreen").append("<ul>" + "<li>" + urlRecord +  "</li>" + "</ul>");
		
		answer.push(urlRecord);
		
		});
		//alert(answer.length);
		
	})

$.get('answers.txt', function(data){
	var  lines = data.split("---");
	$.each(lines, function(n, urlRecord){
		answers.push(urlRecord);
		})
		var ind = 0;
		//alert("the initial is " + questions.length);
		for(i=0; i<questions.length; i++){
			if (questions[i].length == 0){
					continue;
					}
			modQuestions[ind] = questions[i];
			ind++;
		}
		//alert(answers.length);
		//alert("the final is "+modQuestions.length);
		//questionLength = modQuestions.length;
		alert(totalNumberOfQuestions);
		populateRandomSelector();
		startTest();
		})
		
}
	

function startTest(){	
		$(".card-title").text(questions[randomSelector[pointer]]);
		//for(i=questionIndex; i<questionIndex + 1; i++){
		
			for(j=randomSelector[pointer]; j<randomSelector[pointer] + 1; j++){
				modAnswers = answers[j].split("--");
				
//				var pattern = /[\s\s]/g;
	//				alert(pattern.test(modAnswers[3]));
					
					
				for(k = 0; k < modAnswers.length; k++){
					if (modAnswers[k].length < 3){
							continue;
					}
					
					$("#optionsDiv").append("<a class='btn text-left nav-item nav-link border-dark mt-2 mb-4'>" + 
					
                    "<div class='form-check'>" + 
                        "<input class='a form-check-input' value='" + choices[k] + "' type='radio' name='radioGroup'/>" + 
                        "<label id='option1' class='form-check-label'>" + modAnswers[k] + "</label>" + 
                    "</div>" +
               "</a>");
			   
				}
				//answerIndex++;
			//}
			$("input[name='radioGroup']:radio").change(function(){
				selected = $(this).val();
				$("#nextButton").show();
				});
		}
		
		$("#questionNumber").text("Question " + questionNumber + " of " + questionLength);
}


})