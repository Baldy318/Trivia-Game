$(document).ready(function(){
  
  // event listeners
  $("#start").on('click', trivia.startGame);
  $("#remaining-time").hide();
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
  

  questions: {
    q1: 'What famous president did not show his taxes?',
    q2: 'What actor is known as "Fresh Prince of Bel Air" in his hit 90s/2000s show?',
    q3: 'What author is known for one of their best selling mystery novels "And Then There Were None"? ',
    q4: 'In what year was the last stock market crash?',
    q5: "Who invented the world's first computer programming in 1842?",
    q6: 'This Latin term describes the muscles and joints of the human body stiffening after death?',
    q7: "What is the name of Beyonce's latest album?"
  },
  options: {
    q1: ['G W Bush', 'Bill Clinton', 'Donald Trump', 'Barack Obama'],
    q2: ['Carlton Banks','Dougie Howser', 'Will Smith', 'Charlie Sheen'],
    q3: ['Hercule Poirot','Elizabeth Washington','Agatha Chrystie','Ernest Hemingway'],
    q4: ['1994', '2008', '2011', '1984'],
    q5: ['Ada Lovelace','John Backus','Bill Gates','Jesse Owens'],
    q6: ['Vini Veti Vici','Rigor Mortis','Carpe Diem','Quid Quo Pro'],
    q7: ['Homecoming', 'Dangerously In Love', 'Beyonce','Lemonade']
  },
  answers: {
    q1: 'Donald Trump',
    q2: 'Will Smith',
    q3: 'Agatha Chrystie',
    q4: '2008',
    q5: 'Ada Lovelace',
    q6: 'Rigor Mortis',
    q7: 'Homecoming'
  },

  startGame: function(){
    
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    // To display game section
    $('#game').show();
    
    //  To empty last results
    $('#results').html('');
    
    //To show timer
    $('#timer').text(trivia.timer);
    
    // To remove start button
    $('#start').hide();

    $('#remaining-time').show();
    
    // To ask first/next question
    trivia.nextQuestion();
    
  },
  // The method to loop through and display questions and options 
  nextQuestion : function(){
    
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    // to prevent timer speed up
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    // An array of all the possible answers/options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    // To create all the trivia guess options in the html
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    // When the time has run out and increment is left unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Time is Up! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // If all the questions have been shown end the game, show results
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      // adds results of game (correct, incorrect, unanswered) to the page
      $('#results')
        .html('<h3>Thanks for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unanswered: '+ trivia.unanswered +'</p>'+
        '<p>Play again!</p>');
      
      // hide game section
      $('#game').hide();
      
      // show start button to begin a new game
      $('#start').show();
    }
    
  },
  // The method to evaluate the option clicked
  guessChecker : function() {
    
    // timer ID for gameResult setTimeout
    var resultId;
    
    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    // if the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer){
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    // If the user picked the wrong option/answer, increment incorrect
    else{
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3> Sorry. Wrong Answer! Onto the next one! '+ currentAnswer +'</h3>');
    }
    
  },
  // method to remove previous question results and options
  guessResult : function(){
    
    // increment to next question set
    trivia.currentSet++;
    
    // To remove the options and results
    $('.option').remove();
    $('#results h3').remove();
    
    // To begin next question
    trivia.nextQuestion();
     
  }

}