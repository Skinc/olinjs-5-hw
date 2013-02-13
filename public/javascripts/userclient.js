$(function(){
    $("#submit").click( function (evt) {
        console.log($("#input")[0].value)
        $("#body").css("background-color", "#"+$("#input")[0].value    )
        $.post("/newcolor", {"input":"#"+$("#input")[0].value})    
        $("#input")[0].value = ""
    })
})