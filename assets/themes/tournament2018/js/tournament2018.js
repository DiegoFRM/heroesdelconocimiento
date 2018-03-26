//TIMER****************
var timeInit;
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var starsAnimation;
var soundQuestion = document.getElementById("soundQuestion");
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
            $(".phase-clock").attr("src","assets/themes/default/images/relojfase2.png");
            alertAnimation = TweenMax.fromTo($(".phase-clock"),0.8,{alpha:1},{alpha:0,yoyo:true,repeat:-1});
            alertClock1.complete = true;
        }   
    }	
    if(!alertClock2.complete){
        if(parseInt(minutos) == config.timeLimit){
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


function beginAnimation(){
    //$("#question").css("opacity",0);
    var heightQuestion = $("#question").height();
    TweenMax.fromTo($("#question"),1,{height:0},{height:heightQuestion});
}


//beginAnimation()
var selectionQ;
var AnimationQ;
var AnimationI;
var answerSelect;
var posCenter;

function questionAnimation(selectQuestion){
    var obj1 = $("#question"),
        obj2 = $("#imageQuestion"),
        obj3 = $("#imageQuestion").find("img"),
        obj4 = $(".abductionlight");
    //TweenMax.to($("#canvasYogotar"),1,{y:-100} );
    AnimationQ =  TweenMax.to(obj1, 0.8, {height:"0px",delay:1});
    AnimationI =  TweenMax.to([obj2], 0.8, {alpha:0,ease:Back.easeIn});
    //TweenMax.to([obj2, obj3], 0, {alpha:0,delay:1});
    
    TweenMax.to(obj4, 1, {scaleX:1,delay:1});
    answerSelect = $("#answer" + $("#" + selectQuestion).attr("index"));
    posCenter = $(".abductionlight img").css("left")
    abdutionSound.play();
    
    TweenMax.to(obj4, 0.5, {scaleX:0,delay:3.5});
    
   selectionQ = TweenMax.to(answerSelect,1,{alpha:0,left:posCenter,top:-document.body.clientHeight/2 + "px",scale:0, delay:2,onComplete:abductionOptions})
    
    //selectionQ = TweenMax.to(answerSelect, 1.5, {left:posCenter + "px", y:-250,scale:0, delay:2,ease:Linear.easeNone,onComplete:abductionOptions});
        
    
    
  if(config.includeOptionsLetters){ 
        for(var i = 1;i<=config.NumberOptions;i++){
            if( i != $("#" + selectQuestion).attr("index")){
            TweenMax.fromTo($("#answer" + i),0.5,{scale:1},{scale:0,alpha:0,delay:0.3 * i,ease:Back.easeIn});
            }
        }     
    }

}

function abductionOptions(){
    var obj1 = $("#question"),
        obj2 = $("#imageQuestion"),
        obj3 = $("#imageQuestion").find("img"),
        obj4 = $(".abductionlight");  
        $(answerSelect).removeAttr( 'style' );
        /*
            $("#answer1").css("left","0%");
            $("#answer2").css("left","25%");
            $("#answer3").css("left","50%");
            $("#answer4").css("left","75%");
        */
   if(config.includeOptionsLetters){ 
       
        for(var i = 1;i<=config.NumberOptions;i++){
            //$("#answer" + i).pause(0);
            TweenMax.fromTo($("#answer" + i),0.5,{scale:0,alpha:0},{scale:1,alpha:1,delay:0.3 * i,ease:Back.easeOut});
        }     
    }
    

    AnimationQ.reverse();
    AnimationQ =  TweenMax.to(obj1, 0.8, {height:"auto",delay:1,onComplete:showImage});
    
    function showImage(){
       AnimationI.reverse();   
    }
     
    
    loadQuestion();
    
}


function showAnswerNext(){
}


//APPLY BLUR IN CONTAINER
var blurElement = {a:0};
//TweenMax.to(blurElement, 1, {a:10, onUpdate:applyBlur});
function applyBlur(){
    TweenMax.set(['#container'], {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});  
};
//BEGIN TEST ACTION
$("#beginTest").click(function(){
    $("#beginTest").off( "click");
    TweenMax.fromTo($("#begin-modal"),0.5,{scale:1},{scale:0,ease:Back.easeIn});
    TweenMax.fromTo($("#modal"),1,{alpha:1},{alpha:0,ease:Back.easeIn});
    TweenMax.to(blurElement, 1, {a:0, onUpdate:applyBlur,onComplete:initTimer});
    beginAnimationShip();
    starsAnimation = TweenMax.to($("#starstile"), 1,{backgroundPosition:'0 -240%',repeat:-1,ease:Linear.easeNone});
    TweenMax.fromTo($(".modal-window"),0.5,{scale:0},{scale:1,ease:Back.easeOut})
    $("#modal").css("opacity",1);
});

//INCLUDE GRADE **********

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
$("#container-question").addClass("col-xs-12 col-sm-12 col-md-12");
//$("#question").addClass("col-xs-12 col-sm-12");
$("#counter-page").find("span").html(1 + "/" + totalQuestions);

    //$("#loadSpine").attr("src","spine.html")


    $(window).resize(function () {
      //$("#loadSpine").attr("src","spine.html")
      //calculateNewScale();
    });


    function calculateNewScale() {
      var percentageOn1 = $(window).width() / 1920;
      $("#loadSpine").css({
        "-moz-transform": "scale(" + percentageOn1 + ")",
        "-webkit-transform": "scale(" + percentageOn1 + ")",
        "transform": "scale(" + percentageOn1 + ")"
      });
    }


    
    //calculateNewScale();

$("#page2").hide();
$("#page3").hide();

var counterTutorial = 1;

$(".menuback-tutorial").click(function(){
    if(counterTutorial == 2){       
        $("#page2").hide();
        $("#page1").show();
        $(".menuback-tutorial").css("background-image","url('assets/themes/tournament2018/images/tutorial/prev-inactive.png')");
        counterTutorial--;
        $(".numberpage-tutorial").text("1/3");
    }else if(counterTutorial == 3){
        $("#page3").hide();
        $("#page2").show();
        counterTutorial--;
        $(".numberpage-tutorial").text("2/3"); 
        $(".menunext-tutorial").css("background-image","url('assets/themes/tournament2018/images/tutorial/next.png')");
    }
});

$(".menunext-tutorial").click(function(){
    if(counterTutorial == 1){       
        $("#page1").hide();
        $("#page2").show();
        $(".menuback-tutorial").css("background-image","url('assets/themes/tournament2018/images/tutorial/prev.png')");
        counterTutorial++;
        $(".numberpage-tutorial").text("2/3");
    }else if(counterTutorial == 2){
        $("#page2").hide();
        $("#page3").show();
        counterTutorial++;
        $(".numberpage-tutorial").text("3/3"); 
        $(".menunext-tutorial").css("background-image","url('assets/themes/tournament2018/images/tutorial/next-inactive.png')");
    }
});

    starsAnimation = TweenMax.to($("#starstile"), 1,{backgroundPosition:'0 -240%',repeat:-1,ease:Linear.easeNone});

var elementsTutorial = [
    $(".top-tutorial"),
    $(".bottom-tutorial"),
    $(".globe-tutorial"),
    $(".eagle-tutorial"),
    $(".title-tutorial")
]

var topTutorial,bottomTutorial,globeTutorial,titleTutorial,eagleTutorial

$(".title-tutorial").css("opacity",0);
$(".globe-tutorial").css("opacity",0);
$(".eagle-tutorial").css("opacity",0);

topTutorial = TweenMax.fromTo(elementsTutorial[0],1,{top:"-50%"},{top:"0%",delay:2})
bottomTutorial = TweenMax.fromTo(elementsTutorial[1],1,{bottom:"-50%"},{bottom:"0%",delay:2,onComplete:nextTutorial1})

function nextTutorial1(){
    
    titleTutorial = TweenMax.fromTo(elementsTutorial[4],1,{alpha:0,left:"-50%"},{alpha:1,left:"0%"})
    elementsTutorial[3].css("opacity",1);
    eagleTutorial = TweenMax.fromTo(elementsTutorial[3],1,{left:"-50%"},{left:"0%",ease:Back.easeOut});
    elementsTutorial[2].css("opacity",1);
    globetutorial = TweenMax.fromTo(elementsTutorial[2],1,{left:"100%"},{left:"50%",ease:Back.easeOut});

}


$(".beginquiz-tutorial").click(function(){
     titleTutorial = TweenMax.fromTo(elementsTutorial[4],1,{alpha:0,left:"0%"},{alpha:1,left:"-50%"});
    globetutorial = TweenMax.to(elementsTutorial[2],1,{left:"130%",ease:Back.easeOut});
    topTutorial = TweenMax.fromTo(elementsTutorial[0],2,{scale:1,top:"0%"},{scale:2,top:"-100%"})
    bottomTutorial = TweenMax.fromTo(elementsTutorial[1],2,{scale:1,bottom:"0%"},{scale:2,bottom:"-100%"})
    eagleTutorial = TweenMax.fromTo(elementsTutorial[3],1,{scale:1,left:"0%"},{scale:2,left:"-100%",ease:Back.easeOut,onComplete:beginShip});

});

    
function beginShip(){
    beginAnimationShip();
    
}    

var images = new Array;
    for(var c = 0;c<=72;c++){
        images[c] = "assets/themes/tournament2018/images/secuencia/ship-normal-idle_slow_"+c+".png";
    }


	// TweenMax can tween any property of any object. We use this object to cycle through the array
	var obj = {curImg: 0};
	// create tween
	/*var tween = TweenMax.to(obj, 3.5,
		{
			curImg: images.length - 1,	// animate propery curImg to number of images
			roundProps: "curImg",				// only integers so it can be used as an array index
			repeat: -1,									// repeat 3 times
			immediateRender: true,			// load first image automatically
			ease: Linear.easeNone,			// show every image the same ammount of time
			onUpdate: function () {
			  $("#eagle").attr("src", images[obj.curImg]); // set the image source
			}
		}
	);*/


    
    var shipAnimation = new TimelineMax();

    function beginAnimationShip(){
        //shipAnimation.call(function() {$('#ship').addClass("posx20");}, null, null, 2);
        TweenMax.to($("#ship"),2,{top:"20%",ease:Back.easeOut,delay:1});
        TweenMax.to($("#ship"),1,{left:"-20%", scale:0.5,delay:2});
        TweenMax.to($("#ship"),1,{left:"20%",delay:3});
        TweenMax.to($("#ship"),1,{left:"0%", top:"50%",ease:Back.easeIn,delay:4});
        TweenMax.to($("#floor"),1,{top:"0%", delay:4,onComplete:NextShip});  
        

    }

function NextShip(){
    starsAnimation.pause();
     TweenMax.to($("#ship"),2,{top:"0%",scale:1,ease:Back.easeInOut,onComplete:BeginQuestions});
   
}


function BeginQuestions(){
    $("#container").css("visibility","visible");
    TweenMax.fromTo($("#container"),1,{alpha:0},{alpha:1});
        //LOAD FIRST QUESTION
    loadQuestion();
    //$("#cortainTutorial").css("visibility","visible");
    //TweenMax.fromTo($("#cortainTutorial"),0.5,{alpha:0},{alpha:1});
}

function explainBegin(){
eagleTutorial = TweenMax.to(elementsTutorial[3],1,{scale:1,left:"0%"});    
}




/*ONLY REVIEW*/
function onlyQuestions(){
    TweenMax.to($("#ship"),2,{top:"0%",scale:1,ease:Back.easeInOut});
    $("#tutorialScreen").hide();
    $("#container").css("opacity",1);
    $("#container").css("visibility","visible");
    TweenMax.to($("#floor"),1,{top:"0%"});
    starsAnimation.pause();
    
}


//onlyQuestions();
