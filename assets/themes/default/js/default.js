//TIMER****************
var timeInit;
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var alertAnimation = TweenMax.fromTo($(".phase-clock"),1,{alpha:1},{alpha:0,yoyo:true,repeat:-1});
var alertClock1 = {
    time:config.timeLimit/2,
    complete:false
}
var alertClock2 = {
    time:config.timeLimit,
    complete:false
}
function cronometro () {
if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
//		Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
    if(!alertClock1.complete){
        if(parseInt(minutos) >= alertClock1.time){
            $("#canvasYogotar")[0].contentWindow.yogotar.setAnimationByName(0, "UNCOMFORTABLE", true);
            stateYogotar = "UNCOMFORTABLE";
            $(".phase-clock").attr("src","assets/themes/default/images/relojfase2.png");
            alertAnimation = TweenMax.fromTo($(".phase-clock"),0.8,{alpha:1},{alpha:0,yoyo:true,repeat:-1});
            alertClock1.complete = true;
        }   
    }	
    if(!alertClock2.complete){
        if(parseInt(minutos) == config.timeLimit){
            $("#canvasYogotar")[0].contentWindow.yogotar.setAnimationByName(0, "DESPERATE", true);
            stateYogotar = "DESPERATE";
            $(".phase-clock").attr("src","assets/themes/default/images/relojfase3.png");
            alertAnimation = TweenMax.fromTo($(".phase-clock"),0.5,{alpha:1},{alpha:0,yoyo:true,repeat:-1});
            alertClock2.complete = true;
        }   
    }

    if(parseInt(minutos) == config.timeLimit){
        clearInterval(timeInit);   
    }
    
}
function initTimer () {
    $("#modal").hide();
	timeInit = setInterval(cronometro,10);
    
}
//ANIMATIONS*****************************************
var stateYogotar= "IDLE";
var heightStage = $("body").height();

function questionAnimation(){
    TweenMax.fromTo($("#question"),1,{y:0},{y:-heightStage,ease:Back.easeIn,onComplete:nextQuestionAnimation});
    TweenMax.fromTo($(".main-panel"),1,{y:0},{y:-heightStage,ease:Back.easeIn});
    TweenMax.fromTo($("#imageQuestion"),1,{scale:1},{scale:0,ease:Back.easeIn});
     if(config.includeOptionsLetters){ 
        for(var i = 1;i<=config.NumberOptions;i++){
           TweenMax.fromTo($("#answer" + i),0.5,{scale:1},{scale:0,delay:0.1 * i,ease:Back.easeIn});
        }
    }
}

function nextQuestionAnimation(){
    TweenMax.to($("#question"),2,{y:0,ease:Back.easeOut});
    TweenMax.to($(".main-panel"),2,{y:0,ease:Back.easeOut});  
    TweenMax.fromTo($("#imageQuestion"),1,{scale:0},{scale:1,ease:Back.easeOut,onComplete:idleYogotar});
     if(config.includeOptionsLetters){ 
        for(var i = 1;i<=config.NumberOptions;i++){
           TweenMax.fromTo($("#answer" + i),0.5,{scale:0},{scale:1,delay:0.1 * i,ease:Back.easeOut});
        }
    }    
    
    loadQuestion();
}  


function idleYogotar(){
    $("#canvasYogotar")[0].contentWindow.yogotar.setAnimationByName(0, stateYogotar, true);
}


//DECORATIONS*******
$("#decorations").append(`   
    <div class='header-bar'><div id="counter-page"></div></div>
    <div class='section-grade'>
        <div class='section-gradeBar'>
            <div class='section-gradeText'></div>
        </div>
    </div>
    <iframe id='canvasYogotar' class='character-main' src='phaser/yogotars/yogotars/index.html' scrolling='no'></iframe>
    <div class='main-panel'></div>   
`
);
$("#question").append(`        
        <div class="top-panel"></div>
        <div class="bottom-panel"></div>
`)
$("#timerSection").append(`<div class='container-phase'><img class='phase-clock' /></div>`);
$(".phase-clock").attr("src","assets/themes/default/images/relojfase1.png");
//APPLY BLUR IN CONTAINER
var blurElement = {a:0};
TweenMax.to(blurElement, 1, {a:10, onUpdate:applyBlur});
function applyBlur(){
    TweenMax.set(['#container'], {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});  
};
//BEGIN TEST ACTION
$("#beginTest").click(function(){
    $("#beginTest").off( "click");
    TweenMax.fromTo($("#begin-modal"),0.5,{scale:1},{scale:0,ease:Back.easeIn});
     TweenMax.fromTo($("#modal"),1,{alpha:1},{alpha:0,ease:Back.easeIn});
    TweenMax.to(blurElement, 1, {a:0, onUpdate:applyBlur,onComplete:initTimer});
});

//INCLUDE GRADE **********
$(".section-gradeText").append('<span>' + question[selectQuestion].grade+' grado</span>')
//INCLUDE CLASS
$("#answer-section").addClass("row col-xs-12 col-sm-12");
$("#buttonForward").addClass("col-sm-2 offset-sm-5");
//$(".answer").addClass("col-xs-3 col-sm-3 col-md-3");
//MODAL instructions
//LOAD LOGO
$(".modal-title").append("<img src='assets/themes/default/images/yogome_logo.png'>")
//LOAD INSTRUCTIONS

if(config.testMode){
    $("#begin-modal").find(".modal-body").html(config.instructions + '<span>(Estas en modo prueba puedes cambiar las preguntas usando las flechas del teclado <- -> )</span>');
}else{
    $("#begin-modal").find(".modal-body").html(config.instructions);
}

//LOAD FINISH EXAM
$("#end-modal").hide();

function resultsScene(){
    $("#end-modal").show()
    clearInterval(timeInit); 
    $("#modal").show();
    $("#modal").css("opacity",1);    
    config.resultsScene = "¡Has concluido tu prueba!<br>tu tiempo fue de: "+ $("#clock").text() +"<br>y obtuviste un puntaje de:";
    $("#end-modal").find(".modal-body").html(config.resultsScene);
}

//load style items default
$("#container-question").addClass("col-xs-12 col-sm-12 col-md-8 offset-md-3");
$("#question").addClass("col-xs-12 col-sm-12");
$("#counter-page").html(1 + "/" + totalQuestions);





