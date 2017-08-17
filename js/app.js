$( document ).ready(function() {
    $('#profile').hide();
    $('#posts').hide();
    $('#mainContent').hide();

    var myFacebookToken = prompt("Enter your access token");
    if (myFacebookToken != null) {
         $("#mainContent").show("fast");
    }
    else 
    {
        alert("Access token not entered ");
    }

    console.log(myFacebookToken);
    var myEducationArr;
    var myFamilyArr;
    var myPostArr;
    var count1=0;
    var count2=0;
    var count3=0;
    function getFacebookInfo(){
            $.ajax('https://graph.facebook.com/me?fields=id,name,education,work,hometown,location,birthday,family,email,relationship_status,gender,first_name,last_name,interested_in&&access_token='+myFacebookToken,{
            success : function(response){
                    console.log(response);
                    $("#myEmail").text(response.email);
                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
                    $("#myName").text(response.first_name);
                    $("#myFullName").text(response.name);
                    $("#myGender").text(response.gender);
                    $("#relStatus").text(response.relationship_status);
                    $("#myBirthday").text(response.birthday);
                    $("#myInterest").text(response.interested_in);
                    $("#myHometown").text(response.hometown.name);
                    $("#myCurrentCity").text(response.location.name);
                    myEducationArr=response.education;
                    while(count1<=1)
                    {
                        for(var i in myEducationArr)
                        {
                            $("#myEducation").append(response.education[i].school.name+"<br>");
                            count1++;

                        }
                    }
                    myFamilyArr=response.family.data;
                    while(count2<=1)
                    {
                        for (var j in myFamilyArr)
                        {
                
                            $("#myFamilyName").append("name: "+response.family.data[j].name+"<br>");
                            $("#myFamilyRelationship").append("relationship: "+response.family.data[j].relationship+"<br>");
                            
                            count2++;
                        }

                    }
                    //for handling blank fields
                    if(response.first_name==null || response.first_name==undefined)
                    {
                        $("#myName").text("-");
                    }

                    if(response.interested_in==null || response.interested_in==undefined)
                    {
                        $("#myInterest").text("-");
                    }
                     if(response.gender==null || response.gender==undefined)
                    {
                        $("#myGender").text("-");
                    }
                     if(response.relationship_status==null || response.relationship_status==undefined)
                    {
                        $("#relStatus").text("-");
                    }
                    if(response.hometown.name==null || response.hometown.name==undefined)
                    {
                        $("#myHometown").text("-");
                    }
                    if(response.location.name==null || response.location.name==undefined)
                    {
                        $("#myCurrentCity").text("-");
                    }
                    if(myEducationArr==null || myEducationArr==undefined)
                    {
                        $("#myEducation").text("-");
                    }
                    if(myFamilyArr==null || myFamilyArr==undefined)
                    {
                        $("#myFamily").text("-");
                    }

                },

                error : function(request,errorType,errorMessage){
                    console.log(request);
                    console.log(errorType);
                    console.log(errorMessage);
                    alert("response not loaded");
                }


            }//end argument list 
);// end ajax call 
 $('#profile').show();

    }// end get facebook info
 function getFacebookPosts(){

        
        $.ajax('https://graph.facebook.com/me?fields=posts&&access_token='+myFacebookToken,{

                success : function(response){
                    myPostArr=response.posts.data;
                    while(count3<=1)
                   {     
                        for(var k in myPostArr)
                        {   if(response.posts.data[k].story!==null && response.posts.data[k].story!==undefined && response.posts.data[k].created_time!==null && response.posts.data[k].created_time!==undefined )
                            {    
                                $("#myPostName").append(response.posts.data[k].story+" on "+response.posts.data[k].created_time+"<br>");
                            }
                            count3++;
                        }
                    }

                    if(myPostArr===null || myPostArr===undefined)
                    {
                        $("#myPostName").text("No posts yet!");
                    }

                },

                error : function(request,errorType,errorMessage){
                    console.log(request);
                    console.log(errorType);
                    console.log(errorMessage);
                    alert("response not loaded");
                }


            }//end argument list 
);// end ajax call 

$('#posts').show();
}// end getfacebookposts
    $("#profileBtn").on('click',getFacebookInfo);
    $("#postBtn").on('click',getFacebookPosts);
});

