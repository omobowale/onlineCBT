$(function(){
var questions = [];
var answers = [];
var answer = [];
var modAnswers = [];
var modQuestions = [];
var questionLength = 10;
var totalNumberOfQuestions = 10;
var randomSelector = [];
var pointer = 0;
var questionNumber = 1;
var choices = ["a", "b", "c", "d", "e", "f", "g"];
var selected = 0;
var score = 0;
var remark = "";
var timeMinute = 4;
var timeSecond = 60;
var status = false;
var matNo = "";
var groupNo = 0;
var gn = "gn";
var mn = "mn";
var cc = "";
var timer = null;
var loader = null;
var monitor = 0;
var monitorAfter = 0;
var splitOptions = [];
var chosenQ = [];
var chosenA = [];
var chosenO = [];


$("#goButton").click(function(){
	
	$("#confirmModal").modal("toggle");
	$("#loginModal").modal("toggle");
	//var m = $("#matno").val();
	$("#matNoValue").text($("#matno").val());
	$("#groupNoValue").text($("#grpno").val());
});


$("#detailsCancel").click(function(){
	
	$("#confirmModal").modal("toggle");
	$("#loginModal").modal("toggle");
});

$("#radioboxesDiv").buttonset();

loadQandA();
populateRandomSelector();

$("#cancelButton").click(function(){
	$(".detailsConfirmation").modal("toggle");
	$("#loginModal").modal('toggle');
	});

$(".inputter").focus(function(){
	var timer2 = setInterval(function(){
	var erro = 0;
	if($("#matno").val().length != 19){
		erro++;
		$("#matricNo").text("check your matric no");
		}
	else if($("#grpno option:selected").val() < 1){
		erro++;
		$("#groupNo").text("You have not selected a group number");
		}
	else if(getGroupNo() != parseInt($("#grpno option:selected").val())){
		erro++;
		$("#groupNo").text("please, enter a valid group no: You should be in group " + getGroupNo());
		}
	else{
		erro = 0;
		$("#matricNo").html("&radic;");
		$("#groupNo").html("&radic;");
		}
	if (erro < 1){
		//alert("correct");
		groupNo = $("#grpno option:selected").val();
		matNo = $("#matno").val();
		$("#goButton").show();
		clearInterval(timer2);
	}
	
	else
		{
			
			}
	}, 1000);
	});

function getSelected(){	
	return selected;
}

function getNoOfQuestions(){
	return questions.length;
	}	
	
function populateRandomSelector(){
	while(randomSelector.length < questionLength){
		n = Math.round(Math.random() * (totalNumberOfQuestions-1));
		if (!isIn(n, randomSelector)){
			randomSelector.push(n);
			}
		}
	return randomSelector;
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

function computeResult(){
	if ((score * 2) >= 18){
		remark = "Excellent";
		}
	else if ((score * 2) >= 16){
		remark = "Very Good";
		}
	else if ((score * 2) >=10){
		remark = "Good";
		}
	else if ((score * 2) >= 8){
		remark = "Fair";
		}
	else {
		remark = "Poor";
		}
	
	}
	
function showCheckResultDiv(){
	$("#questionNumber").text("Test completed!!!");
	$(".card-title").text("Congratulations on the completion of the test!");
	$("#optionsDiv").text("Click on the show result button to view your score");
	$("#resultButton").show();
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
	



function getQuestions(){
	var ind = 0;
		for(i=0; i<questions.length; i++){
			if (questions[i].length == 0){
					continue;
					}
			modQuestions[ind] = questions[i];
			ind++;
		}
	return modQuestions;	
}

function getAnswers(){
	return answers;
	}

function getAnswer(){
	return answer;
	}

function choose(Q,O,A,rand){
	for(var i=0; i<rand.length; i++){
		chosenQ.push(Q[rand[i]]);
		chosenA.push(A[rand[i]]);
		chosenO.push(O[rand[i]]);
	}
}

function getParticularQuestion(Q, ran){
	return Q[ran];
	}
	
function getParticularOptions(O, ran){
	return O[ran];
	}
	
function splitParticularOptions(O){
	splitOptions = O.split("--");
	return splitOptions;
	}	
	
function getCorrectAnswer(A, ran){
	return A[ran];
	}
	
function printQuestion(Q){
	$(".card-title").text(Q);
	}

function buttonSet(m){
	$(m).buttonset();
	}

function printOptions(O){
	
	for(k = 0; k < O.length; k++){
		if (O[k].length < 3){
			continue;
			}
			$("#optionsDiv").append("<a id='radioGroup' class='btn text-left pl-5 nav-item nav-link border-dark mt-2 mb-4'>" +

			//"<div id='m' class='form-check'>" + 
				"<input class='a form-check-input' value='" + choices[k] + "' type='radio' name='radioGroup'/>" + 
				"<label id='option1' class='ml-2 form-check-label'>" + O[k] + "</label>" + 
			//"</div>" + 
	   		"</a>");
				}
		/*$(".nav-item").click(function(){
			$(this).css({'background-color':'green', 'opacity': '0.5', 'color':'white'});
			$("input[name='radioGroup']:radio").attr('checked', 'checked');
			});*/
		
		
	
	}
	
function showNextButton(){
	$("input[name='radioGroup']:radio").change(function(){
		$(this).parent().css({'background-color':'green', 'opacity': '0.5', 'color':'white'})
		$("input[name='radioGroup']:radio").not(":checked").each(function(){
			$(this).parent().css({'background-color':'', 'opacity': '1', 'color':''})
			})
	//	alert($("input[name='radioGroup'][0]").val());
				selected = $(this).val();
				$("#nextButton").show();
				});
	$("#questionNumber").text("Question " + questionNumber + " of " + questionLength);
	}
	
function showAll(m){
	for(var i=0; i<m.length; i++){
		if(m[i]=="undefined")
		alert("something is wrong");
		$("#showAllDiv").append(m[i] + ":::")
		}
	}
	
function startTest(){
	
	//showAll(getAnswers());
	//showAll(getAnswer());
//	alert("i got here");
	
	//alert(chosenQ.length);
	if (chosenQ.length==questionLength){
		if (chosenA.length==questionLength){
			if (chosenO.length==questionLength){
		var q = getParticularQuestion(chosenQ, pointer);
		var x = getParticularOptions(chosenO, pointer);
		var opt = splitParticularOptions(x);
		getCorrectAnswer(chosenA, pointer);
		printQuestion(q);
		printOptions(opt);
		//buttonSet("#optionsDiv");
		showNextButton();
			}
		}
	}
	else {
		var message = "Oops! An error occured in fetching your questions." + "\n" + "Please click Ok to reload the page!" + "\n" + "This might cause you to relog in."
		alert(message);
		}
	}
	
$("#okButton").click(function (){
	$("#confirmModal").modal('toggle');
	$("#scoreSpan").show();
	//$(this).hide();
	
	$.cookie("matricnumber", $("#matno").val());
	$.cookie("groupnumber", $("#grpno").val());
	
	matNo = $.cookie('matricnumber');
	groupNo = $.cookie('groupnumber');
	
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
			clearInterval(timer);
			computeResult();
			showCheckResultDiv();
			$.cookie('score', score * 2);
			$.cookie('remark', remark);
			//window.location('resultPage.php');
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
	choose(getQuestions(), getAnswers(), getAnswer(), randomSelector);
	//showAll(chosenQ);
	startTest();
	
	$("#navigate").hide();
	});

$("#nextButton").click(function (){
	//alert($("input[name='radioGroup'][1]").val());
	$(this).hide();
	getSelected();
	if(selected == chosenA[pointer][0]){
		score++;
		}
	selected = 0;
	if(questionNumber < questionLength){
		pointer++;
		$("#optionsDiv").text("");
		startTest();
		questionNumber++;
		$("#questionNumber").text("Question " + questionNumber + " of " + questionLength);
	}
	
	else{
		$("#nextButton").hide();
		clearInterval(timer);
		computeResult();
		showCheckResultDiv();
		$.cookie('score', score * 2);
		$.cookie('remark', remark);
		//window.location('resultPage.php');
		}
	});
	
function emptyArray(a){
		a.splice(0,a.length);
	}

function loadQandA(){
$.get('questions.txt', function(data){
	var  lines = data.split("###");
	$.each(lines, function(n, urlRecord){	
		questions.push(urlRecord);
		
		});
		
	})
	
$.get('answer.txt', function(data){
	var  lines = data.split("\n");
	$.each(lines, function(n, urlRecord){
		answer.push(urlRecord);
		
		});
		//alert(answer.length);
		
	})

$.get('answers.txt', function(data){
	var  lines = data.split("---");
	$.each(lines, function(n, urlRecord){
		answers.push(urlRecord);
		});
		var ind = 0;
		for(i=0; i<questions.length; i++){
			if (questions[i].length == 0){
					continue;
					}
			modQuestions[ind] = questions[i];
			ind++;
		}		
		
		})
		
}




})