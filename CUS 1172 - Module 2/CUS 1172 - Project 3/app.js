
// The questions array represents the model of the applications. 
// In the demo code the model is hard-coded; However, in 
// a real application the model will be loaded from a RESTFUL API.

//
const questions = [
    {
      questionType : "true_false",
      questionText : "The earth is round",
      correctAnswer : "true",
      options : ["true", "false"],
    },
    {
      questionType : "text_input",
      questionText : "What is the value of the expression 1+1",
      correctAnswer : "2",
      answerFieldId : "answer_to_question",
    },
    {
      questionType: "multiple_choice",
      questionText: "What is Adoni's last name?",
      correctAnswer: "Takos",
      options: ["Papadopoulos", "Demetrios", "Takos", "Yiannopoulos"],
    },
    {
      questionType: "image_choice",
      questionText: "Which is the correct logo for Swift?",
      correctAnswer: "images/swift.png",
      options: [
          "images/java-logo.png",
          "imges/python-logo.png",
          "images/swift.png",
          "images/VisualStudio-logo.png"
      ],
    }

  ] // <--- questions[] Array ends here
  
  // appState, keep information about the State of the application.
  const appState = {
      current_view : "#intro_view",
      current_question : -1,
      current_model : {}
  } // <--- appState variable ends here

// API request function
  async function fetch_questions() {
    try {
      // Notice: the fetch call returns a Promise Object.
      // await 'pauses' the execution in this code sequece waiting for the 
      // promise to be fullfilled (i.e. the data arrive)  - in a non-clocking way.
      // Once promise is fullfilled the 'response' variable  holds an object of type Response  
      url = 'https://my-json-server.typicode.com/adonitakos/coding_questions/db'
      const response = await fetch(url)
      
      // Notice: the json() method itself returns a Promise object 
      // (since parsing the json response might take some time). Hence we need to 
      // await for the parsiong to complete. 
      const result = await response.json()
      
      // At this point we have the actual json parsed results .
      console.log(result);
    } // <--- try{} block ends here
    catch (err) {
      console.error(err);
    } // <--- catch{} block ends here
  } // <--- fetch_questions() function ends here
  
  //
  // start_app: begin the applications.
  //
  
  document.addEventListener('DOMContentLoaded', () => {
    // Set the state
    appState.current_view =  "#intro_view";
    appState.current_model = {
      action : "start_app"
    }
    update_view(appState);
  
    //
    // EventDelegation - handle all events of the widget
    //
  
    document.querySelector("#widget_view").onclick = (e) => {
        handle_widget_event(e)
    }
  }); // <--- EventListener() ends here
  
  
  function handle_widget_event(e) {
  
    if (appState.current_view == "#intro_view"){
      if (e.target.dataset.action == "start_app") {
  
          // Update State (current model + state variables)
          appState.current_question = 0
          appState.current_model = questions[appState.current_question];
          // process the appState, based on question type update appState.current_view
          setQuestionView(appState);
         
          // Now that the state is updated, update the view.
  
          update_view(appState);
          console.log("View was updated");
      } // <--- nested if() statement ends here
    } // <--- if(#intro_view) statement ends here
  
    // Handle the answer event.
    if (appState.current_view == "#question_view_true_false") {
  
      if (e.target.dataset.action == "answer") {
         // Controller - implement logic.
         isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
       
         // Update the state.
         appState.current_question = appState.current_question + 1;
         appState.current_model = questions[appState.current_question];
         setQuestionView(appState);
       
         // Update the view.  
         update_view(appState);
         console.log("View was updated");
  
       } // <--- nested if() statement ends here
     } // <--- if(#question_view_true_false) statement ends here
  
     // Handle answer event for text questions.
     if (appState.current_view == "#question_view_text_input") {
         if (e.target.dataset.action == "submit") {
       
             user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
             isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
             updateQuestion(appState)
             //appState.current_question =   appState.current_question + 1;
             //appState.current_model = questions[appState.current_question];
             setQuestionView(appState);
             update_view(appState);
             console.log("View was updated");
         } // <--- nested if() statement ends here
      } // <--- if(#question_view_text_input) statement ends here

      // Handle answer event for multiple choice questions:
      if (appState.current_view == "#question_view_multiple_choice") {
  
        if (e.target.dataset.action == "answer") {
           // Controller - implement logic.
           isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
         
           // Update the state.
           updateQuestion(appState);
           //appState.current_question = appState.current_question + 1;
           //appState.current_model = questions[appState.current_question];
           
           setQuestionView(appState);
         
           // Update the view.  
           update_view(appState);
           console.log("View was updated");
         } // <--- nested if() statement ends here
       } // <--- if(#question_view_multiple_choice) statement ends here

       // // Handle answer event for image choice questions:
       if (appState.current_view == "#question_view_image_choice") {
  
        if (e.target.dataset.action == "answer") {
           // Controller - implement logic.
           isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
         
           // Update the state.
           updateQuestion(appState);
           //appState.current_question = appState.current_question + 1;
           //appState.current_model = questions[appState.current_question];
           
           setQuestionView(appState);
         
           // Update the view.  
           update_view(appState);
    
         } // <--- nested if() statement ends here
       } // <--- if(#question_view_image_choice) statement ends here
  
      // Handle answer event for  text questions.
      if (appState.current_view == "#end_view") {
          if (e.target.dataset.action == "start_again") {
            appState.current_view =  "#intro_view";
            appState.current_model = {
              action : "start_app"
            }
            update_view(appState);
  
          } // <--- nested if() statement ends here
        } // <--- if(#end_view) statement ends here
  
   } // <--- handle_widget_event() function ends here
  
  function check_user_response(user_answer, model) {
    if (user_answer == model.correctAnswer) {
      return true;
    }
    return false;
  } // <--- check_user_response() function ends here
  
  function updateQuestion(appState) {
      if (appState.current_question < questions.length-1) {
        appState.current_question = appState.current_question + 1;
        appState.current_model = questions[appState.current_question];
      }
      else {
        appState.current_question = -2;
        appState.current_model = {};
      }
  } // <--- updateQuestion() fucntion ends here
  
  function setQuestionView(appState) {
    if (appState.current_question == -2) {
      appState.current_view  = "#end_view";
      return
    } // <--- setQuestionView() function ends here
  
    if (appState.current_model.questionType == "true_false")
      appState.current_view = "#question_view_true_false";
    else if (appState.current_model.questionType == "text_input") {
      appState.current_view = "#question_view_text_input";
    }
    else if(appState.current_model.questionType == "multiple_choice") {
      appState.current_view = "#question_view_multiple_choice";
    }
    else if(appState.current_model.questionType == "image_choice") {
      appState.current_view = "#question_view_image_choice";
    }
  } // <--- setQuestionView() function ends here
  
  function update_view(appState) {
  
    const html_element = render_widget(appState.current_model, appState.current_view)
    document.querySelector("#widget_view").innerHTML = html_element;
  } // <--- update_view() function ends here
  
  
  const render_widget = (model,view) => {
    // Get the template HTML
    template_source = document.querySelector(view).innerHTML
    // Handlebars compiles the above source into a template
    var template = Handlebars.compile(template_source);
  
    // apply the model to the template.
    var html_widget_element = template({...model,...appState})
  
    return html_widget_element
  } // <--- render_widget() function ends here