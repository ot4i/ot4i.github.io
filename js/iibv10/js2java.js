
   /*
      Global variable to store tutorial JSON objects.
    */

   var tutorials = [];

   function viewDetails(selectName) {

       //var selectBox = document.getElementById("styledSelect");
		var selectBox = document.getElementById(selectName);   
		//alert ("Select found. Size:" + selectBox.options.length);  
       var tutUrl = null;

        if (tutorials !== undefined) {
            tutUrl = tutorials[selectBox.selectedIndex].detailsURL;
        }//if       

      var result = null;
      try {
           result = javaViewDetailsFunction(tutUrl);
      }//try
      catch(e){
          alert( 'a java error occurred: ' + e.message );
      }//catch
   };

   function startTutorial(selectName) 
   {
       //var selectBox = document.getElementById("styledSelect");
		//alert ("Inside changeFunc:" + "" + selectName);   
		var selectBox = document.getElementById(selectName);   
		//alert ("Select found. Size:" + selectBox.options.length);  

       var tutUrl = null;

        if (tutorials !== undefined) {
            tutUrl = tutorials[selectBox.selectedIndex].stepsURL;
        }//if       


      var result = null;
      try 
      {
        result = javaOpenTutorialStepsFunction(tutUrl);

      }//try
      catch(e){
          alert( 'a java error occurred: ' + e.message );
      }//catch
   };

   function startTutorialFromDetailsScreen() {
      var result = null;
      var tut = null;
      try {            
           result = javaGetSelectedTutorialFunction();
           
           var tutInfoString = result[0];
           tut           = JSON.parse( tutInfoString );

      }//try
      catch(e){
          alert( 'a java error occurred: ' + e.message );
      }//catch

      var tutUrl = null;
      if (tut !== undefined)
        tutUrl = tut.stepsURL;

      try {

           result = javaOpenTutorialStepsFunction(tutUrl);

      }//try
      catch(e){
          alert( 'a java error occurred: ' + e.message );
      }//catch
   };

   function changeFunc(selectName) 
   {
    //var selectBox = document.getElementById("styledSelect");
	//alert ("Inside changeFunc:" + "" + selectName);   
	var selectBox = document.getElementById(selectName);   
	//alert ("Select found. Size:" + selectBox.options.length);   
    var tutDesc = document.getElementById("tutorialDesc");

    var selected = new Array();
     for (var i = 0; i < selectBox.options.length; i++){
        if (selectBox.options[ i ].selected){
         selected.push(selectBox.options[ i ].value);
        };
     };

     var tutorialID = "";

     if ( selected.length === 0 )
     {
         tutDesc.innerHTML = "Please select a tutorial :)";
         document.getElementById("viewDetails").disabled = true; 
         document.getElementById("startTutorial").disabled = true; 
     }
     else if ( selected.length > 1 ) 
     {
         tutDesc.innerHTML = "Please select ONE tutorial :)";
         document.getElementById("viewDetails").disabled = true; 
         document.getElementById("startTutorial").disabled = true; 
     }
     else 
     {
         document.getElementById("viewDetails").disabled = false; 
         document.getElementById("startTutorial").disabled = false; 

        if (tutorials !== undefined) 
        {
            tutDesc.innerHTML = tutorials[selectBox.selectedIndex].shortDesc;
        }//if       

        tutorialName  = tutorials[selectBox.selectedIndex].name;
        //alert ("Selected tutorial name :" + tutorialName);   
     }

      //
      // sets the global selected tutorial value to something or null
      //
      var result = null;
      try 
      {          
        result = javaSetSelectedTutorialFunction( tutorialName );
      }//try
      catch(e)
      {
        alert( 'a java error occurred: ' + e.message );
      }//catch    
   };

   function backToGallery() 
   {
      var result = null;

      try 
      {
           result = javaBackToGalleryFunction();
      }//try
      catch(e)
      {
          alert( 'a java error occurred: ' + e.message );
      }//catch

   };

   function fillList() 
   {
      var result = null;
      //alert("Inside fillList()");
      try {
           result = javaGetTutorialsInfoFunction();

       if (result !== undefined){
          for (var i = 0; i < result.length; i++){
             var tutInfoString = result[i];
             //alert(tutInfoString);
             var tut = null;
                 tut = JSON.parse( tutInfoString );
                 tutorials.push(tut);  
          }//for 
       }//if 
      }//try
      catch(e){
          alert( 'a java error occurred: ' + e.message );
      }//catch
	  //add the tutorials to the select widget.
	  //For now we will use predefined tags scenarios and capabilities to distribute    
	  //capabilities
      var selectBoxc = document.getElementById("styledSelect_capabilities");
      if (selectBoxc )
      {
	        var k=1;
	        for (var j = 0; j < tutorials.length; j++)
	        {
	        	if (tutorials[j].tags.indexOf("capabilities") > -1)
	        	{
	        		//alert("Adding the capabilities tutorial:" + tutorials[j].name);
	        		selectBoxc.options[selectBoxc.options.length] =new Option(tutorials[j].name, k);
	        	}
	          k = k + 1;
	        }//for
      }//if
            
	  //scenarios    
	  var selectBoxs = document.getElementById("styledSelect_scenarios");
	  if (selectBoxs )
	  {
		    var k=1;
		    for (var j = 0; j < tutorials.length; j++)
		    {
		    	if (tutorials[j].tags.indexOf("scenarios") > -1)
	        	{
			    	//alert("Adding the capabilities tutorial:" + tutorials[j].name);
			    	selectBoxs.options[selectBoxs.options.length] =new Option(tutorials[j].name, k);
	        	}
			    k = k + 1;
		    }//for
	  }//if
  
};