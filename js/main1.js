
function close_thebox_modal(){
	"use strict";
	if ($('.thebox-window').length){
		jQuery('.thebox-modal').fadeOut(200);
		jQuery('.thebox-modal').addClass('tm-closing');
		setTimeout(function(){
			jQuery('.thebox-modal').remove();
		},300);
	}
}


(function($) {
    "use strict";

    $( 'a.push-menu-btn' ).on( 'click', function (e) {
        e.preventDefault();
        var mask = '<div class="mask-overlay">';
        $( 'body' ).toggleClass( 'menu-opened' );
        $(mask).hide().appendTo( 'body' ).fadeIn( 'fast' );
        $( '.mask-overlay, .close-menu' ).on( 'click', function() {
            $( 'body' ).removeClass( 'menu-opened' );
            $( '.mask-overlay' ).remove();
        });
    });

    
    $('.opensubul>a').on('click', function(){
        $('.opensubul ul').toggleClass('opend');
        return false;
    });

    $('body').on('click','.thebox-window .close',function(e){
        jQuery('.thebox-modal').fadeOut(200);
        return false;
    });

    $(".model-user-login").on('click', function(){
        jQuery('.registration_modal .thebox-modal').fadeOut(200);
        jQuery('.reporting_modal .thebox-modal').fadeOut(200);
        jQuery('.login_modal .thebox-modal').fadeIn(200);
        return false;
    });
    $(".model-user-registered").on('click', function(){
        jQuery('.login_modal .thebox-modal').fadeOut(200);
        jQuery('.reporting_modal .thebox-modal').fadeOut(200);
        jQuery('.registration_modal .thebox-modal').fadeIn(200);
        return false;
    });
    $(".model-reporting").on('click', function(){
        jQuery('.login_modal .thebox-modal').fadeOut(200);
        jQuery('.registration_modal .thebox-modal').fadeOut(200);
        jQuery('.reporting_modal .thebox-modal').fadeIn(200);
        return false;
    });
    /*--------------------------------------
    :: Accordion & Toggle
    --------------------------------------*/
    jQuery(".accordion .accordion-title").each(function() {
        jQuery(this).on("click", function() {
            if (jQuery(this).parent().parent().hasClass("toggle-accordion")) {
                jQuery(this).parent().find("li:first .accordion-title").addClass("active");
                jQuery(this).parent().find("li:first .accordion-title").next(".accordion-inner").addClass("active");
                jQuery(this).toggleClass("active");
                jQuery(this).next(".accordion-inner").slideToggle().toggleClass("active");
                jQuery(this).find("i").toggleClass("fa-chevron-down").toggleClass("fa-chevron-up");
            } else {
                if (jQuery(this).next().is(":hidden")) {
                    jQuery(this).parent().parent().find(".accordion-title").removeClass("active").next().slideUp(200);
                    jQuery(this).parent().parent().find(".accordion-title").next().removeClass("active").slideUp(200);
                    jQuery(this).toggleClass("active").next().slideDown(200);
                    jQuery(this).next(".accordion-inner").toggleClass("active");
                    jQuery(this).parent().parent().find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
                    jQuery(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
                }
            }
            return false;
        });
    });

    jQuery("form").on("change", ".file-upload-field", function() {
        jQuery(this).parent().parent().find("span").html(jQuery(this).val().replace(/.*(\/|\\)/, ""));
    });

    
    if($('.alert-flash').length)
    {
        setTimeout(function () {
            $('.alert-flash').remove();
        }, 8000);
    }


    $('.group-buttons button').on('click', function(){
        $(this).parent().find('button').removeClass('active');
        $(this).addClass('active');
    });



    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > 1) {
            jQuery('.sticky .header-top').addClass('sticky');
        } else {
            jQuery('.sticky .header-top').removeClass('sticky');
        }
        return false;
    });


    $('.add_to_cart_btn').on('click', function () {
        var cart = $('.header-cart');
        var product_id = $(this).data('product-id');
        var imgtodrag = $('#product-'+product_id).find(".attachment-thumb").eq(0);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({'opacity': '0.5','position': 'absolute','height': '150px','width': '150px','z-index': '999999'})
                .appendTo($('body'))
                .animate({'top': cart.offset().top + 10,'left': cart.offset().left + 10,'width': 75,'height': 75,'border-radius': 100
            }, 1000, 'easeInOutExpo');

            //setTimeout(function () {cart.effect("shake", {times: 2}, 200);}, 1500);
            imgclone.animate({'width': 0,'height': 0}, function () {$(this).detach();});
        }

        add_to_cart(product_id, 1);

    });
    
    function add_to_cart(product_id, quantity)
    {
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'addcart',product: product_id, quantity: quantity},
            success: function (data) {
                if(data.status == 1)
                {
                    $('#cart_badge').html(data.cart_count);
                    $('#popup-addcart .product-quantity').html(quantity);
                    $('#popup-addcart .product-name').html(data.productname);
                    $('#popup-addcart').addClass('open');
                }
                else
                {

                }
            }
        });
    }
    //
    $(document).on('click', '.remove_cart_item', function() {
        
        var product_id  = $(this).data('product-id'),
            item_id     = $(this).data('item-id');
            
        $('.product-cart-'+product_id).addClass('removed');  
        $('.product-cart-'+item_id).addClass('removed');
        
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'removecartitem',product: product_id, itemid: item_id},
            success: function (data) {
                console.log(data);
                if(data.status == 1)
                {
                    setTimeout(function () {
                        $('#cart_badge').html(data.cart_count);
                        $('.product-cart-'+item_id).fadeOut();
                        $('.product-cart-'+product_id).fadeOut();
                        
                        if($('#cartTotal').length){
                            $('#cartTotal span').html(data.total);
                            var totalall = Number(data.total) + Number(35);
                            $('.cartTotal3 span').html(totalall.toFixed(2));
                        }
                    }, 1000);
                }
                else
                {
                    $('.product-cart-'+item_id).removeClass('removed');
                }
            }
        });

    });
    // 
    function update_cart_item(product_box)
    {
        var product_id  = product_box.data('product-id'),
            item_id     = product_box.data('item-id'),
            quantity    = product_box.find('.product_quantity').val(),
            maxquantity = product_box.find('.product_quantity').data('max-quantity');

        if(quantity == 0)
        {
            $('.product-cart-'+item_id+' .qty-field span.error').html('Ø§Ù‚Ù„ ÙƒÙ…ÙŠØ© ÙŠÙ…ÙƒÙ† Ø·Ù„Ø¨Ù‡Ø§ : 1').css('width', '100%');
            product_box.find('.product_quantity').val('1');
            quantity = 1;
        }
        if(quantity > maxquantity)
        {
            $('.product-cart-'+item_id+' .qty-field span.error').html('Ø§Ù„ÙƒÙ…ÙŠØ© Ø§Ù„Ù…ØªØ§Ø­Ø© Ø­Ø§Ù„ÙŠØ§: ' + maxquantity +' ').css('width', '100%');
            product_box.find('.product_quantity').val(maxquantity);
            quantity = maxquantity;
        }


        $('.product-cart-'+item_id).addClass('updated');

        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'updatecartitem',product: product_id, quantity: quantity, itemid: item_id},
            success: function (data) {
                console.log(data);
                if(data.status == 1)
                {
                    setTimeout(function () {
                        $('#cart_badge').html(data.cart_count);
                        $('.product-cart-'+item_id).removeClass('updated');
                        if($('#cartTotal').length){
                            $('#cartTotal span').html(data.carttotal);
                            var totalall = Number(data.carttotal) + Number(35);
                            $('.cartTotal3 span').html(totalall.toFixed(2));
                        }
                        $('.product-cart-'+item_id+' .totla span').html(data.total);
                    }, 1000);
                    setTimeout(function () {$('.product-cart-'+item_id+' .qty-field span.error').html('').css('width', '0%');}, 1800);
                }
                else
                {

                }
            }
        });
    }
    //
    $(document).on('change', '.product_quantity', function() {
        var product_box = $(this).parent();
        update_cart_item(product_box);
    });
    //
    $(document).on('click', '.btn-qty-add', function() {
        var inputqty = $(this).parent().find('input.product_quantity'),
            creqty   = inputqty.val(),
            product_id = $(this).parent().data('product-id'),
            item_id    = $(this).parent().data('item-id'),
            product_box = $('.product-cart-'+item_id);
        creqty++;
        inputqty.val(creqty);
        if(product_box.length)
        {
            update_cart_item(product_box);
        }
    });
    //
    $(document).on('click', '.btn-qty-sub', function() {
        var inputqty = $(this).parent().find('input.product_quantity'),
            creqty   = inputqty.val(),
            product_id = $(this).parent().data('product-id'),
            item_id    = $(this).parent().data('item-id'),
            product_box = $('.product-cart-'+item_id);
        creqty--;
        if(creqty < 1)
        {
            creqty = 1;
        }
        inputqty.val(creqty);
        if(product_box.length)
        {
            update_cart_item(product_box);
        }
    });
    //
    $(document).on('click', '#single_add_to_cart', function() {
        var product_id  = $(this).data('product-id'),
            quantity    = $('input.product_quantity').val(),
            maxquantity = $('input.product_quantity').data('max-quantity');
        if(quantity == 0)
        {
            $('.qty-field span.error').html('Ø§Ù‚Ù„ ÙƒÙ…ÙŠØ© ÙŠÙ…ÙƒÙ† Ø·Ù„Ø¨Ù‡Ø§ : 1').css('width', '100%');
            $('.product_quantity').val('1');
            setTimeout(function () {$('.qty-field span.error').html('').css('width', '0%');}, 1800);
            return false;
        }
        if(quantity > maxquantity)
        {
            $('.qty-field span.error').html('Ø§Ù„ÙƒÙ…ÙŠØ© Ø§Ù„Ù…ØªØ§Ø­Ø© Ø­Ø§Ù„ÙŠØ§: ' + maxquantity +' ').css('width', '100%');
            $('.product_quantity').val(maxquantity);
            setTimeout(function () {$('.qty-field span.error').html('').css('width', '0%');}, 1800);
            return false;
        }
        add_to_cart(product_id, quantity);
    });
    //
    $(document).on('click', '#add_to_wishlist', function() {
        var thebutton  = $(this),
            product_id  = thebutton.data('product-id');
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'addwishlist',product: product_id},
            success: function (data) {
                if(data.status == 1)
                {
                    thebutton.toggleClass('active');
                    $('#box-notification').html('<div class="notification-flash success">'+data.notification+'</div>');
                    $('#box-notification .notification-flash').fadeIn();
                }
                else
                {
                    $('#box-notification').html('<div class="notification-flash error">'+data.notification+'</div>');
                    $('#box-notification .notification-flash').fadeIn();
                }
                close_notification()
            }
        });
    });
    //
    $(document).on('click', '.remove_wishlist_item', function() {
        var product_id  = $(this).data('product-id'),
            item_id     = $(this).data('item-id');
        $('.product-cart-'+item_id).addClass('removed');
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'removewishlistitem',product: product_id},
            success: function (data) {
                $('#box-notification').html('<div class="notification-flash success">'+data.notification+'</div>');
                $('#box-notification .notification-flash').fadeIn();
                setTimeout(function () {$('.product-cart-'+item_id).fadeOut();close_notification(0);}, 1000);
                
            }
        });
    });
    
    function close_notification(time = 2000)
    {
        setTimeout(function () {
            $('#box-notification .notification-flash').fadeOut();
            $('#box-notification').html('');
        }, time);
    }

    $(document).on('click', '.btn-continue-shopping', function() {
        $('#popup-addcart').removeClass('open');
    });


    $(document).on('click', '#payment_methods li', function() {
        $('#payment_methods li').removeClass('active');
        $(this).addClass('active');
        $('#input_paymet_method').val($(this).data('method'));
        $('.box-payment-info').fadeOut();
        if($(this).data('method') != 'paypal')
        {
            $('#box-info-'+$(this).data('method')).fadeIn();
        }
    });


    $('.select-bank-transfer').on('change', function(){
        
        var bname = $(this).find(':selected').data('bname'),
            bnumber = $(this).find(':selected').data('bnumber'),
            biban = $(this).find(':selected').data('biban');
        $('.box-select-bank-transfer .infobb-bankusername').html(bname);
        $('.box-select-bank-transfer .infobb-banknumber').html(bnumber);
        $('.box-select-bank-transfer .infobb-bankiban').html(biban);
    });

    if($('.select-bank-transfer').find(':selected').data('bname'))
    {
        var bname = $('.select-bank-transfer').find(':selected').data('bname'),
            bnumber = $('.select-bank-transfer').find(':selected').data('bnumber'),
            biban = $('.select-bank-transfer').find(':selected').data('biban');
        $('.box-select-bank-transfer .infobb-bankusername').html(bname);
        $('.box-select-bank-transfer .infobb-banknumber').html(bnumber);
        $('.box-select-bank-transfer .infobb-bankiban').html(biban);
    }


    $('.product-cart .prod-options-list').on('change', function () {
        var item_id = $(this).data('itemid');
        $('.product-cart-'+item_id).addClass('updated');
        var data = $('form.form-updatetocart-'+item_id).serialize();
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: data,
            success: function (data) {
                if(data.status == 1)
                {
                    /*
                    var newitemid = data.itemid;
                    // change data
                    $('.product-cart-'+item_id).data('item-id', newitemid);
                    $('form.form-updatetocart-'+item_id).find('.remove_cart_item').data('item-id', newitemid);
                    $('form.form-updatetocart-'+item_id).find('.prod-options-list').data('itemid', newitemid);
                    $('form.form-updatetocart-'+item_id).find('input[name=itemid]').val(newitemid);
                    // change class
                    $('form.form-updatetocart-'+item_id).find('.itemprice-price').addClass('itemprice-'+newitemid).removeClass('itemprice-'+item_id);
                    $('.product-cart-'+item_id).addClass('product-cart-'+newitemid).removeClass('product-cart-'+item_id);
                    $('form.form-updatetocart-'+item_id).addClass('form-updatetocart-'+newitemid).removeClass('form-updatetocart-'+item_id);
                    */
                    setTimeout(function () {
                        $('#cart_badge').html(data.cart_count);
                        if($('#cartTotal').length){
                            $('#cartTotal span').html(data.carttotal);
                            var totalall = Number(data.carttotal) + Number(35);
                            $('.cartTotal3 span').html(totalall.toFixed(2));
                        }
                        $('.product-cart-'+item_id).removeClass('updated');
                        $('.product-cart-'+item_id+' .totla span').html(data.total);
                        $('.itemprice-'+item_id).html(data.itemprice);
                    }, 1000);
                    setTimeout(function () {$('.product-cart-'+item_id+' .qty-field span.error').html('').css('width', '0%');}, 1800);
                    window.location.reload(true);
                }
                else
                {
                    setTimeout(function () {$('.product-cart-'+item_id+' .qty-field span.error').html('').css('width', '0%');}, 0);
                }
            }
        });

    });
    
})(jQuery);

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

