
function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.familiarization = slide({
    name : "familiarization",
    present : [], //trial information for this block
    start : function() {/*what to do at the beginning of a block*/},
    present_handle : function() {/*what to do at the beginning of each trial*/},
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
    end : function() {/*what to do at the end of a block*/}
  });

  slides.first_single_slide = slide({
    name : "first_single_slide",
    start : function() {
      $(".err").hide();
      var rand = Math.floor(Math.random()*(10-1+1)+1);
      $('#ss_instruction1').text("Aliens on a newly found planet outside our solar system look very similar to humans. However, " + rand + "% of aliens on this planet have blue skin. If you met 100 aliens on this planet, on average, how many aliens with blue skin would you meet?"); //FRED
      this.init_sliders();
      exp.sliderPost = null;
    },
    button : function() {
      if (exp.sliderPost != null) {
      	this.log_responses();
        exp.go(); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#sslider1", function(event, ui) {
        exp.sliderPost = ui.value * 100;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "first_single_slide",
        "response" : exp.sliderPost
      });
    }
  });

  slides.second_single_slide = slide({
    name : "second_single_slide",
    start : function() {
      $(".err").hide();
      var rand = Math.floor(Math.random()*(55-45+1)+45);
      $('#ss_instruction2').text("Aliens living underground on Mars, for the most part, have black eyes. However " + rand + "% of these aliens have green eyes. If you met 100 aliens on Mars, how many do you think would have green eyes?"); //FRED
      this.init_sliders();
      exp.sliderPost = null;
    },
    button : function() {
      if (exp.sliderPost != null) {
      	this.log_responses();
        exp.go(); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#sslider2", function(event, ui) {
        exp.sliderPost = ui.value * 100;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "second_single_slide",
        "response" : exp.sliderPost
        // "random int" : rand
      });
    }
  });

    slides.third_single_slide = slide({
    name : "third_single_slide",
    start : function() {
      $(".err").hide();
      var rand = Math.floor(Math.random()*(99-90+1)+90);
      $('#ss_instruction3').text("Pluto, although not a planet, was recently discovered to be the home of an alien species. The aliens there were very diverse, but it was found that there was a " + rand + "% chance that aliens from Pluto had horns. If you met 100 aliens on Pluto, how many do you think would have horns?"); //FRED
      this.init_sliders();
      exp.sliderPost = null;
    },
    button : function() {
      if (exp.sliderPost != null) {
      	this.log_responses();
        exp.go(); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#sslider3", function(event, ui) {
        exp.sliderPost = ui.value * 100;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "third_single_slide",
        "response" : exp.sliderPost
        // "random int" : rand
      });
    }
  });

  // slides.fourth_slide = slide({
  //   name : "fourth_slide",
  //   start : function() {
  //     $(".err").hide();
  //     this.init_sliders();
  //     exp.sliderPost = null;
  //   },
  //   button : function() {
  //     if (exp.sliderPost != null) {
  //     	this.log_responses();
  //       exp.go(); //use exp.go() if and only if there is no "present" data.
  //     } else {
  //       $(".err").show();
  //     }
  //   },
  //   init_sliders : function() {
  //     utils.make_slider("#slider7", function(event, ui) {
  //       exp.sliderPost = ui.value * 1000;
  //     });
  //   },
  //   log_responses : function() {
  //     exp.data_trials.push({
  //       "trial_type" : "fourth_slide",
  //       "response" : exp.sliderPost
  //     });
  //   }
  // }); 

  slides.car_multi_slider = slide({
    name : "car_multi_slider",
    present : [{"property":"Cars"},],
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //FRED: allows you to access stim in helpers
      $('#car_ms_instruction').text("Suppose you are sitting on a bridge overlooking a freeway. If you see one thousand cars drive by, what colors do you think they will be. Use these sliders to tell us what you think."); //FRED
      this.sentence_types = ["White", "Red", "Blue", "Black", "Yellow", "Silver/Gray"];
      var sentences = {
        "White": "How many white cars did you see?",
        "Blue": "How many blue cars did you see?",
        "Yellow": "How many yellow cars did you see?",
        "Red": "How many red cars did you see?",
        "Black": "How many black cars did you see?",
        "Silver/Gray": "How many silver or gray cars did you see?",
      };
      this.n_sliders = 6;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        $("#car_multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="car_slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        utils.match_row_height("#multi_slider_table", ".slider_target");
      }
      this.init_sliders(this.sentence_types);
      exp.sliderPost = [];
    },
    button : function() {
      if (exp.sliderPost.length < this.n_sliders) {
        $(".err").show();
      } else {
      	this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },
    init_sliders : function(sentence_types) {
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = sentence_types[i];
        utils.make_slider("#car_slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value * 1000;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "trial_type" : "car_multi_slider",
          "sentence_type" : sentence_type,
          "response" : exp.sliderPost[i]
        });
      }
    },
  });


  slides.movie_multi_slider = slide({
    name : "movie_multi_slider",
    present : [{"property":"Movies"}],
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //FRED: allows you to access stim in helpers
      $('#movie_ms_instruction').text("One thousand movies were released in 2013, to various degrees of success. Some movies made it big at the box office; others, not so much. How many of these 1000 movies grossed:"); //FRED
      this.sentence_types = ["1", "10", "50", "100", "500", "500+"];
      var sentences = {
        "1": "Less than $1,000,000",
        "10": "Between $1,000,000 and $10,000,000",
        "50": "Between $10,000,000 and $50,000,000",
        "100": "Between $50,000,000 and $100,000,000",
        "500": "Between $100,000,000 and $500,000,000",
        "500+": "More than $500,000,000",
      };
      this.n_sliders = 6;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        $("#movie_multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="movie_slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        utils.match_row_height("#multi_slider_table", ".slider_target");
      }
      this.init_sliders(this.sentence_types);
      exp.sliderPost = [];
    },
    button : function() {
      if (exp.sliderPost.length < this.n_sliders) {
        $(".err").show();
      } else {
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },
    init_sliders : function(sentence_types) {
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = sentence_types[i];
        utils.make_slider("#movie_slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value * 1000;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "trial_type" : "movie_multi_slider",
          "sentence_type" : sentence_type,
          "response" : exp.sliderPost[i]
        });
      }
    },
  });


 
  slides.age_multi_slider = slide({
    name : "age_multi_slider",
    present : [{"property":"Ages"}],
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //FRED: allows you to access stim in helpers
      $('#age_ms_instruction').text("Out of a 100 people born in the United States in 2009, how many people do you think would live to be between: "); //FRED
      this.sentence_types = ["20", "30", "40", "50", "60", "70", "80", "90"];
      var sentences = {
        "20": "Less than 20 years old",
        "30": "Between 20 and 30 years old",
        "40": "Between 30 and 40 years old",
        "50": "Between 40 and 50 years old",
        "60": "Between 50 and 60 years old",
        "70": "Between 60 and 70 years old",
        "80": "Between 70 and 80 years old",
        "90": "Above 80 years old",
      };
      this.n_sliders = 8;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        $("#age_multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="age_slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        utils.match_row_height("#multi_slider_table", ".slider_target");
      }
      this.init_sliders(this.sentence_types);
      exp.sliderPost = [];
    },
    button : function() {
      if (exp.sliderPost.length < this.n_sliders) {
        $(".err").show();
      } else {
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },
    init_sliders : function(sentence_types) {
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = sentence_types[i];
        utils.make_slider("#age_slider" + i, this.make_slider_callback(i));
      }
      $('#age_slider4.ui-slider-handle').show();
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value * 100;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "trial_type" : "age_multi_slider",
          "sentence_type" : sentence_type,
          "response" : exp.sliderPost[i]
        });
      }
    },
  });



  slides.car_fixed_multi_slider = slide({
    name : "car_fixed_multi_slider",
    present : [{"property":"Cars"},],
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //FRED: allows you to access stim in helpers
      $('#car_fixed_ms_instruction').text("Let's say you're watching cars on the freeway again. This time, your friend sitting next to you says that he saw 250 white cars out of the 1000. With that in mind, how many cars of other colors do you think passed by?"); //FRED
      this.sentence_types = ["White", "Red", "Blue", "Black", "Yellow", "Silver/Gray"];
      var sentences = {
        "White": "How many white cars did you see?",
        "Blue": "How many blue cars did you see?",
        "Yellow": "How many yellow cars did you see?",
        "Red": "How many red cars did you see?",
        "Black": "How many black cars did you see?",
        "Silver/Gray": "How many silver or gray cars did you see?",
      };
      this.n_sliders = 6;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        if (i != 0) {
        	$("#car_fixed_multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="car_fixed_slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        	utils.match_row_height("#multi_slider_table", ".slider_target");
        } else {
    	    $("#car_fixed_multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="car_fixed_slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        	utils.match_row_height("#multi_slider_table", ".slider_target");	
        }

      }
      this.init_sliders(this.sentence_types);
      exp.sliderPost = [];
    },
    button : function() {
      if (exp.sliderPost.length < this.n_sliders - 1) {
        $(".err").show();
      } else {
      	this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },
    init_sliders : function(sentence_types) {
      for (var i=0; i<this.n_sliders; i++) {
      	if (i != 0) {
        	var sentence_type = sentence_types[i];
        	utils.make_slider("#car_fixed_slider" + i, this.make_slider_callback(i));      		
      	} else {
        	var sentence_type = sentence_types[i];
          var fix_value = 0.25;
        	utils.make_fixed_slider("#car_fixed_slider" + i, this.make_slider_callback(i), fix_value);
          $("#car_fixed_slider0").slider("disable");    		
      	}
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value * 1000;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "trial_type" : "car_fixed_multi_slider",
          "sentence_type" : sentence_type,
          "response" : exp.sliderPost[i]
        });
      }
    },
  });


  slides.movie_fixed_multi_slider = slide({
    name : "movie_fixed_multi_slider",
    present : [{"property":"Movies"},],
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //FRED: allows you to access stim in helpers
      $('#movie_fixed_ms_instruction').text("Out of the 1000 movies released in 2013, 120 made between $1,000,000 and $10,000,000. How much do you think the other movies made?"); //FRED
      this.sentence_types = ["1", "10", "50", "100", "500", "500+"];
      var sentences = {
        "1": "Less than $1,000,000",
        "10": "Between $1,000,000 and $10,000,000",
        "50": "Between $10,000,000 and $50,000,000",
        "100": "Between $50,000,000 and $100,000,000",
        "500": "Between $100,000,000 and $500,000,000",
        "500+": "More than $500,000,000",
      };
      this.n_sliders = 6;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        if (i != 1) {
          $("#movie_fixed_multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="movie_fixed_slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
          utils.match_row_height("#multi_slider_table", ".slider_target");
        } else {
          $("#movie_fixed_multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="movie_fixed_slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
          utils.match_row_height("#multi_slider_table", ".slider_target");  
        }

      }
      this.init_sliders(this.sentence_types);
      exp.sliderPost = [];
    },
    button : function() {
      if (exp.sliderPost.length < this.n_sliders - 1) {
        $(".err").show();
      } else {
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },
    init_sliders : function(sentence_types) {
      for (var i=0; i<this.n_sliders; i++) {
        if (i != 1) {
          var sentence_type = sentence_types[i];
          utils.make_slider("#movie_fixed_slider" + i, this.make_slider_callback(i));         
        } else {
          var sentence_type = sentence_types[i];
          var fix_value = 0.12;
          utils.make_fixed_slider("#movie_fixed_slider" + i, this.make_slider_callback(i), fix_value);
          $("#movie_fixed_slider1").slider("disable");        
        }
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value * 1000;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "trial_type" : "movie_fixed_multi_slider",
          "sentence_type" : sentence_type,
          "response" : exp.sliderPost[i]
        });
      }
    },
  });


  slides.age_fixed_multi_slider = slide({
    name : "age_fixed_multi_slider",
    present : [{"property":"Movies"},],
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //FRED: allows you to access stim in helpers
      $('#age_fixed_ms_instruction').text("If I told you that 22 out of a 100 people live to be between 70 and 80 years old, how old do you think the rest of the 100 people would live to be?"); //FRED
      this.sentence_types = ["20", "30", "40", "50", "60", "70", "80", "90"];
      var sentences = {
        "20": "Less than 20 years old",
        "30": "Between 20 and 30 years old",
        "40": "Between 30 and 40 years old",
        "50": "Between 40 and 50 years old",
        "60": "Between 50 and 60 years old",
        "70": "Between 60 and 70 years old",
        "80": "Between 70 and 80 years old",
        "90": "Above 80 years old",
      };
      this.n_sliders = 8;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        if (i != 6) {
          $("#age_fixed_multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="age_fixed_slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
          utils.match_row_height("#multi_slider_table", ".slider_target");
        } else {
          $("#age_fixed_multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="age_fixed_slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
          utils.match_row_height("#multi_slider_table", ".slider_target");  
        }

      }
      this.init_sliders(this.sentence_types);
      exp.sliderPost = [];
    },
    button : function() {
      if (exp.sliderPost.length < this.n_sliders - 1) {
        $(".err").show();
      } else {
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },
    init_sliders : function(sentence_types) {
      for (var i=0; i<this.n_sliders; i++) {
        if (i != 6) {
          var sentence_type = sentence_types[i];
          utils.make_slider("#age_fixed_slider" + i, this.make_slider_callback(i));         
        } else {
          var sentence_type = sentence_types[i];
          var fix_value = 0.21;
          utils.make_fixed_slider("#age_fixed_slider" + i, this.make_slider_callback(i), fix_value);
          $("#age_fixed_slider6").slider("disable");        
        }
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value * 100;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "trial_type" : "age_fixed_multi_slider",
          "sentence_type" : sentence_type,
          "response" : exp.sliderPost[i]
        });
      }
    },
  });



  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  block1 = _.shuffle(["first_single_slide", "second_single_slide", "third_single_slide"]);
  block2 = _.shuffle(["car_multi_slider", "movie_multi_slider", "age_multi_slider"]);
  block3 = _.shuffle(["car_fixed_multi_slider", "movie_fixed_multi_slider", "age_fixed_multi_slider"]);

  //exp.structure=["i0", "instructions", "familiarization", "first_single_slide", "second_single_slide", "third_single_slide", 'car_multi_slider', 'movie_multi_slider', 'age_multi_slider', 'car_fixed_multi_slider', 'subj_info', 'thanks'];
  pre = ["i0", "instructions"];
  post = ['subj_info', 'thanks'];
  exp.structure = pre.concat(block1).concat(block2).concat(block3).concat(post);
  //exp.structure=['car_fixed_multi_slider', 'subj_info', 'thanks'];
  
  //exp.structure=firstBlock;
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}