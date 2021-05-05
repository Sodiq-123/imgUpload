$(function(){
    $('#post-comment').hide();
    $('#btn-comment').on('click', function(event) {
        event.preventDefault();

        $('#post-comment').slideDown();
    });

    $('#btn-like').on('click', function(event) {
        event.preventDefault();
        
        var imgId = $(this).data('id');
        // console.log(imgId);  
        $.ajax({
            url: "/images/like/",
            method: "GET",
            data: {image_id: imgId}
        }).done(function(data) {
            $('.likes-count').text(data.likes);
        });
    });
});