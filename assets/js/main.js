/*DIEGO ROJAS 2018*/
selectQuestion = 0;
//SOUNDS*****************
var soundActive = true;
var soundQuestion = document.getElementById("soundQuestion");
var soundQuestion = document.getElementById("soundQuestion");
var popSound = document.getElementById("popSound");
var magicSound = document.getElementById("magicSound");
var abdutionSound = document.getElementById("abdutionSound");
var bgm = document.getElementById("bgm");
//QUESTIONS****************
var showAnswer = false;
var confirmAnswer = true;
var buttonSelect;
var sesionSaveQuestion = new Array;
var counter = 0;
var gradeSelection = 1;
var preguntas
var totalQuestions = question.length;
var questionGradeSelect = new Array;
var examID = window.location.hash.substr(1);
var grado = 1
//TIMER****************
var timeInit;
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var starsAnimation;
var alertAnimation = TweenMax.fromTo($(".phase-clock"),1,{alpha:1},{alpha:0,yoyo:true,repeat:-1});

var alertClock1 = {
    time:config.timeLimit/2,
    complete:false
}
var alertClock2 = {
    time:config.timeLimit,
    complete:false
}
//ANIMATIONS*****************************************
var stateYogotar= "IDLE";
var heightStage = $("body").height();
var selectionQ;
var AnimationQ;
var AnimationI;
var answerSelect;
var posCenter;


