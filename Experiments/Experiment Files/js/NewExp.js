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

  slides.first_slide = slide({
    name : "first_slide",
    start : function() {
      $(".err").hide();
      this.init_sliders();
      exp.sliderPost = null;
    },
    button : function() {
      if (exp.sliderPost != null) {
        exp.go(); //use exp.go() if and only if there is no "present" data.
        this.log_responses();
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#slider1", function(event, ui) {
        exp.sliderPost = ui.value * 100;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "first_slide",
        "response" : exp.sliderPost
      });
    }
  });

  slides.second_slide = slide({
    name : "second_slide",
    start : function() {
      $(".err").hide();
      this.init_sliders();
      exp.sliderPost = null;
    },
    button : function() {
      if (exp.sliderPost != null) {
        exp.go(); //use exp.go() if and only if there is no "present" data.
        this.log_responses();
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#slider2", function(event, ui) {
        exp.sliderPost = ui.value * 100;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "second_slide",
        "response" : exp.sliderPost
      });
    }
  });

  slides.third_slide = slide({
    name : "third_slide",
    start : function() {
      $(".err").hide();
      this.init_sliders();
      exp.sliderPost = null;
    },
    button : function() {
      if (exp.sliderPost != null) {
        exp.go(); //use exp.go() if and only if there is no "present" data.
        this.log_responses();
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#slider3", function(event, ui) {
        exp.sliderPost = ui.value * 1000;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "third_slide",
        "response" : exp.sliderPost
      });
    }
  });  

  slides.fourth_slide = slide({
    name : "fourth_slide",
    start : function() {
      $(".err").hide();
      this.init_sliders();
      exp.sliderPost = null;
    },
    button : function() {
      if (exp.sliderPost != null) {
        exp.go(); //use exp.go() if and only if there is no "present" data.
        this.log_responses();
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#slider4", function(event, ui) {
        exp.sliderPost = ui.value * 1000;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "fourth_slide",
        "response" : exp.sliderPost
      });
    }
  }); 

    slides.fifth_slide = slide({
    name : "fifth_slide",
    start : function() {
      $(".err").hide();
      this.init_sliders();
      exp.sliderPost = null;
    },
    button : function() {
      if (exp.sliderPost != null) {
        exp.go(); //use exp.go() if and only if there is no "present" data.
        this.log_responses();
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#slider5", function(event, ui) {
        exp.sliderPost = ui.value * 1000;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "fifth_slide",
        "response" : exp.sliderPost
      });
    }
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
  exp.structure=["i0", "instructions", "familiarization", 'first_slide', 'second_slide', 'third_slide',  'fourth_slide', 'fifth_slide', 'subj_info', 'thanks'];
  
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