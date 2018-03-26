/*DIEGO ROJAS 2018*/
    /*LOAD THEME*/
    //append THEME STYLE
var soundActive = true;

var soundQuestion = document.getElementById("soundQuestion");


var popSound = document.getElementById("popSound");
var magicSound = document.getElementById("magicSound");
var abdutionSound = document.getElementById("abdutionSound");

   var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/themes/' + config.theme +'/css/' + config.theme +'.css';
    document.body.appendChild(link);
    
    var fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'assets/themes/' + config.theme +'/css/' + config.fonts +'.css';
    document.body.appendChild(fonts);
    
    //append THEME SCRIPT
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = 'assets/themes/' + config.theme +'/js/' + config.theme +'.js';
    document.body.appendChild(script);    


    var gradeSelection = 1;
    var totalQuestions = question.length-1;
    //var totalQuestions = 0;
    var questionGradeSelect = new Array;

   /* for(var d = 0;d<= question.length-1 ; d++){
        if(question[d].grade == gradeSelection){
            totalQuestions++;
        }
    }
*/


    



    selectQuestion = 0;

    var showAnswer = false;
    var confirmAnswer = true;
    var buttonSelect;
    var sesionSaveQuestion = new Array;
    var counter = 0;
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
    function saveAnswer(question,answer){
        sesionSaveQuestion[counter] = [{Question:"",Answer:""}]
        sesionSaveQuestion[counter].Question = question;
        sesionSaveQuestion[counter].Answer  = answer; 
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
    //NEXT QUESTION
    function nextQuestion(){
        $(".answer").find(".contentText").removeClass("incorrect-button");
        $(".answer").find(".contentText").removeClass("correct-button");
        $(".answer").find(".contentText").removeClass("select-button");
        $(".answer").find(".optionLetters").removeClass("incorrect-button");
        $(".answer").find(".optionLetters").removeClass("correct-button");
        $(".answer").find(".optionLetters").removeClass("select-button");
        saveAnswer(question[selectQuestion].Question,buttonSelect.id)
        if(counter == totalQuestions-1){
            console.log("completed");
            resultsScene();
            
        }else{
            counter++;
            //HARDCOREADA
            //selectQuestion = result[counter];
            selectQuestion = counter
            questionAnimation(buttonSelect.id);
            //loadQuestion();  
        }

    }
    
    //INCLUDE LETTERS IN ANSWERS
    if(config.includeOptionsLetters){ 
        var optionsLetters = ["A","B","C","D"]
        for(var i = 1;i<=config.NumberOptions;i++){
            $("#answer" + i).html("<div class='optionLetters'>"+ optionsLetters[i-1]  +"</div>");
            $("#answer" + i).append("<span class='contentText'><span></span></span>");
        }
    }
    //LOAD QUESTION

    function loadQuestion(){
        $(".type-questionSelect").text(question[selectQuestion].typeQuestion + " " + question[selectQuestion].Level)
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

            soundQuestion.src = "assets/sounds/" + soundSelect + ".mp3"
            soundQuestion.play();
        }
        $("#retro").hide();
        $("#buttonForward").hide();
        //HARDCOREADA
        $("#counter-page").find("span").html([counter + 1] + "/" + totalQuestions);
        $(".section-gradeText").html('<span>' + question[counter].grade+'° grado</span>')
        //FIN HARDCOREADA
        $("#question").find("span").html(question[selectQuestion].Question);  
        
        if(question[selectQuestion].useImageQuestion){
            $(".ranuraimagen").css("opacity",1);
            TweenMax.fromTo($("#imageQuestion"),1,{alpha:0},{alpha:1});
           $("#imageQuestion").find("img").attr('src','assets/images/grade'+question[selectQuestion].grade +'/' + question[selectQuestion].imageQuestion + '.png');
            
            
                $("#imageQuestion").on("error", function(){
                    $(this).attr('src', 'assets/images/EnProceso.png');
                });
            
           }else{
                $(".ranuraimagen").css("opacity",0);
               $("#imageQuestion").find("img").attr('src','assets/images/' +  'blank.png');
               $("#imageQuestion").css("opacity",0);
           }
        
        for(var a= 1;a<=4;a++){
            $("#answer" + a).attr("index",a);
            //Include Images or only answers
            if(question[selectQuestion].includeImages){
                $("#answer" + a).find(".contentText").find("span").html('<div class="containerQuestionImage"><img src="assets/images/grade'+question[selectQuestion].grade +'/' + question[selectQuestion]["image" + a] + '.png" />'  + question[selectQuestion]["answer" + a]  +"</div>");
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
    }
    //RANDOM QUESTIONS
    var randoms = randomNumbers(question.length),
        rand = randoms(),
        result = [];
    while(rand != null) {
        result.push(rand);
        rand = randoms();
    }
    //CONFIRM BUTTON
    //selectQuestion = result[counter];
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
            $(this).css("background-image", 'url("assets/themes/tournament2018/images/SoundOff.png")');
            soundActive = false;
        }else{
            soundQuestion.volume = 1;
            $(this).css("background-image", 'url("assets/themes/tournament2018/images/SoundOn.png")');
            soundActive = true;
        }
        
    });


    //LOAD FIRST QUESTION
    loadQuestion();






/**TEST MODE***/
if(config.testMode){
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