function tutorialQuestion(){
	$("#retro").hide();
	$("#counter-page").find("span").html([counter + 1] + "/" + totalQuestions);
	$(".section-gradeText").html('<span>' + grado +'° grado</span>')
	$("#question").find("span").html("El papá de Pedro gasta <div class='fraction'><span class='numerador'>1</span><span class='barfrac'>/</span><span class='denominador'>3</span></div> de su sueldo en colegiaturas, <div class='fraction'><span class='numerador'>1</span><span class='barfrac'>/</span><span class='denominador'>6</span></div> en pagar el club, <div class='fraction'><span class='numerador'>1</span><span class='barfrac'>/</span><span class='denominador'>5</span></div> en paseos con la familia y lo que le queda en ropa y alimentos. Si gana $54120 mensuales, ¿qué cantidad ocupa para ropa y alimentos?");
	$(".ranuraimagen").css("opacity",1);
	TweenMax.fromTo($("#imageQuestion"),1,{alpha:0},{alpha:1});
	$("#imageQuestion").find("img").attr('src','assets/images/cookies.png');
	$("#answer1").find(".contentText").find("span").html("<div class='fraction'><span class='numerador'>21</span><span class='barfrac'>/</span><span class='denominador'>64</span></div>");
	$("#answer2").find(".contentText").find("span").html("<div class='fraction'><span class='numerador'>7</span><span class='barfrac'>/</span><span class='denominador'>16</span></div>");
	$("#answer3").find(".contentText").find("span").html("<div class='fraction'><span class='numerador'>5</span><span class='barfrac'>/</span><span class='denominador'>8</span></div>");
	$("#answer4").find(".contentText").find("span").html("<div class='fraction'><span class='numerador'>3</span><span class='barfrac'>/</span><span class='denominador'>4</span></div>");
   
}

    //LOAD QUESTION
   function loadQuestion(){
        $(".type-questionSelect").text("tipo de pregunta: " + question[selectQuestion].typeQuestion + " " + question[selectQuestion].Level)
        var languageSelect = "es";
        var typeQuestion
        console.log(question[selectQuestion].typeQuestion)
        if(question[selectQuestion].audio){
            if(question[selectQuestion].typeQuestion == "Practica"){
                if(question[selectQuestion].Level == 1){
                   typeQuestion = "e0"; 
                }else{
                    typeQuestion = "e1"; 
                }
            
            }else if(question[selectQuestion].typeQuestion == "Torneo"){
            typeQuestion = "t1";     
            }  
        }
        
        if(question[selectQuestion].audio){         
            var soundSelect = "q" + question[selectQuestion].Number +  "_" + "g" + question[selectQuestion].grade + "_" + typeQuestion + "_" + languageSelect
            console.log(typeQuestion);

            soundQuestion.src = "assets/sounds/" + soundSelect + ".mp3";
            //soundQuestion.volume = 1;
            soundQuestion.play();
            
        }
        $("#retro").hide();
        //HARDCOREADA
        $("#counter-page").find("span").html([counter + 1] + "/" + totalQuestions);
        $(".section-gradeText").html('<span>' + question[counter].grade+'° grado</span>')
        //FIN HARDCOREADA
        $("#question").find("span").html(question[selectQuestion].Question);  
            
        if(question[selectQuestion].useImageQuestion){
            $(".ranuraimagen").css("opacity",1);
            TweenMax.fromTo($("#imageQuestion"),1,{alpha:0},{alpha:1});
           $("#imageQuestion").find("img").attr('src','assets/images/grade'+question[selectQuestion].grade +'/' + question[selectQuestion].imageQuestion + '.png');
            
            
                $("#imageQuestion").find("img").on("error", function(){
                    $(this).attr('src', 'assets/images/EnProceso.png');
                });
            
           }else{
                $(".ranuraimagen").css("opacity",0);
               $("#imageQuestion").find("img").attr('src','assets/images/' +  'blank.png');
               $("#imageQuestion").css("opacity",0);
           }
        
        var largeTextQuestion = $("#question").find("span").text().length;
    console.log(largeTextQuestion);
    if(parseInt(largeTextQuestion) > 200 && question[selectQuestion].useImageQuestion){
        console.log("ok");
                $("#question").css("font-size","1.5vw");
    }else if(parseInt(largeTextQuestion) > 180){
        $("#question").css("font-size","1.8vw");
    }else if(parseInt(largeTextQuestion) < 120){
        $("#question").css("font-size","2vw");
        
    }
       
        for(var a= 1;a<=4;a++){
            $("#answer" + a).attr("index",a);
            //Include Images or only answers
            if(question[selectQuestion].includeImages){
                $("#answer" + a).find(".contentText").find("span").html('<div class="containerQuestionImage"><img src="assets/images/grade'+question[selectQuestion].grade +'/' + question[selectQuestion]["image" + a] + '.png" />'  + question[selectQuestion]["answer" + a]  +"</div>");
                
                $("#answer" + a).find(".containerQuestionImage").find("img").on("error", function(){
                    $(this).attr('src', 'assets/images/EnProceso2.png');
                });
                
            }else{
                
                $("#answer" + a).find(".contentText").find("span").html(question[selectQuestion]["answer" + a] );
                var limitCharacters = $("#answer" + a).find(".contentText").find("span")
                
               /* if(limitCharacters.text().length == 0){
                    
                    $(".optionLetters").addClass("optionOnlyLetters");
                }else if(limitCharacters.text().length < 5){
                    $(".optionLetters").removeClass("optionOnlyLetters");
                    limitCharacters.css("font-size","2vw");
                }else if(limitCharacters.text().length > 6 && limitCharacters.text().length < 10){
                    limitCharacters.css("font-size","2vw"); 
                    $(".optionLetters").removeClass("optionOnlyLetters");
                }else{
                    limitCharacters.css("font-size","2vw");
                    $(".optionLetters").removeClass("optionOnlyLetters");
                }
                */
                
            }
            //Buttons
            $("#answer" + a).click(function(){
                popSound.play();
                TweenMax.to($("#buttonForward"),0.5,{bottom:"-12%"});
                    if(confirmAnswer){
                        $(".answer").find(".contentText").removeClass("select-button");
                        $(this).find(".contentText").addClass("select-button");
                        $(".answer").find(".optionLetters").removeClass("select-button");
                        $(this).find(".optionLetters").addClass("select-button");
                        $("#buttonForward").show();
                        buttonSelect = this;
                    }else{
                        if(showAnswer){
                            buttonSelect = this;
                            sendAnswer(this);
                            $("#buttonForward").show();
                        }else{
                            buttonSelect = this;
                            nextQuestion();   
                        }
                    }

            }); 
        }     
       
    $(".globe-help").find("p").html(
        "Celda Excell: " + (question.indexOf(question[selectQuestion]) + 9) + "<br>" + 
       "Imagen Pregunta: " + question[selectQuestion].imageQuestion  + "<br>" + 
       "Correcta: " + question[selectQuestion].Correct  + "<br>" +
       "Level: " + question[selectQuestion].Level  + "<br>" +
        "Number: " + question[selectQuestion].Number  + "<br>" +
        "Respuesta-A: "  + question[selectQuestion].answer1  + "<br>" +
        "Respuesta-B: "  + question[selectQuestion].answer2  + "<br>" +
        "Respuesta-C: "  + question[selectQuestion].answer3  + "<br>" +
        "Respuesta-D: "  + question[selectQuestion].answer4  + "<br>" +
        "Grado: "  + question[selectQuestion].grade  + "<br>" +
        "Respuesta Imagen A: "  + question[selectQuestion].image1  + "<br>" +
        "Respuesta Imagen B: "  + question[selectQuestion].image2  + "<br>" +
        "Respuesta Imagen C: "  + question[selectQuestion].image3  + "<br>" +
        "Respuesta Imagen D: "  + question[selectQuestion].image4  + "<br>" +
        "Tipo de pregunta: "  + question[selectQuestion].typeQuestion  + "<br>")       
       
       
       
    } 

    //NEXT QUESTION
    function nextQuestion(){
        $(".answer").find(".contentText").removeClass("incorrect-button");
        $(".answer").find(".contentText").removeClass("correct-button");
        $(".answer").find(".contentText").removeClass("select-button");
        $(".answer").find(".optionLetters").removeClass("incorrect-button");
        $(".answer").find(".optionLetters").removeClass("correct-button");
        $(".answer").find(".optionLetters").removeClass("select-button");
        saveAnswer(preguntas[selectQuestion], buttonSelect)
        // saveAnswer(question[selectQuestion].Question,buttonSelect.id)
        // counter++;
        // selectQuestion = counter
        // questionAnimation(buttonSelect.id);
    }
    
    //INCLUDE LETTERS IN ANSWERS
    if(config.includeOptionsLetters){ 
        var optionsLetters = ["A","B","C","D"]
        for(var i = 1;i<=config.NumberOptions;i++){
            $("#answer" + i).html("<div class='optionLetters'>"+ optionsLetters[i-1]  +"</div>");
            $("#answer" + i).append("<span class='contentText'><span></span></span>");
        }
    }

    //RANDOM QUESTIONS
    var randoms = randomNumbers(question.length),
        rand = randoms(),
        result = [];
    while(rand != null) {
        result.push(rand);
        rand = randoms();
    }


    selectQuestion = counter;
    
    $("#buttonForward").click(function(){
        magicSound.play();
        soundQuestion.pause();
        soundQuestion.currentTime = 0;
        TweenMax.to(this,0.5,{bottom:"-25%"});
            if(showAnswer){
                sendAnswer(buttonSelect);
                nextQuestion();
            }else{
                nextQuestion();
            }
    });


    
    $(".buttonAudio").click(function(){
        if(soundActive){
           soundQuestion.volume = 0; 
            $(this).css("background-image", 'url("assets/images/SoundOff.png")');
            soundActive = false;
            bgm.volumen = 0;
        }else{
            soundQuestion.volume = 1;
            $(this).css("background-image", 'url("assets/images/SoundOn.png")');
            soundActive = true;
            bgm.volumen = 0;
        }
        
    });


    //RANDOM FUNCTION
    function randomNumbers(max) {
        function range(upTo) {
            var result = [];
            for(var i = 0; i < upTo; i++) result.push(i);
            return result;
        }
        function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
        var myArr = shuffle(range(max));
        return function() {
            return myArr.shift();
        };
    }
    //SAVE QUESTION AND ANSWER
    function saveAnswer(question){
        //sesionSaveQuestion[counter] = [{Question:"",Answer:""}]
        //sesionSaveQuestion[counter].Question = question;
        //sesionSaveQuestion[counter].Answer  = answer;
		var answerId = $(buttonSelect).attr("answerid")
		answerId = parseInt(answerId)

		function onSuccess(){
			counter++;
			selectQuestion = counter
			questionAnimation(buttonSelect.id);
		}

		services.registerAnswer(question.id, answerId, onSuccess)
    }
    

    //SHOW ANSWER 
    function sendAnswer(btn){
        for(var b = 0;b< question[selectQuestion].Correct.length;b++){
        if($(btn).attr("index") == question[selectQuestion].Correct[b]){
                    $(btn).removeClass("incorrect-button");
                    $(btn).addClass("correct-button");
                    $("#retro").html("<b>¡Correcto!</b>");
                    $("#retro").show();
                    break;
                }else{
                    $(btn).addClass("incorrect-button");
                    if(question[selectQuestion].includeImages){
                        $("#retro").html("<b>¡Incorrecto!</b><br>" + '<img src="assets/images/grade' + question[selectQuestion].grade  + '/' + question[selectQuestion]["image" + question[selectQuestion].Correct[b]] + '.png" /><br>'  + question[selectQuestion]["answer" + question[selectQuestion].Correct[b]] );
                    }else{
                        $("#retro").html("<b>" + question[selectQuestion]["answer" + question[selectQuestion].Correct[b]]  + "</b>");
                    }
                    $("#retro").show();
                } 
        }
    }

