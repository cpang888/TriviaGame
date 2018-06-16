
var questions = [
  {question: "What was the first full length CGI movie?", choices: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"], answer: "Toy Story"},
  {question: "Which of these is NOT a name of one of the Spice Girls?", choices: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"], answer: "Fred Spice"},
  {question: "Which NBA team won the most titles in the 90s?", choices: ["New York Knicks", "Portland Trailblazers", "Los angeles Lakers", "Chicago Bulls"], answer: "Chicago Bulls"}
];
  
  var number = 100;

    var intervalId;

    function run() {
      intervalId = setInterval(decrement, 1000);

      $("#question0").show();
      $("#question1").show();
      $("#question2").show();
      $("#startBtn").hide();
      $("#doneBtn").show();

      
      for(var j=0; j<questions.length; j++ ) {
        var question = questions[j];
        var $newDiv = $("<h3>" + question.question + "</h3>");

        $newDiv.appendTo($("#question"+j));

        for(var i=0; i<question.choices.length; i++){
        var $newInput = $("<input type='radio'>");
          $newInput
          .attr("name", "fieldName" + j) // group the ratio buttons
          .attr("value", question.choices[i])
          .addClass("text");

          $newInput.appendTo($("#question"+j));
          $newInput.after(question.choices[i]);
        }
      }
    }

    function decrement() {

      number--;

      $("#show-number").html("<h2> Time Remaining: " + number + " Seconds </h2>");

      if (number <= 0) {

        stop();
        hideQuestion();
        showAllDone();
        alert("Time Up!");
      }
    }

    function hideQuestion() {
      $("#question0").hide();
      $("#question1").hide();
      $("#question2").hide();
    }

    function hideAnswer() {
      $("#correctAnswer").hide();
      $("#incorrectAnswer").hide();
      $("#unanswer").hide();
    }

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

      for(var i=0; i<questions.length; i++) {
        var selected = $("input[type='radio'][name='fieldName" + i + "']:checked");
        if(selected.length > 0 ) {
            if(selected.val() === questions[i].answer) {
              correctAnswer++;
            } else {
              incorrectAnswer++;
            }
        } else {
          unanswer++;
        }
      }

      $("#correctAnswer").html("<span> Correct Answers: " + correctAnswer + "</span>");
      $("#incorrectAnswer").html("<span> Incorrect Answers: " + incorrectAnswer + "</span>");
      $("#unanswer").html("<span> Unanswer: " + unanswer + "</span>");

    }

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

    start();

  })