function opensearchinput(){
    document.getElementById("search-bar").classList.toggle("hide");
    };
$(function(){
	$(function(){
            $(document).ready(function(){


  $('._1').click(function(){
  	$('.all-project-1').show();
    $('.all-project-2').hide();
    $('.all-project-3').hide();
 
  
      return false;
    });
    
      $('._2').click(function(){
    $('.all-project-1').hide();
    $('.all-project-2').show();
    $('.all-project-3').hide();
 
  
      return false;
    });
    
      $('._3').click(function(){
    $('.all-project-1').hide();
    $('.all-project-2').hide();
    $('.all-project-3').show();
 
  
      return false;
    });
    
  // $('.en').click(function(){
  //   $('.body-container').show();
  //    $('.body-container-2').hide();
  //   $('.box1-ar').hide();
  //   $('.end-box').show();
  //   $('.box1-en').show();
  //   $('.end-box1').hide();

  //   return false;
  // });
  });
});

});

(function ($) {
    $('.option-content-box').on('click', function () {
        $('#option-'+$(this).data('id')+'-'+$(this).data('key')).prop('checked', true);
        var optionprice = $(this).data('price');
        $('.all-radio-options').addClass('updated');
        $(this).parent().parent().parent().find('span.option-content-box').removeClass('active');
        $(this).addClass("active");
        get_total_price();
        setTimeout(function () {$('.all-radio-options').removeClass('updated');}, 500);
    });
    
    
    $('.product_quantity').on('change', function(){
        get_total_price();
    });
    $('.btn-qty-add, .btn-qty-sub').on('click', function(){
        setTimeout(function () {
            get_total_price();
        }, 500);
    });
        
        
    function get_total_price()
    {
        var total_price = 0;
        $('.radio-type-button').each(function(){
            if($(this).find('input').data('id') != '45')
            {
                var radio_checked = $(this).find('input:checked');
                var option_val = radio_checked.data('price');
                if(option_val > 0){total_price += Number(option_val);}
            }
        });
        $('.print-topage-price').html(total_price.toFixed(2));
        get_total_Copy_price();
        
    }
    
    
    function get_total_Copy_price()
    {
        var quantity = Number($('.product_quantity').val());
        var pages_number = Number($('#pages_number_count').val());
        var gt_price = Number(Number($('.print-topage-price').html()) * pages_number) * Number($('#quantity').val());
        var gkey = $('.radio-option-45 input:checked').data('key');
        var gprice = Number($('.radio-option-45 input:checked').data('price')) * Number($('#quantity').val());
        

        if(gkey == '2')
        {
            
            if(pages_number)
            {
                var gt_price_last = Number(gt_price) + Number(gprice);
            }
            else
            {
                var gt_price_last = gt_price;
            }
        }
        else if(gkey == '3')
        {
            if(pages_number)
            {
                var gt_price_last = Number(gt_price) + Number(gprice);
            }
            else
            {
                var gt_price_last = gt_price;
            }
        }
        else if(gkey == '4')
        {
            if(pages_number)
            {
                var gt_price_last = Number(gt_price) + Number(gprice);
            }
            else
            {
                var gt_price_last = gt_price;
            }
        }
        else
        {
            var gt_price_last = gt_price;
        }
        
        $('#price_total').html(gt_price_last.toFixed(2));
    }
    
    
    $('#fileupload').on('change', function(){
        $('.progress').fadeIn();
        var file_data = $('#fileupload').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total) * 100;
                        $('.progress-bar').text(percentComplete.toFixed(2) + '%');
                        $('.progress-bar').css('width', percentComplete.toFixed(2) + '%');
                    }
            }, false);
            return xhr;
            },

            beforeSend:function(){},
            success: function(data){
                if(data.status)
                {
                    $('#file_url').val('href', data.url);
                    $('#file_data .file-name a').attr('href', data.url);
                    $('#file_data .file-name a').html(data.file);
                    $('#pages_count').val(data.pages);
                    $('#pages_number_count').val(data.countpages);
                    get_total_Copy_price();
                    $('.form_price_total').show();
                    $('#file_data .file-pages').html(data.pages);
                    $('.select-fileupload span').html('<i class="fas fa-check"></i> تم رفع الملف بنجاح');
                    $('.progress').fadeOut();
                    $('.progress-bar').text('0%');
                    $('.progress-bar').css('width','0%');
                }
            }
         });
    });
})(jQuery);

