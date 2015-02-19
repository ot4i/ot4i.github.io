
   /*
      Global variable to store tutorial JSON objects.
    */

   var tutorials = [];

   function viewDetails(selectName) {

	   alert ("Inside viewDetails:" + "" + selectName);   
	   var selectBox = document.getElementById(selectName);   

       var tutUrl = "";

		alert ("Selected index: " + selectBox.selectedIndex);
       if (tutorials !== undefined && selectBox.selectedIndex != -1) {
       	alert ("selected tutorial value " + selectBox.options[selectBox.selectedIndex].value);
 	        tutUrl = tutorials[ selectBox.options[selectBox.selectedIndex].value ].detailsURL;
 	        alert (tutUrl)
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
		alert ("Inside startTutorial:" + "" + selectName);   
		var selectBox = document.getElementById(selectName);   
		//alert ("Select found. Size:" + selectBox.options.length);  

       	var tutUrl = "";
		alert ("Selected index: " + selectBox.selectedIndex);

        if (tutorials !== undefined && selectBox.selectedIndex != -1) {
        	alert ("selected tutorial value " + selectBox.options[selectBox.selectedIndex].value);
  	        tutUrl = tutorials[ selectBox.options[selectBox.selectedIndex].value ].stepsURL;
  	        alert (tutUrl)
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

   function resetSelection(selectName) 
   {
	   alert ("Inside resetSelection:" + "" + selectName);  
	   //reset selection
	   try{
		   //passing the empty name should reset the selection
		   result = javaSetSelectedTutorialFunction("");
		   //reset the description text
		   var tutDesc = document.getElementById("tutorialDesc_" +  selectName);
		   alert(result[0] + "   " + result[1]);
		   tutDesc.innerHTML = result[1];
	   }//try
	   catch(e)
	   {
		   alert( 'a java error in javaSetSelectedTutorialFunction occurred: ' + e.message );
	   }//catch   
   };
   
   function changeFunc(selectName) 
   {
	   alert ("Inside changeFunc:" + "" + selectName);  

	   //get the appropriate select 
	   var selectBox = document.getElementById(selectName);   
	   
	   //find the appropriate tutorial desc
	   var tutDesc = document.getElementById("tutorialDesc_" +  selectName);

	   //find the tutorial value
	   var tutorialSelectValue  = "";
	   for (var i = 0; i < selectBox.options.length; i++){
		   if (selectBox.options[ i ].selected){
			   tutorialSelectValue = electBox.options[ i ].value;
	       }
	   }
	 	
	 	alert ("tutorialSelectValue :" + tutorialSelectValue);
	   //set the tutorial description
	   if (tutorials !== undefined) 
	   {
	   		alert ("shortDesc :" + tutorials[tutorialSelectValue].shortDesc);
		   tutDesc.innerHTML = tutorials[tutorialSelectValue].shortDesc;
	   }     
		
	   //
	   // sets the global selected tutorial value to something or null
	   //
	   var result = null;
	   try 
	   {          
		   alert ("Calling a java function javaSetSelectedTutorialFunction with :" + tutorials[tutorialSelectValue].name);
		   result = javaSetSelectedTutorialFunction( tutorials[tutorialSelectValue].name );
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