function opensearchinput(){
    document.getElementById("search-bar").classList.toggle("hide");
    };
function close_thebox_modal(){
	"use strict";
	if ($('.thebox-window').length){
		jQuery('.thebox-modal').fadeOut(200);
		jQuery('.thebox-modal').addClass('tm-closing');
		setTimeout(function(){
			jQuery('.thebox-modal').remove();
		},300);
	}
}


(function($) {
    "use strict";

    $( 'a.push-menu-btn' ).on( 'click', function (e) {
        e.preventDefault();
        var mask = '<div class="mask-overlay">';
        $( 'body' ).toggleClass( 'menu-opened' );
        $(mask).hide().appendTo( 'body' ).fadeIn( 'fast' );
        $( '.mask-overlay, .close-menu' ).on( 'click', function() {
            $( 'body' ).removeClass( 'menu-opened' );
            $( '.mask-overlay' ).remove();
        });
    });

    
    $('.opensubul>a').on('click', function(){
        $('.opensubul ul').toggleClass('opend');
        return false;
    });

    $('body').on('click','.thebox-window .close',function(e){
        jQuery('.thebox-modal').fadeOut(200);
        return false;
    });

    $(".model-user-login").on('click', function(){
        jQuery('.registration_modal .thebox-modal').fadeOut(200);
        jQuery('.reporting_modal .thebox-modal').fadeOut(200);
        jQuery('.login_modal .thebox-modal').fadeIn(200);
        return false;
    });
    $(".model-user-registered").on('click', function(){
        jQuery('.login_modal .thebox-modal').fadeOut(200);
        jQuery('.reporting_modal .thebox-modal').fadeOut(200);
        jQuery('.registration_modal .thebox-modal').fadeIn(200);
        return false;
    });
    $(".model-reporting").on('click', function(){
        jQuery('.login_modal .thebox-modal').fadeOut(200);
        jQuery('.registration_modal .thebox-modal').fadeOut(200);
        jQuery('.reporting_modal .thebox-modal').fadeIn(200);
        return false;
    });
    /*--------------------------------------
    :: Accordion & Toggle
    --------------------------------------*/
    jQuery(".accordion .accordion-title").each(function() {
        jQuery(this).on("click", function() {
            if (jQuery(this).parent().parent().hasClass("toggle-accordion")) {
                jQuery(this).parent().find("li:first .accordion-title").addClass("active");
                jQuery(this).parent().find("li:first .accordion-title").next(".accordion-inner").addClass("active");
                jQuery(this).toggleClass("active");
                jQuery(this).next(".accordion-inner").slideToggle().toggleClass("active");
                jQuery(this).find("i").toggleClass("fa-chevron-down").toggleClass("fa-chevron-up");
            } else {
                if (jQuery(this).next().is(":hidden")) {
                    jQuery(this).parent().parent().find(".accordion-title").removeClass("active").next().slideUp(200);
                    jQuery(this).parent().parent().find(".accordion-title").next().removeClass("active").slideUp(200);
                    jQuery(this).toggleClass("active").next().slideDown(200);
                    jQuery(this).next(".accordion-inner").toggleClass("active");
                    jQuery(this).parent().parent().find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
                    jQuery(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
                }
            }
            return false;
        });
    });

    jQuery("form").on("change", ".file-upload-field", function() {
        jQuery(this).parent().parent().find("span").html(jQuery(this).val().replace(/.*(\/|\\)/, ""));
    });

    
    if($('.alert-flash').length)
    {
        setTimeout(function () {
            $('.alert-flash').remove();
        }, 8000);
    }


    $('.group-buttons button').on('click', function(){
        $(this).parent().find('button').removeClass('active');
        $(this).addClass('active');
    });



    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > 1) {
            jQuery('.sticky .header-top').addClass('sticky');
        } else {
            jQuery('.sticky .header-top').removeClass('sticky');
        }
        return false;
    });


    $('.add_to_cart_btn').on('click', function () {
        var cart = $('.header-cart');
        var product_id = $(this).data('product-id');
        var imgtodrag = $('#product-'+product_id).find(".attachment-thumb").eq(0);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({'opacity': '0.5','position': 'absolute','height': '150px','width': '150px','z-index': '999999'})
                .appendTo($('body'))
                .animate({'top': cart.offset().top + 10,'left': cart.offset().left + 10,'width': 75,'height': 75,'border-radius': 100
            }, 1000, 'easeInOutExpo');

            //setTimeout(function () {cart.effect("shake", {times: 2}, 200);}, 1500);
            imgclone.animate({'width': 0,'height': 0}, function () {$(this).detach();});
        }

        add_to_cart(product_id, 1);

    });
    
    function add_to_cart(product_id, quantity)
    {
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'addcart',product: product_id, quantity: quantity},
            success: function (data) {
                if(data.status == 1)
                {
                    $('#cart_badge').html(data.cart_count);
                    $('#popup-addcart .product-quantity').html(quantity);
                    $('#popup-addcart .product-name').html(data.productname);
                    $('#popup-addcart').addClass('open');
                }
                else
                {

                }
            }
        });
    }
    //
    $(document).on('click', '.remove_cart_item', function() {
        
        var product_id  = $(this).data('product-id'),
            item_id     = $(this).data('item-id');
            
        $('.product-cart-'+product_id).addClass('removed');  
        $('.product-cart-'+item_id).addClass('removed');
        
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'removecartitem',product: product_id, itemid: item_id},
            success: function (data) {
                console.log(data);
                if(data.status == 1)
                {
                    setTimeout(function () {
                        $('#cart_badge').html(data.cart_count);
                        $('.product-cart-'+item_id).fadeOut();
                        $('.product-cart-'+product_id).fadeOut();
                        
                        if($('#cartTotal').length){
                            $('#cartTotal span').html(data.total);
                            var totalall = Number(data.total) + Number(35);
                            $('.cartTotal3 span').html(totalall.toFixed(2));
                        }
                    }, 1000);
                }
                else
                {
                    $('.product-cart-'+item_id).removeClass('removed');
                }
            }
        });

    });
    // 
    function update_cart_item(product_box)
    {
        var product_id  = product_box.data('product-id'),
            item_id     = product_box.data('item-id'),
            quantity    = product_box.find('.product_quantity').val(),
            maxquantity = product_box.find('.product_quantity').data('max-quantity');

        if(quantity == 0)
        {
            $('.product-cart-'+item_id+' .qty-field span.error').html('Ø§Ù‚Ù„ ÙƒÙ…ÙŠØ© ÙŠÙ…ÙƒÙ† Ø·Ù„Ø¨Ù‡Ø§ : 1').css('width', '100%');
            product_box.find('.product_quantity').val('1');
            quantity = 1;
        }
        if(quantity > maxquantity)
        {
            $('.product-cart-'+item_id+' .qty-field span.error').html('Ø§Ù„ÙƒÙ…ÙŠØ© Ø§Ù„Ù…ØªØ§Ø­Ø© Ø­Ø§Ù„ÙŠØ§: ' + maxquantity +' ').css('width', '100%');
            product_box.find('.product_quantity').val(maxquantity);
            quantity = maxquantity;
        }


        $('.product-cart-'+item_id).addClass('updated');

        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'updatecartitem',product: product_id, quantity: quantity, itemid: item_id},
            success: function (data) {
                console.log(data);
                if(data.status == 1)
                {
                    setTimeout(function () {
                        $('#cart_badge').html(data.cart_count);
                        $('.product-cart-'+item_id).removeClass('updated');
                        if($('#cartTotal').length){
                            $('#cartTotal span').html(data.carttotal);
                            var totalall = Number(data.carttotal) + Number(35);
                            $('.cartTotal3 span').html(totalall.toFixed(2));
                        }
                        $('.product-cart-'+item_id+' .totla span').html(data.total);
                    }, 1000);
                    setTimeout(function () {$('.product-cart-'+item_id+' .qty-field span.error').html('').css('width', '0%');}, 1800);
                }
                else
                {

                }
            }
        });
    }
    //
    $(document).on('change', '.product_quantity', function() {
        var product_box = $(this).parent();
        update_cart_item(product_box);
    });
    //
    $(document).on('click', '.btn-qty-add', function() {
        var inputqty = $(this).parent().find('input.product_quantity'),
            creqty   = inputqty.val(),
            product_id = $(this).parent().data('product-id'),
            item_id    = $(this).parent().data('item-id'),
            product_box = $('.product-cart-'+item_id);
        creqty++;
        inputqty.val(creqty);
        if(product_box.length)
        {
            update_cart_item(product_box);
        }
    });
    //
    $(document).on('click', '.btn-qty-sub', function() {
        var inputqty = $(this).parent().find('input.product_quantity'),
            creqty   = inputqty.val(),
            product_id = $(this).parent().data('product-id'),
            item_id    = $(this).parent().data('item-id'),
            product_box = $('.product-cart-'+item_id);
        creqty--;
        if(creqty < 1)
        {
            creqty = 1;
        }
        inputqty.val(creqty);
        if(product_box.length)
        {
            update_cart_item(product_box);
        }
    });
    //
    $(document).on('click', '#single_add_to_cart', function() {
        var product_id  = $(this).data('product-id'),
            quantity    = $('input.product_quantity').val(),
            maxquantity = $('input.product_quantity').data('max-quantity');
        if(quantity == 0)
        {
            $('.qty-field span.error').html('Ø§Ù‚Ù„ ÙƒÙ…ÙŠØ© ÙŠÙ…ÙƒÙ† Ø·Ù„Ø¨Ù‡Ø§ : 1').css('width', '100%');
            $('.product_quantity').val('1');
            setTimeout(function () {$('.qty-field span.error').html('').css('width', '0%');}, 1800);
            return false;
        }
        if(quantity > maxquantity)
        {
            $('.qty-field span.error').html('Ø§Ù„ÙƒÙ…ÙŠØ© Ø§Ù„Ù…ØªØ§Ø­Ø© Ø­Ø§Ù„ÙŠØ§: ' + maxquantity +' ').css('width', '100%');
            $('.product_quantity').val(maxquantity);
            setTimeout(function () {$('.qty-field span.error').html('').css('width', '0%');}, 1800);
            return false;
        }
        add_to_cart(product_id, quantity);
    });
    //
    $(document).on('click', '#add_to_wishlist', function() {
        var thebutton  = $(this),
            product_id  = thebutton.data('product-id');
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'addwishlist',product: product_id},
            success: function (data) {
                if(data.status == 1)
                {
                    thebutton.toggleClass('active');
                    $('#box-notification').html('<div class="notification-flash success">'+data.notification+'</div>');
                    $('#box-notification .notification-flash').fadeIn();
                }
                else
                {
                    $('#box-notification').html('<div class="notification-flash error">'+data.notification+'</div>');
                    $('#box-notification .notification-flash').fadeIn();
                }
                close_notification()
            }
        });
    });
    //
    $(document).on('click', '.remove_wishlist_item', function() {
        var product_id  = $(this).data('product-id'),
            item_id     = $(this).data('item-id');
        $('.product-cart-'+item_id).addClass('removed');
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: {action: 'removewishlistitem',product: product_id},
            success: function (data) {
                $('#box-notification').html('<div class="notification-flash success">'+data.notification+'</div>');
                $('#box-notification .notification-flash').fadeIn();
                setTimeout(function () {$('.product-cart-'+item_id).fadeOut();close_notification(0);}, 1000);
                
            }
        });
    });
    
    function close_notification(time = 2000)
    {
        setTimeout(function () {
            $('#box-notification .notification-flash').fadeOut();
            $('#box-notification').html('');
        }, time);
    }

    $(document).on('click', '.btn-continue-shopping', function() {
        $('#popup-addcart').removeClass('open');
    });


    $(document).on('click', '#payment_methods li', function() {
        $('#payment_methods li').removeClass('active');
        $(this).addClass('active');
        $('#input_paymet_method').val($(this).data('method'));
        $('.box-payment-info').fadeOut();
        if($(this).data('method') != 'paypal')
        {
            $('#box-info-'+$(this).data('method')).fadeIn();
        }
    });


    $('.select-bank-transfer').on('change', function(){
        
        var bname = $(this).find(':selected').data('bname'),
            bnumber = $(this).find(':selected').data('bnumber'),
            biban = $(this).find(':selected').data('biban');
        $('.box-select-bank-transfer .infobb-bankusername').html(bname);
        $('.box-select-bank-transfer .infobb-banknumber').html(bnumber);
        $('.box-select-bank-transfer .infobb-bankiban').html(biban);
    });

    if($('.select-bank-transfer').find(':selected').data('bname'))
    {
        var bname = $('.select-bank-transfer').find(':selected').data('bname'),
            bnumber = $('.select-bank-transfer').find(':selected').data('bnumber'),
            biban = $('.select-bank-transfer').find(':selected').data('biban');
        $('.box-select-bank-transfer .infobb-bankusername').html(bname);
        $('.box-select-bank-transfer .infobb-banknumber').html(bnumber);
        $('.box-select-bank-transfer .infobb-bankiban').html(biban);
    }


    $('.product-cart .prod-options-list').on('change', function () {
        var item_id = $(this).data('itemid');
        $('.product-cart-'+item_id).addClass('updated');
        var data = $('form.form-updatetocart-'+item_id).serialize();
        $.ajax({
            type: 'POST',
            url: ajaxrequest,
            data: data,
            success: function (data) {
                if(data.status == 1)
                {
                    /*
                    var newitemid = data.itemid;
                    // change data
                    $('.product-cart-'+item_id).data('item-id', newitemid);
                    $('form.form-updatetocart-'+item_id).find('.remove_cart_item').data('item-id', newitemid);
                    $('form.form-updatetocart-'+item_id).find('.prod-options-list').data('itemid', newitemid);
                    $('form.form-updatetocart-'+item_id).find('input[name=itemid]').val(newitemid);
                    // change class
                    $('form.form-updatetocart-'+item_id).find('.itemprice-price').addClass('itemprice-'+newitemid).removeClass('itemprice-'+item_id);
                    $('.product-cart-'+item_id).addClass('product-cart-'+newitemid).removeClass('product-cart-'+item_id);
                    $('form.form-updatetocart-'+item_id).addClass('form-updatetocart-'+newitemid).removeClass('form-updatetocart-'+item_id);
                    */
                    setTimeout(function () {
                        $('#cart_badge').html(data.cart_count);
                        if($('#cartTotal').length){
                            $('#cartTotal span').html(data.carttotal);
                            var totalall = Number(data.carttotal) + Number(35);
                            $('.cartTotal3 span').html(totalall.toFixed(2));
                        }
                        $('.product-cart-'+item_id).removeClass('updated');
                        $('.product-cart-'+item_id+' .totla span').html(data.total);
                        $('.itemprice-'+item_id).html(data.itemprice);
                    }, 1000);
                    setTimeout(function () {$('.product-cart-'+item_id+' .qty-field span.error').html('').css('width', '0%');}, 1800);
                    window.location.reload(true);
                }
                else
                {
                    setTimeout(function () {$('.product-cart-'+item_id+' .qty-field span.error').html('').css('width', '0%');}, 0);
                }
            }
        });

    });
    
})(jQuery);
   
       
   
       


