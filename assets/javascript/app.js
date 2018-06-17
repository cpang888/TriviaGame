
var questions = [
  {question: "What was the first full length CGI movie?", choices: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"], answer: "Toy Story"},
  {question: "Which of these is NOT a name of one of the Spice Girls?", choices: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"], answer: "Fred Spice"},
  {question: "Which NBA team won the most titles in the 90s?", choices: ["New York Knicks", "Portland Trailblazers", "Los angeles Lakers", "Chicago Bulls"], answer: "Chicago Bulls"}
];
  
  var number = 30;

    var intervalId;

    /*
      Method - run
      Player clicks on the <start> button and it calls this method
    */
    function run() {
      // start the timer
      // descrease the timer counter every 1 sec
      intervalId = setInterval(decrement, 1000);

      // show all questions
      $("#question0").show();
      $("#question1").show();
      $("#question2").show();
      $("#startBtn").hide();
      $("#doneBtn").show();

      // for each question in the questions array
      for(var j=0; j<questions.length; j++ ) {
        // dynamically build each question
        var question = questions[j];
        var $newDiv = $("<h3>" + question.question + "</h3>");

        $newDiv.appendTo($("#question"+j));

        // for each choice in the question
        for(var i=0; i<question.choices.length; i++){
          // dynamically build the radio button
        var $newInput = $("<input type='radio'>");
          $newInput
          .attr("name", "fieldName" + j) // group the ratio buttons with the name 'fieldName'
          .attr("value", question.choices[i])
          .addClass("text");

          $newInput.appendTo($("#question"+j));
          $newInput.after(question.choices[i]);
        }
      }
    }

    /*
      Method - decrement
      This method update the timer on the page
      It also keep track of the timer counter
    */
    function decrement() {

      number--;

      $("#show-number").html("<h2> Time Remaining: " + number + " Seconds </h2>");

      if (number <= 0) {
        // timer has been down to 0
        stop();
        hideQuestion();
        showAllDone();
        alert("Time Up!");
      }
    }

    /*
      Method - hideQuestion
      This method hide all 3 questions
    */ 
    function hideQuestion() {
      $("#question0").hide();
      $("#question1").hide();
      $("#question2").hide();
    }

    /*
      Method - hideAnswer
      This method hide all 3 answers
    */ 
    function hideAnswer() {
      $("#correctAnswer").hide();
      $("#incorrectAnswer").hide();
      $("#unanswer").hide();
    }

    /*
      Method - showAllDone
      User clicks on <done>
      Shows the # of correct, incorrect, unswered answers
    */ 
    function showAllDone() {

      $("#show-number").hide();

      // show All Done!
      $("#log").text("All Done!");
      $("#correctAnswer").show();
      $("#incorrectAnswer").show();
      $("#unanswer").show();
      $("#doneBtn").hide();

      var unanswer = 0;
      var correctAnswer = 0;
      var incorrectAnswer = 0;

      // loop through all questions in the questions array
      for(var i=0; i<questions.length; i++) {
        // get the selected value from the input type 'radio'
        var selected = $("input[type='radio'][name='fieldName" + i + "']:checked");
        if(selected.length > 0 ) {
            // player selects an answer
            // compare the player's selected answer with the correct answer
            if(selected.val() === questions[i].answer) {
              // player picks the correct answer
              // increase the correctAnswer counter by 1
              correctAnswer++;
            } else {
              // player picks the wrong answer
              // increate the incorrectAnswer counter by 1
              incorrectAnswer++;
            }
        } else {
          // none of the radio button is selected; increase the unanswer counter
          unanswer++;
        }
      }

      // Display the # of correct, incorrect, unswered answers on the page 
      $("#correctAnswer").html("<span> Correct Answers: " + correctAnswer + "</span>");
      $("#incorrectAnswer").html("<span> Incorrect Answers: " + incorrectAnswer + "</span>");
      $("#unanswer").html("<span> Unanswer: " + unanswer + "</span>");

    }

    /*
      Method: start
      This is the first page of the application
      It display the title and the <start> button
      It hides all the questions, answers, <done> button etc
    */
    function start() {
      console.log("inside start()");

      hideQuestion();
      hideAnswer();
      $("#doneBtn").hide();
      $("#startBtn").click(run);
      $("#doneBtn").click(stop);
    }

    function stop() {

      clearInterval(intervalId);
      hideQuestion();
      showAllDone();
    }
    
    $(document).ready(function() {
      // when document is ready, call the start method
      start();

    })