(function ($) {
    $('.option-content-box').on('click', function () {
        $('#option-'+$(this).data('id')+'-'+$(this).data('key')).prop('checked', true);
        var optionprice = $(this).data('price');
        $('.all-radio-options').addClass('updated');
        $(this).parent().parent().parent().find('span.option-content-box').removeClass('active');
        $(this).addClass("active");
        get_total_price();
        setTimeout(function () {$('.all-radio-options').removeClass('updated');}, 500);
    });
    
    
    $('.product_quantity').on('change', function(){
        get_total_price();
    });


    $('.btn-qty-add, .btn-qty-sub').on('click', function(){
        setTimeout(function () {
            get_total_price();
            // console.log( get_total_price());
        }, 500);
    });
        
        
    function get_total_price()
    {
        var total_price = 0;
        $('.radio-type-button').each(function(){
            if($(this).find('input').data('id') != '45')
            {
                var radio_checked = $(this).find('input:checked');
                var option_val = radio_checked.data('price');
                if(option_val > 0){total_price += Number(option_val);}
            }
        });
        $('.print-topage-price').html(total_price.toFixed(2));
        get_total_Copy_price();
        
    }
    
    
    function get_total_Copy_price()
    {
        var quantity = Number($('.product_quantity').val());
        var pages_number = Number($('#pages_number_count').val());
        var gt_price = Number(Number($('.print-topage-price').html()) * pages_number) * Number($('#quantity').val());
        var gkey = $('.radio-option-45 input:checked').data('key');
        var gprice = Number($('.radio-option-45 input:checked').data('price')) * Number($('#quantity').val());
        

        if(gkey == '2')
        {
            
            if(pages_number)
            {
                var gt_price_last = Number(gt_price) + Number(gprice);
            }
            else
            {
                var gt_price_last = gt_price;
            }
        }
        else if(gkey == '3')
        {
            if(pages_number)
            {
                var gt_price_last = Number(gt_price) + Number(gprice);
            }
            else
            {
                var gt_price_last = gt_price;
            }
        }
        else if(gkey == '4')
        {
            if(pages_number)
            {
                var gt_price_last = Number(gt_price) + Number(gprice);
            }
            else
            {
                var gt_price_last = gt_price;
            }
        }
        else
        {
            var gt_price_last = gt_price;
        }
        
        $('#price_total').html(gt_price_last.toFixed(2));
    }
    
    
    $('#fileupload').on('change', function(){
        $('.progress').fadeIn();
        var file_data = $('#fileupload').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total) * 100;
                        $('.progress-bar').text(percentComplete.toFixed(2) + '%');
                        $('.progress-bar').css('width', percentComplete.toFixed(2) + '%');
                    }
            }, false);
            return xhr;
            },

            beforeSend:function(){},
            success: function(data){
                if(data.status)
                {
                    $('#file_url').val('href', data.url);
                    $('#file_data .file-name a').attr('href', data.url);
                    $('#file_data .file-name a').html(data.file);
                    $('#pages_count').val(data.pages);
                    $('#pages_number_count').val(data.countpages);
                    get_total_Copy_price();
                    $('.form_price_total').show();
                    $('#file_data .file-pages').html(data.pages);
                    $('.select-fileupload span').html('<i class="fas fa-check"></i> تم رفع الملف بنجاح');
                    $('.progress').fadeOut();
                    $('.progress-bar').text('0%');
                    $('.progress-bar').css('width','0%');
                }
            }
         });
    });
})(jQuery);

   
       
   
       


