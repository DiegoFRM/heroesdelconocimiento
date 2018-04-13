var services = function () {
	var url = "https://math-tournament-dot-heroesofknowledge.appspot.com"

	var SECTION = "/tournament"
	var VERSION = "/v1"
	var STATUS_SUCCESS = 0

	var LOGIN_CHILD = SECTION + "/child" + VERSION + "/login"
	var INIT_EXAM = SECTION + "/examen" + VERSION + "/iniciarExamen"
	var REG_ANSWER = SECTION +"/examen" + VERSION + "/registrarRespuesta"

	function ajaxCall(data, endPoint, onSuccess, onError, type) {
		type = type || "POST"

		$.ajax({
			contentType: 'application/json',
			data: JSON.stringify(data),
			dataType: 'json',
			type: type,
			url: url + endPoint,
			async:true,
			processData:false
		}).done(function(response){
			// if((xhr)&&(xhr.status === STATUS_SUCCESS)){
				setCredentials(response)
				if(onSuccess)
					onSuccess(response)
				console.log("success", response)
			// }else {
			// 	localStorage.clear()
			// 	if(onError)onError(response)
			// 	console.log("error", xhr)
			// }
		}).fail(function(response){
			localStorage.clear()
			if(onError)onError(response)
			console.log(onError)
		});
	}

	// function callMixpanelLogin(subscribed){
	// 	var credentials = epicModel.getCredentials()
	// 	mixpanel.track(
	// 		"onLoginSuccess",
	// 		{"user_id": credentials.educationID,
	// 			"subscribed":subscribed}
	// 	);
	// 	mixpanel.people.increment("loginCount");
	// 	// console.log("loginMixpanel", subscribed)
	// }

	function setCredentials(response) {

		if(!response)
			return

		if((response.email)&&(typeof response.email !== "undefined")){
			localStorage.setItem("email", response.email)
		}

		if((response.token)&&(typeof response.token !== "undefined")){
			localStorage.setItem("token", response.token)
		}

		if((response.child_id)&&(typeof response.child_id !== "undefined")){
			localStorage.setItem("child_id", response.child_id)
		}

		var child = response.child
		if(!child)
			return

		if ((child.parentMail)&&(typeof child.parentMail !== "undefined"))
			localStorage.setItem("email", child.parentMail)

		if ((child.child_id)&&(typeof child.child_id !== "undefined"))
			localStorage.setItem("child_id", child.child_id)

	}

	function getCredentials() {

		return {
			email: localStorage.getItem("email"),
			token: localStorage.getItem("token"),
			child_id: localStorage.getItem("child_id"),
			educationID: localStorage.getItem("educationID")
		}
	}


	function loginChild(nickname, pin, onSuccess, onError) {
		ajaxCall({nickname:nickname, pin:pin}, LOGIN_CHILD, onSuccess, onError)
	}

	function initExam(examID, onSuccess, onError){
		var credentials = getCredentials()

		ajaxCall({child_id:credentials.child_id, examen_id:examID, token:credentials.token}, INIT_EXAM, onSuccess, onError)
	}
	
	function registerAnswer(questionID, answerID, onSuccess, onError) {
		var credentials = getCredentials()

		ajaxCall({child_id:credentials.child_id, token:credentials.token, pregunta_id:questionID,
			respuesta_id:answerID}, REG_ANSWER, onSuccess, onError)
	}


	return{
		loginChild:loginChild,
		initExam:initExam,
		registerAnswer:registerAnswer
	}
}()

/*
parent(email, pwd) return (
 */
