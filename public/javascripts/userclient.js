$(function(){
    $("#submit").click( function (evt) {
        console.log($("#input")[0].value)
        $("#body").css("background-color", "#"+$("#input")[0].value    )
        $.post("/newcolor", {"input":"#"+$("#input")[0].value})    
        $("#input")[0].value = ""
    })


    $("#login").click( function (evt) {
        window.location.href = "/login";
    })


    $("#logout").click( function (evt) {
        window.location.href = "/logout";
    })

   $('.commentForm').submit(function(){
        var userid = $(this).attr("id")
        var comment = $("#"+userid+"1").val()
        var url = $(this).attr("value")
        $("#"+userid+"1")[0].value = ""
        $.post("/newcomment", {"id":userid, "url":url, "comment":comment})
        return false
        
   })   
})