/*TIME*/
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
            $(".phase-clock").attr("src","assets/images/relojfase2.png");
            alertAnimation = TweenMax.fromTo($(".phase-clock"),0.8,{alpha:1},{alpha:0,yoyo:true,repeat:-1});
            alertClock1.complete = true;
        }   
    }	
    if(!alertClock2.complete){
        if(parseInt(minutos) == config.timeLimit){
            $(".phase-clock").attr("src","assets/images/relojfase3.png");
            alertAnimation = TweenMax.fromTo($(".phase-clock"),0.5,{alpha:1},{alpha:0,yoyo:true,repeat:-1});
            alertClock2.complete = true;
        }   
    }

    if(parseInt(minutos) == config.timeLimit){
        clearInterval(timeInit);   
    }
    
}

function questionAnimation(selectQuestion){
    var obj1 = $("#question"),
        obj2 = $("#imageQuestion"),
        obj3 = $("#imageQuestion").find("img"),
        obj4 = $(".abductionlight");
    AnimationQ =  TweenMax.to(obj1, 0.8, {height:"0px",delay:1});
    AnimationI =  TweenMax.to([obj2], 0.8, {alpha:0,ease:Back.easeIn});
    TweenMax.to(obj4, 1, {scaleX:1,delay:1});
    answerSelect = $("#answer" + $("#" + selectQuestion).attr("index"));
    posCenter = $(".abductionlight img").css("left")
    abdutionSound.play();
    TweenMax.to(obj4, 0.5, {scaleX:0,delay:3.5});
   selectionQ = TweenMax.to(answerSelect,1,{alpha:0,left:posCenter,top:-document.body.clientHeight/2 + "px",scale:0, delay:2,onComplete:abductionOptions})
    
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
    if(counter == totalQuestions){
                console.log("completed");
                resultsScene();
    }else{
         $(answerSelect).removeAttr( 'style' );

        if(config.includeOptionsLetters){ 
       
            for(var i = 1;i<=config.NumberOptions;i++){
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

    
}

//CLOSE MODAL
$("#modal").hide();

$(".buttonHelp").click(function(){
    $("#modal").show();
    TweenMax.fromTo($("#begin-modal"),0.2,{scale:0},{scale:1,ease:Back.easeIn});
    TweenMax.fromTo($("#modal"),0.5,{alpha:0},{alpha:1,ease:Back.easeIn});   
});
    

$("#closeHelp").click(function(){
    //$("#closeHelp").off( "click");
    TweenMax.fromTo($("#begin-modal"),0.5,{scale:1},{scale:0,ease:Back.easeIn});
    TweenMax.fromTo($("#modal"),1,{alpha:1},{alpha:0,ease:Back.easeIn});
    TweenMax.to(blurElement, 1, {a:0, onUpdate:applyBlur,onComplete:hideModal});

});

function hideModal () {
    $("#modal").hide();
	//timeInit = setInterval(cronometro,10);   
}

//LOAD FINISH EXAM
$("#end-modal").hide();
function resultsScene(){
    $("#question").hide();
    TweenMax.to($("#ship"),2,{top:"30%",scale:0.5,ease:Back.easeInOut}); 
    TweenMax.to($("#container"),1,{alpha:0});
    TweenMax.to($("#floor"),1,{top:"50%", delay:2});  
    starsAnimation = TweenMax.to($("#starstile"), 1,{backgroundPosition:'0 240%',repeat:-1,delay:2,ease:Linear.easeNone});
    TweenMax.to($("#ship"),2,{top:"-100%",scale:2,delay:4,ease:Back.easeInOut}); 
    starsAnimation = TweenMax.to($("#starstile"), 1,{backgroundPosition:'0 0%',repeat:1,delay:4.5,ease:Linear.easeNone});
}

$("#counter-page").find("span").html(1 + "/" + totalQuestions);
for(var i=2;i<=7;i++){
    $("#page" + i).hide();

}
var counterTutorial = 1;
$(".menunext-tutorial").click(function(){
    popSound.play();
    
    if(counterTutorial != 7){
        for(var i=1;i<=7;i++){
            tutorialSounds[i].pause();
            tutorialSounds[i].currentTime = 0;
            $("#page" + i).hide();
        }  
        
        counterTutorial++
        tutorialSounds[counterTutorial].play();
        $(".numberpage-tutorial").text( counterTutorial +"/" + 7); 
        $("#page" + counterTutorial).show();
        $(".menuback-tutorial").css("background-image","url('assets/images/tutorial/prev.png')");
    }else{
        $(".menunext-tutorial").css("background-image","url('assets/images/tutorial/next-inactive.png')");
    }

});
$(".menuback-tutorial").click(function(){
        popSound.play();
    if(counterTutorial != 1){
        for(var i=1;i<=7;i++){
            tutorialSounds[i].pause();
            tutorialSounds[i].currentTime = 0;
            $("#page" + i).hide();
        }  
        counterTutorial--
        tutorialSounds[counterTutorial].play();
        $(".numberpage-tutorial").text( counterTutorial +"/" + 7); 
        $("#page" + counterTutorial).show();
        $(".menunext-tutorial").css("background-image","url('assets/images/tutorial/next.png')");
    }else{
        $(".menuback-tutorial").css("background-image","url('assets/images/tutorial/prev-inactive.png')");
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
$("#globeExplain").hide();

topTutorial = TweenMax.fromTo(elementsTutorial[0],1,{top:"-50%"},{top:"0%",delay:2})
bottomTutorial = TweenMax.fromTo(elementsTutorial[1],1,{bottom:"-50%"},{bottom:"0%",delay:2,onComplete:nextTutorial1})

function nextTutorial1(){
    titleTutorial = TweenMax.fromTo(elementsTutorial[4],1,{alpha:0,left:"-100%"},{alpha:1,left:"0%"})
    elementsTutorial[3].css("opacity",1);
    eagleTutorial = TweenMax.fromTo(elementsTutorial[3],1,{left:"-100%"},{left:"0%",ease:Back.easeOut});
    elementsTutorial[2].css("opacity",1);
    globetutorial = TweenMax.fromTo(elementsTutorial[2],1,{left:"100%"},{left:"50%",ease:Back.easeOut,onComplete:soundTutorial1});

}



// function hideTutorial() {
// 	$("#globeExplain").hide();
// 	TweenMax.fromTo($("#cortainTutorial"),0.5,{alpha:1},{alpha:0,onComplete:function () {
// 			$("#cortainTutorial").hide();
// 		}});
// 	TweenMax.to($("#buttonForward"),0.5,{bottom:"-20%"});
// 	// loadQuestion();
// 	soundQuestion.play();
// 	blurElement = {a:0}
// 	applyBlur()
// }

function initExam(){
    function onSuccess(response){
    	preguntas = response.preguntas
		totalQuestions = question.length;
		etapa = response.etapa
		grado = response.grado
		loadQuestion()
	}

	services.initExam(examID, onSuccess)
}

function loginChild(){
    services.loginChild("nick", 1234, initExam)
}

$(".beginquiz-tutorial").click(function(){
     titleTutorial = TweenMax.fromTo(elementsTutorial[4],1,{alpha:0,left:"0%"},{alpha:1,left:"-50%"});
    globetutorial = TweenMax.to(elementsTutorial[2],1,{left:"230%",ease:Back.easeOut});
    topTutorial = TweenMax.fromTo(elementsTutorial[0],2,{scale:1,top:"0%"},{scale:2,top:"-100%"})
    bottomTutorial = TweenMax.fromTo(elementsTutorial[1],2,{scale:1,bottom:"0%"},{scale:2,bottom:"-100%"})
    eagleTutorial = TweenMax.fromTo(elementsTutorial[3],1,{scale:1,left:"0%"},{scale:2,left:"-200%",ease:Back.easeOut,onComplete:beginAnimationShip()});
    magicSound.play();
        tutorialSounds[7].pause();
        tutorialSounds[7].currentTime = 0;
        tutorialSounds[8].play();
        tutorialSounds[8].pause();
        tutorialSounds[8].currentTime = 0;
});
// ANIMATION FOR SPACESHIP
var images = new Array;
    for(var c = 0;c<=20;c++){
        images[c] = "assets/images/secuencia/ship-normal-idle_slow_v2_"+c+".png";
    }
	var obj = {curImg: 0};
	var tween = TweenMax.to(obj, 3,
		{
			curImg: images.length - 1,
			roundProps: "curImg",
			repeat: -1,
			immediateRender: true,
			ease: Linear.easeNone,
			onUpdate: function () {
			  $("#eagle").attr("src", images[obj.curImg]);
			}
		}
	); 
    var shipAnimation = new TimelineMax();
    bgm.play();
    bgm.loop = true;
    bgm.volume = 0.3;

    function beginAnimationShip(){
        TweenMax.to($("#ship"),2,{top:"20%",ease:Back.easeOut,delay:1});
        TweenMax.to($("#ship"),1,{left:"-20%", scale:0.5,delay:2});
        TweenMax.to($("#ship"),1,{left:"20%",delay:3});
        TweenMax.to($("#ship"),1,{left:"0%", top:"50%",ease:Back.easeIn,delay:4});
        TweenMax.to($("#floor"),1,{top:"0%", delay:4,onComplete:NextShip});  
    }

function NextShip(){
    starsAnimation.pause();
     TweenMax.to($("#ship"),2,{top:"0%",scale:1,ease:Back.easeInOut,onComplete:BeginQuestions});   $("#bgm").animate({volume: 0}, 1000);
}


function BeginQuestions(){
    $("#container").css("visibility","visible");
    TweenMax.fromTo($("#container"),1,{alpha:0},{alpha:1,onComplete:explainBegin});
    //LOAD FIRST QUESTION
    tutorialQuestion();
    soundQuestion.pause();
    soundQuestion.currentTime = 0;
}

function explainBegin(){
    //$("#buttonForward").hide();
    $("#cortainTutorial").css("visibility","visible");
    $("#globeExplain").show();
   TweenMax.to($("#globeExplain").find(".eagle-tutorial"),1,{left:"0%",scale:1});  
   TweenMax.fromTo($("#globeExplain"),1,{alpha:0},{alpha:1});    
   TweenMax.to($("#buttonForward"),0.5,{bottom:"-12%"});
    stepsTutorialFX()
}

var objectsTutorial = 
    [
        ".section-grade",
        "#counter-page",
        ".contentBar",
        "#timerSection",
        ".buttonHelp",
        ".buttonAudio",
        "#question",
        "#imageQuestion",
        "#answer-section",
        "#buttonForward"
    ]

//APPLY BLUR IN CONTAINER
var blurElement = {a:10};
//TweenMax.to(blurElement, 1, {a:10, onUpdate:applyBlur});
function applyBlur(){
    TweenMax.set(['.section-grade','#counter-page','.contentBar','#timerSection','.buttonHelp','.buttonAudio','#question','#imageQuestion','#answer-section','#buttonForward'], {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});  
};


var textsTutorial = 
    [
    "Aquí verás tu grado escolar.",
    "En este recuadro verás en qué número de pregunta vas y cuántas son en total.",
    "Esta es la barra de progreso y se irá llenando a medida que avances en la prueba.",
    "Aquí se indica cuánto tiempo te queda para terminar la prueba.",
    "Si tienes alguna duda durante la etapa de prácticas, presiona este botón. Aquí encontrarás una guía para las pregunta más complicadas.",
    "Si eres un héroe de primero o segundo de primaria, podrás escuchar las preguntas con este botón.", 
    "Aquí aparecerá la pregunta que debes resolver. Asegúrate de leerla toda antes de contestar.",
    "Si la pregunta tiene imágenes, aparecerán en esta sección.",
    "Aquí aparecerán las cuatro respuestas posibles, solo una es la correcta.",
    "Es muy importante que selecciones una respuesta para que se active el botón OK y puedas avanzar."    
]

var stepTutorial = 0;
function stepsTutorialFX(){
    
    TweenMax.fromTo($("#arrowExplain").find("img"),0.5,{y:0},{y:20,yoyo:true,repeat:-1})
    
    if(stepTutorial != objectsTutorial.length){
        for(i= 0;i<=objectsTutorial.length-1;i++){
            $(objectsTutorial[i]).css("z-index",1);
        }
        applyBlur()
        TweenMax.set([objectsTutorial[stepTutorial]], {webkitFilter:"blur(" + 0 + "px)",filter:"blur(" + 0 + "px)"});  
        $(objectsTutorial[stepTutorial]).css("z-index",10000); 
        
        $("#arrowExplain").css("left", parseInt($(objectsTutorial[stepTutorial]).css("left")) + parseInt($(objectsTutorial[stepTutorial]).width())/2 + "px" );
        
        $("#arrowExplain").css("top", parseInt($(objectsTutorial[stepTutorial]).css("top")) + parseInt($(objectsTutorial[stepTutorial]).height()) + "px" );
        
        if(stepTutorial == 6){
            $("#arrowExplain").css("left", parseInt($(objectsTutorial[stepTutorial]).css("left")) + parseInt($(objectsTutorial[stepTutorial]).width())/2 + "px" );

            $("#arrowExplain").css("top", parseInt($(objectsTutorial[stepTutorial]).css("top")) + parseInt($(objectsTutorial[stepTutorial]).height())*2 + "px" );           
        }
        if(stepTutorial == 7){
            $("#arrowExplain").css("left", "50%" );

            $("#arrowExplain").css("top", parseInt($(objectsTutorial[stepTutorial]).css("top")) + parseInt($(objectsTutorial[stepTutorial]).height()) + "px" );           
        }
        
        if(stepTutorial == 8){
            $("#arrowExplain").css("left", "50%" );
            $("#arrowExplain").css("transform", "scale(1,-1)" );

            $("#arrowExplain").css("top", parseInt($(objectsTutorial[stepTutorial]).css("top")) + parseInt($(objectsTutorial[stepTutorial]).height()) - 50 + "px" );           
        }
        
        if(stepTutorial == 9){        
            
            $("#arrowExplain").css("left", "50%" );
            $("#arrowExplain").css("transform", "scale(1,-1)" );

            $("#arrowExplain").css("top", parseInt($(objectsTutorial[stepTutorial]).css("top")) + parseInt($(objectsTutorial[stepTutorial]).height())-200  + "px" );  
        }
        
        $("#pageExplain").find("p").text(textsTutorial[stepTutorial])

        console.log(stepTutorial);
        tutorialSounds[stepTutorial+7].pause();
        tutorialSounds[stepTutorial+7].currentTime = 0;
        tutorialSounds[stepTutorial+8].play();        
        stepTutorial++
        
    }else{
        $("#globeExplain").hide();
        TweenMax.fromTo($("#cortainTutorial"),0.5,{alpha:1},{alpha:0,onComplete:startQuiz});
        TweenMax.to($("#buttonForward"),0.5,{bottom:"-20%"});
        soundQuestion.pause();
        blurElement = {a:0}
        applyBlur()
    }
    
    if(stepTutorial == 8){
        $("#pageExplain").css("top","15%");
    }else{
        $("#pageExplain").css("top","50%");
    }    
}


$("#nextExplainButton").click(function(){
    tutorialSounds[stepTutorial+7].pause();
    tutorialSounds[stepTutorial+7].currentTime = 0;
    stepsTutorialFX()
    popSound.play();
});

$("#jumpExplainButton").click(function(){
    tutorialSounds[stepTutorial+7].pause();
    tutorialSounds[stepTutorial+7].currentTime = 0;    
    popSound.play();
    $("#globeExplain").hide();
    TweenMax.fromTo($("#cortainTutorial"),0.5,{alpha:1},{alpha:0,onComplete:startQuiz});    
    TweenMax.to($("#buttonForward"),0.5,{bottom:"-20%"});    
    soundQuestion.pause();
    blurElement = {a:0}
    applyBlur()
});

function startQuiz(){
    $("#cortainTutorial").hide();
    questionAnimation(1)
}


$(window).resize(function () {
      calculateNewScale(".container-canvas");
    });

    calculateNewScale(".container-canvas"); 

    function calculateNewScale(obj) {
      var percentageOn1 = $(window).width() / 1280;
      $(obj).css({
        "-moz-transform": "scale(" + percentageOn1 + ")",
        "-webkit-transform": "scale(" + percentageOn1 + ")",
        "transform": "scale(" + percentageOn1 + ")"
      });
    }


/*ONLY REVIEW TEST MODE************************/

if(config.testMode){
    
    $("#testButtonleft").click(function(){
      if(counter != 0){
          counter--
            selectQuestion = counter;
            loadQuestion()
      }  
    });
    
    $("#testButtonright").click(function(){
            counter++
            selectQuestion = counter;
            loadQuestion()
        
    });
    
  $("body").keydown(function(e) {
  if(e.keyCode == 37) { // left
            //HARDCOREADA
            //selectQuestion = result[counter];
      if(counter != 0){
          counter--
            selectQuestion = counter;
            loadQuestion()
      }
            
  }
  else if(e.keyCode == 39) { // right
            //HARDCOREADA
            //selectQuestion = result[counter];
            counter++
            selectQuestion = counter;
            loadQuestion()
  }
});  
}

bgm.volume = 0;
var tutorialSounds = new Array;

function includeSoundsTutorial(){
    for(var i = 1; i<=19;i++){
        $("body").append('<audio id="tutorial'+i+'" src="assets/sounds/tutorial'+i+'.mp3"></audio>');
        tutorialSounds[i] = document.getElementById("tutorial" + i);
    }
}

includeSoundsTutorial()

function soundTutorial1(){
    tutorialSounds[1].play();
}

function onlyQuestions(){
    bgm.volume = 0;
    TweenMax.to($("#ship"),2,{top:"0%",scale:1,ease:Back.easeInOut});
    $("#tutorialScreen").hide();
    $("#container").css("opacity",1);
    $("#container").css("visibility","visible");
    TweenMax.to($("#floor"),1,{top:"0%"});
    starsAnimation.pause();
    explainBegin()
        tutorialQuestion();
    
}


onlyQuestions();
