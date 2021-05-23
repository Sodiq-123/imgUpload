$(function(){
    $('#post-comment').hide();
    $('#btn-comment').on('click', function(event) {
        event.preventDefault();

        $('#post-comment').slideDown();
    });


    // $('#btn-like').on('click', function(event) {
    //     event.preventDefault();

    //     var imgId = $(this).data('id');
    //     $.post('/images/like/'+ imgId, function(data) {
    //         $('.likes-count').text(data.likes);
    //     });
    // });

    $('#btn-like').on('click', function(event) {
        event.preventDefault();
        
        var imgId = $(this).data('id');
        // console.log(imgId);  
        $.ajax({
            url: "/images/like/"+imgId,
            method: "POST",
            data: {image_id: imgId}
        }).done(function(data) {
            $('.likes-count').text(data.likes);
        });
    });
    $('#btn-delete').click(function (e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Are you sure you want to delete this image?');
    if (response) {
      let imgId = $(this).data('id');
      $.ajax({
        url: '/images/' + imgId,
        type: 'DELETE'
      })
        .done(function(result) {
          $this.removeClass('btn-danger').addClass('btn-success');
          $this.find('i').removeClass('fa-times').addClass('fa-check');
          $this.append('<span>Deleted!</span>');
        });
    }
  });
});