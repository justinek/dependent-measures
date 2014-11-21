
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
      $('#ss_instruction2').text("On the same planet, there is a " + rand + "% chance that an alien baby has green eyes. If 100 babies are born, approximately how many will have green eyes?" ); //FRED
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
      $('#ss_instruction3').text("Very few aliens on this planet are born without horns. If there is a " + rand + "% chance that an alien has horns, approximately how many out of a 100 aliens will have horns?" ); //FRED
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

  slides.multi_slider = slide({
    name : "multi_slider",
    present : _.shuffle([
      {"property":"Red"},
      // {"property":"Blue"},
      // {"property":"White"},
      // {"property":"Yellow"},
    ]),
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //FRED: allows you to access stim in helpers
      $('#ms_instruction').text("Suppose you are sitting on a bridge overlooking a freeway. If you see one thousand cars drive by, what colors do you think they will be. Use these sliders to tell us what you think."); //FRED
      this.sentence_types = _.shuffle(["Red", "Blue", "White", "Yellow"]);
      var sentences = {
        "White": "How many white cars did you see?",
        "Blue": "How many blue cars did you see?",
        "Yellow": "How many yellow cars did you see?",
        "Red": "How many red cars did you see?",
      };
      this.n_sliders = 4;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
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
      for (var i=0; i<4; i++) {
        var sentence_type = sentence_types[i];
        utils.make_slider("#slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
    },
    log_responses : function() {
      for (var i=0; i<4; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "trial_type" : "multi_slider",
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
  exp.structure=["i0", "instructions", "familiarization", 'first_single_slide', 'second_single_slide', 'third_single_slide', 'multi_slider', 'subj_info', 'thanks'];
  
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