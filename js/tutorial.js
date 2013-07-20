$(function(){
  window.currentPage = 0;
  window.lastPage = false;
  
  function styleButtons(){
    $.each($(".navbut"), function(){
      $(this).removeClass("active");
    });
    if(currentPage > 0){
      $("#prev").addClass('active');
    }
    if(!window.lastPage){
      $("#next").addClass('active');
    }
  }

  function loadPage(n){
    $.ajax({
      url: "pages/"+n+".html",
      dataType: "html",
      success:function(data, stat, req){
        window.lastPage = false;
        $("#tutorial").html(data);
        window.currentPage = n;
        prettifyCode();
        styleButtons();
      },
      error:function(req, stat, err){
        console.log(req, stat, err);
        $("#tutorial").html('<p class="error">Failed to load the tutorial.</p>');
      }
    });
  }

  loadPage(window.currentPage);
  
  function nextPage(){
    var np = window.currentPage+1;
    console.log("next page. "+window.currentPage+"->"+np);
    loadPage(window.currentPage + 1);
  }


  function prevPage(){
    var pp = window.currentPage -1; 
    console.log("prev page. "+window.currentPage+"->"+pp); 
    loadPage(window.currentPage - 1);
  }
  
  $("#next").click(function(){
    if($("#next").hasClass('active')){
      nextPage();
    }
  });

  $("#prev").click(function(){
    if($("#prev").hasClass('active')){
      prevPage();
    }
  });

     function heightUpdateFunction(elem, editor) {
        var newHeight =
                  editor.getSession().getScreenLength()
                  * (editor.renderer.lineHeight+2)
                  + editor.renderer.scrollBar.getWidth();
        $(elem).height(newHeight.toString() + "px");
        editor.resize();
    };

    // Set initial size to match initial content
  /* Prettifies the any code class inside the tutorial by wrapping it in an ace editor*/
  function prettifyCode(){
    $.each( $("#tutorial").find(".code"), function(){
      var myeditor = ace.edit(this);
      myeditor.setTheme("ace/theme/clouds_midnight");
      myeditor.setHighlightActiveLine(false);
      myeditor.setReadOnly(true);
      myeditor.renderer.setShowGutter(false);
      myeditor.getSession().setMode("ace/mode/clojure");
      myeditor.getSession().setTabSize(2);
      myeditor.getSession().setUseSoftTabs(true);
      this.style.fontSize='16px';
      heightUpdateFunction(this, myeditor);
      
    });
  }

});
