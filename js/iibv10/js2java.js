
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
        	for (var i = 0; i < tutorials.length; i++){
        		if (tutorials[ i ].name == selectBox.options[ i ].value){
        			tutUrl = tutorials[ i ].detailsURL;
        	        break;
        	    }
        	}
        }//if       

      var result = null;
      try {
           result = javaViewDetailsFunction(tutUrl);
      }//try
      catch(e){
          alert( 'a java error in javaViewDetailsFunction occurred: ' + e.message );
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
      	  for (var i = 0; i < tutorials.length; i++){
  	        if (tutorials[ i ].name == selectBox.options[ i ].value){
  	        	tutUrl = tutorials[ i ].stepsURL;
  	            break;
  	        }
      	  }
        }//if       


      var result = null;
      try 
      {
        result = javaOpenTutorialStepsFunction(tutUrl);

      }//try
      catch(e){
          alert( 'a java error in javaOpenTutorialStepsFunction occurred: ' + e.message );
      }//catch
   };

   function startTutorialFromDetailsScreen() {
      var result = null;
      var tut = null;
      try {            
           result = javaGetSelectedTutorialFunction();
           
           var tutInfoString = result[0];
           tut = JSON.parse( tutInfoString );

      }//try
      catch(e){
          alert( 'a java error in javaGetSelectedTutorialFunction occurred: ' + e.message );
      }//catch

      var tutUrl = null;
      if (tut !== undefined)
        tutUrl = tut.stepsURL;

      try {

           result = javaOpenTutorialStepsFunction(tutUrl);

      }//try
      catch(e){
          alert( 'a java error in startTutorialFromDetailsScreen occurred: ' + e.message );
      }//catch
   };

   function changeFunc(selectName) 
   {
    //var selectBox = document.getElementById("styledSelect");
	alert ("Inside changeFunc:" + "" + selectName);   
	var selectBox = document.getElementById(selectName);   
	//alert ("Select found. Size:" + selectBox.options.length);   
    var tutDesc = document.getElementById("tutorialDesc");

    var selected = new Array();
     for (var i = 0; i < selectBox.options.length; i++){
        if (selectBox.options[ i ].selected){
         selected.push(selectBox.options[ i ].value);
        };
     };
     alert(selected[0]);

     if ( selected.length > 1 ) 
     {
     	//TODO Enable for translation
         tutDesc.innerHTML = "Please select only one tutorial...";
         document.getElementById("viewDetails").disabled = true; 
         document.getElementById("startTutorial").disabled = true; 
     }
     else 
     {
         document.getElementById("viewDetails").disabled = false; 
         document.getElementById("startTutorial").disabled = false; 

         
         tutorialName  = selected[0]; 
         if (tutorials !== undefined) 
         {
        	  for (var i = 0; i < tutorials.length; i++){
        	        if (tutorials[ i ].name == tutorialName){
        	            tutDesc.innerHTML = tutorials[i].shortDesc;
        	            break;
        	        }
        	  }
        }//if       

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
        alert( 'a java error in javaSetSelectedTutorialFunction occurred: ' + e.message );
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
          alert( 'a java error in javaBackToGalleryFunction occurred: ' + e.message );
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
             var tut = JSON.parse( tutInfoString );
             tutorials.push(tut);  
          }//for 
       }//if 
      }//try
      catch(e){
          alert( 'a java error in javaGetTutorialsInfoFunction occurred: ' + e.message );
      }//catch
	  //add the tutorials to the select widget.
	  var Ids = ["styledSelect_Tool_Capabilities", "styledSelect_Scenarios"];
	  for (var i=0; i<Ids.length; i++)
	  {
		  alert(Ids[i]);
	      var selectBoxc = document.getElementById(Ids[i]);
	      if (selectBoxc )
	      {
		        var k=1;
		        for (var j = 0; j < tutorials.length; j++)
		        {
		        	var catNameToken = tutorials[j].categoryName.replace(" ", "_");
		        	if (Ids[i].indexOf(catNameToken) > -1)
		        	{
		        		selectBoxc.options[selectBoxc.options.length] =new Option(tutorials[j].name, k);
		        	}
		          k = k + 1;
		        }//for
	      }//if
	  }
};