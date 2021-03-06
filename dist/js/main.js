$(document).ready(function(){
  $('.campaings-inn-content').scrollbar();
  $('.address-list').scrollbar();
  $('.select-emul-dropdown').scrollbar();

  $('[data-datepicker]').datepicker({
    dateFormat: 'dd-mm-yyyy'
  });
  $('[data-date-start]').datepicker({
    onSelect: function() {
      getStatisticCampaings();
    }
  });
  $('[data-date-end]').datepicker({
    onSelect: function() {
      getStatisticCampaings();
    }
  });

  $('[data-gift-date-start] .campaign-datepicker__field input').datepicker({
    minDate: new Date(),
    onSelect: function(formattedDatestring, date, inst) {
      let day = date;
      let dayAfter = date;
      day.setDate(date.getDate() + 1);
      day = day.toLocaleString();
      day = day.split(',')[0];

      dayAfter.setDate(date.getDate() + 2);
      dayAfter = dayAfter.toLocaleString();
      dayAfter = dayAfter.split(',')[0];

      $('[data-gift-date-end] .campaign-datepicker__field input').val(day);
      $('[data-gift-date-until] .campaign-datepicker__field input').val(dayAfter);
    }
  })

  $('[data-gift-date-until] .campaign-datepicker__field input').datepicker({
    minDate: new Date()
  })

  $('[data-gift-date-end] .campaign-datepicker__field input').datepicker({
    minDate: new Date(),
    onSelect: function(formattedDatestring, date, inst) {
      let day = date;
      day.setDate(date.getDate() + 1);
      day = day.toLocaleString();
      day = day.split(',')[0];

      $('[data-gift-date-until] .campaign-datepicker__field input').val(day)
    }
  })

  $('.select_default').SumoSelect();

  $('.container__select_family select').SumoSelect({
    placeholder: 'Семейное положение'
  });

  $('select.select_tags').SumoSelect({
    placeholder: 'Данные и интересы вашей аудитории',
    captionFormat: '{0} выбрано',
    captionFormatAllSelected: '{0} все выбраны!',
  });

  $('[data-address]').kladr({
    oneString: true
});


  $('.container__age').ionRangeSlider({
    type: "double",
    grid: false,
    min: 18,
    max: 100,
    from: 25,
    to: 100,
    drag_interval: true,
    min_interval: null,
    max_interval: null,
    skin: 'round',
  });

  $('.container__radius').ionRangeSlider({
    grid: false,
    min: 1,
    max: 1000,
    from: 25,
    to: 1000,
    min_interval: null,
    max_interval: null,
    skin: 'round',
  });

  $('.container__years').ionRangeSlider({
    type: "double",
    grid: false,
    min: 1917,
    max: 2017,
    from: 1917,
    to: 1995,
    drag_interval: true,
    min_interval: null,
    max_interval: null,
    skin: 'round',
  });


  $('[data-time]').inputmask({
    regex: '^(00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23):[0-5][0-9]:[0-5][0-9]$',
  });
  $('[data-datepicker]').inputmask('99.99.9999');


  $('[data-org-phone], [data-edit-phone], [data-callback-phone]').inputmask({
    mask: "+7 (999) 999-99-99",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  $('[data-org-email], [data-support-email], [data-callback-email]').inputmask({ 
    alias: "email",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  $('[data-org-inn], [data-edit-inn]').inputmask({ 
    mask: "9999999999[99]",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  $('[data-org-ogrn], [data-edit-ogrn]').inputmask({ 
    mask: "9999999999999",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });

  const showModal = function(idModal, text) {
    console.log($('#' + idModal));
    $('#' + idModal).attr('style', 'display:flex');
    $('#' + idModal).find('.send-success-content').text(text);
    setTimeout(function() { $('#' + idModal).fadeOut() }, 3000);
  };

  const closeHeaderMenu = function(e) {
    if (!e.target.closest('.header-menu') && !e.target.closest('.header-menu-container')) {
      $('.header-menu').slideUp(300);
    }
  };

  const moveToAnchor = function() {
    let pathname = location.href;

    if (!$('.registration').length) {
      $('body').css('overflow', '');
    }

    if (pathname.indexOf('#') > 0) {
      pathname = pathname.split('#');
      pathname = pathname[(pathname.length - 1)];

      $('html, body').scrollTop(0);
      $('.registration').removeClass('active');
      $('body').css('overflow', '');

      if (!pathname.length) {
        return false;
      }

      let target = $(`#${pathname}`).offset().top - 150;

      $('html, body').animate({scrollTop: target}, 1000);
      return false;
    }
  }

  const headerMenu = function(e) {
  	$(this).find('.header-menu')
  				 .slideToggle(200);
  };

  const headerNav = function() {
  	$(this).addClass('active')
  				 .siblings()
  				 .removeClass('active');
  };

  const mainBlockNav = function() {
  	$(this).addClass('active')
  				 .siblings()
  				 .removeClass('active');
  };

  const inputFocusOn = function() {
    $(this).addClass('active').removeClass('required');
  };

  const inputFocusOff = function() {
    if ($(this).find('input').length) {
      if ($(this).find('input').val().length) {
        return false;  
      }
    }
    

    if ($(this).find('textarea').length) {
      if ($(this).find('textarea').val().length) {
        return false;  
      }
    }
    

    $(this).removeClass('active');
  };

  const toLocaleString = function() {
    let oldValue = $(this).val();

    oldValue = oldValue.replace(/\s+/g,'');
    oldValue = parseInt(oldValue);

    $(this).val(oldValue.toLocaleString());
  };

  const changeTabs = function(e) {
    e.preventDefault();
    $(this).addClass('active')
           .siblings()
           .removeClass('active');

    $(this).closest('.main-block')
           .find('.main-block-tabs-item')
           .removeClass('active')
           .eq($(this).index())
           .addClass('active');
  };

  const scrollToBlock = function(e) {
    e.preventDefault();
    let link = $(this).attr('href');
    if (window.location.pathname == '/index.html') {
      if (link.indexOf('#') <= 0) return false;
      
      link = link.split("#");
      link = `#${link[(link.length - 1)]}`;

      if (!$(document).find(`${link}`).length) {
        return false;
      }

      let targetOffset = ($(document).find(`${link}`).offset().top - 150);

      $('header .header-link').css('pointer-events', 'none');
      setTimeout(function() {
        $('header .header-link').css('pointer-events', 'auto');
      },1000);

      $('html, body').animate({scrollTop: targetOffset}, 1000);

      return false;
    } else {
      window.location = `${link}`;
    }
  };

  const removePopup = function() {
    $('body').css('overflow', '');

    $('.registration').removeClass('active');
  };

  const removeActiveLinks = function() {
    if (window.location.pathname !== '/index.html') {
      $('header .header-link').removeClass('active');
    }
  };

  const activeRadio = function() {
    $(this).closest('.form-input').addClass('active');
  };


  const faqOpenText = function() {
    if($(this).hasClass('active')) {
      $(this).removeClass('active')
             .siblings('.faq-theme-main')
             .slideUp(300);

      return false;
    } else {
      $(this).addClass('active')
             .siblings('.faq-theme-main')
             .slideDown(300);

      return false;
    }
  };

  const faqOpenInnerText = function(e) {
    if (e.target.classList.contains('date-pick-period__link_inline')) {
      window.location = e.target.href;
      return false;
    }

    if($(this).hasClass('active')) {
      $(this).removeClass('active')
             .siblings('.faq-question-main')
             .slideUp(300);

      return false;
    } else {
      $(this).addClass('active')
             .siblings('.faq-question-main')
             .slideDown(300);

      return false;
    }
  };


  const dropdownMenu = function(e) {
    if ($(this).siblings('.select-emul-dropdown').hasClass('active')) {
      $(this).siblings('.select-emul-dropdown')
           .css({
            height: '0px'
           })
           .removeClass('active');
           
    } else {
      $(this).siblings('.select-emul-dropdown')
           .css({
            height: '100px'
           })
           .addClass('active');
    }
  };


  const closeDropdownMenu = function(e) {
    if (e.target !== $('.select-emul-wrapper') && !e.target.closest('.select-emul-wrapper') ) {

      $('.select-emul-dropdown')
           .css({
            height: '0px'
           })
           .removeClass('active');
    }
  };


  const selectGift = function() {
    let textField = $(this).closest('.select-emul-wrapper').find('.select-emul__text');
    let itemCloned = $(this).clone();

    textField.html(itemCloned);

    $('.select-emul-dropdown')
           .css({
            height: '0px'
           })
           .removeClass('active');
  };


  const activeDatepicker = function() {
    $(this).closest('.campaign-datepicker').addClass('active');
  };

  const deactiveDatepicker = function() {
    let wrapper = $(this).closest('.campaign-datepicker');
    let inputs = wrapper.find('input');
    let result = 0;


   inputs.map((index, el) => {
      if (el.value.length > 0){
        ++result;
      }
    });

    if (result > 0) return false;
    wrapper.removeClass('active');
  };


  const openCategory = function() {
    if($(this).hasClass('active')) {
      $(this).siblings('.container-category-main')
             .slideUp(300);
      $(this).removeClass('active');

    } else {
      $(this).siblings('.container-category-main')
             .slideDown(300);
      $(this).addClass('active');

    }
    
  };


  const openCategoryInn = function() {
    if( $(this).hasClass('active') ) {
      $(this).find('input[type="checkbox"]').prop('checked', 0);
      $(this).removeClass('active');
      $(this).siblings('.container-category-inn-main')
             .slideUp(300);
      return false;
    } else {
      $(this).find('input[type="checkbox"]').prop('checked', 1);
      $(this).addClass('active');
      $(this).siblings('.container-category-inn-main')
             .slideDown(300);
      return false;
    }
  };


  const campaignTabs = function(e) {
    e.preventDefault();
    $(this).addClass('active')
           .siblings()
           .removeClass('active');

    $(this).closest('.campaign-spec-window')
           .find('.main-block-tabs-item')
           .removeClass('active')
           .eq($(this).index())
           .addClass('active');
  };


  const getNameOfFile = function() {
    let fileName = this.files[0].name;

    $('.campaign-spec-container_p-file__output').text(fileName);
  }

  const uploadPhoto = function(e) {
    let file = this.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(e) {
      url = e.target.result;

      $('.block-photo-upload__avatar').css({background: `url(${url}) no-repeat center center`, backgroundSize: 'cover'});
    }
  };


  const uploadScreenShot = function() {
    console.log(this.files);
    let file = this.files;

    for (let i = 0; i < this.files.length; i++) {
      $('.form-input__upload_result').append(`<div>${this.files[i].name}</div>`)
    }
    
  };

  const linkForm = function(e) {
    e.preventDefault();

    $('a.header-link.main-block-nav__link').removeClass('active').eq(0).addClass('active');
    $('a.header-link.main-block-nav__link').removeClass('active').eq(0).addClass('active');

    $('.main-block-content.main-block-tabs-item.main-block-content_card').removeClass('active').eq(0).addClass('active');
  };

  const addAddressMap = function() {

  };

  const defaultPeriod = function() {
    let tempDate = new Date();
    let currentDate, prevDate;


    currentDate = `${tempDate.getDate()}.${tempDate.getMonth() + 1}.${tempDate.getFullYear()}`;
    prevDate = `${tempDate.getDate()}.${tempDate.getMonth() - 1}.${tempDate.getFullYear()}`;

    console.log(`${currentDate} : ${prevDate}`);

    $('[data-date-end]').val(currentDate);
    $('[data-date-start]').val(prevDate);
  };

  const checkRequired = function() {
    $(this).closest('label').removeClass('required');


    if ($(this).attr('im-insert')) {
      if ($(this).inputmask('isComplete')) {
        $(this).closest('label').addClass('completed');
        console.log(22)
        return false;
      } else {
        $(this).closest('label').removeClass('completed');
      }
      return false;
    }

    if ($(this).val() > 0) {
      $(this).closest('label').addClass('completed');
      console.log(11)
      return false;
    } else {
      $(this).closest('label').removeClass('completed');
    }
  }

  defaultPeriod();

  removeActiveLinks();
  moveToAnchor();

  $(document).on('input', '[data-required]', checkRequired);
  $(document).on('click', '[data-form-back]', linkForm);
  $(document).on('change', '.form-input__upload input[type="file"]', uploadScreenShot);
  $(document).on('change', '.block-photo-upload__input', uploadPhoto);
  $(document).on('click', '.container-category-inn-head', openCategoryInn);
  $(document).on('click', '.container-category-head', openCategory);
  $(document).on('click', '.dropdown-item', selectGift);
  $(document).on('click', closeDropdownMenu);
  $(document).on('click', '.select-emul', dropdownMenu);
  $(document).on('click', '.faq-question-top', faqOpenInnerText);
  $(document).on('click', '.faq-theme-top', faqOpenText);
  $(document).on('click', '.form-input__radio', activeRadio);
  $(document).on('click', '.registration .btn-cancel', removePopup);
  $(document).on('click', 'header .header-link', scrollToBlock);
  $(document).on('click', '.main-block-nav__link', mainBlockNav);
  $(document).on('click', '.header-menu-container', headerMenu);
  $(document).on('click', '.header .header-link:not(active)', headerNav);
  $(document).on('click', '[data-tabs-link]:not(.active)', changeTabs);
  $(document).on('click', closeHeaderMenu);
  $(document).on('click', '.campaign-spec-nav .main-block-nav__link:not(active)', campaignTabs);

  $(document).on('change', '.input-text input', toLocaleString);
  $(document).on('change', '.campaign-spec-container_p-file .block-photo-upload__input', getNameOfFile);

  $(document).on('focus', '.campaign-datepicker input', activeDatepicker);
  $(document).on('focus', '.input-text', inputFocusOn);
  $(document).on('focus', '.form-input', inputFocusOn);

  $(document).on('blur', '.campaign-datepicker input', deactiveDatepicker);
  $(document).on('blur', '.input-text', inputFocusOff);
  $(document).on('blur', '.form-input', inputFocusOff);  


//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------

  // let baseURL = 'https://getlucky.city/api';
  let baseURL = 'http://185.162.92.149:8080/api';

  const uuid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
  
  let id, authKey, orgID;

  let rowTable = $('.row-template').clone();
  $('.row-template').remove();

  let campaingItem = $('.campaings-inn-row.campaings-item').clone();
  $('.campaings-inn-row.campaings-item').remove();


  //ПОЛУЧЕНИЕ ИНФОРМАЦИИ О БИЗНЕС ПРОФИЛЕ

  var getInfoBuisnessProfile = function() {

    $.ajax({
      url: `${baseURL}/org/${id}/${authKey}`,
      type: 'GET',
      method: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response);
      let orgmoney = response.value.orgMoney || 0;
      $(document).find('.balance-text span').text(orgmoney);

      if (response.value.orgLogo) {
        $('.header-avatar').find('img').attr('src', `${baseURL}/image?id=${response.value.orgLogo}`);
      }

      $(document).find('.balance-text span').text(response.value.orgMoney);
      if (response.value.orgKey) {
        localStorage.orgKey = response.value.orgKey
      }
      console.log("get info about buisness profile");
    })
    .fail(function() {
      console.log("can't get info about buisness profile");
    })
  }

  //КОНЕЦ ПОЛУЧЕНИЕ ИНФОРМАЦИИ О БИЗНЕС ПРОФИЛЕ

  //ПОЛУЧЕНИЕ СТАТИСТИКИ КАМПАНИИ  
  var getStatisticCampaings = function() {
    console.log(11);
    $('.table-statistic').html('');

    let currentYear = new Date();
    currentYear = currentYear.getFullYear();

    let startDate, endDate;

    if ($('[data-date-start]').val()) {
      startDate = `01.01.${currentYear}`;
      $('[data-date-start]').val(startDate);
    } else {
      startDate = $('[data-date-start]').val();
    }

    if ($('[data-date-end]').val()) {
      endDate = `01.12.${currentYear}`;
      $('[data-date-end]').val(endDate);
    } else {
      endDate = $('[data-date-end]').val();
    }

    $.ajax({
      url: `${baseURL}/gift/${localStorage.orgID}/${localStorage.orgKey}/stats`,
      type: 'GET',
      data: {
        "start": `${startDate}`,
        "end": `${endDate}`,
      }
    })
    .done(function(response) {

      let gift = response.value;

      if (gift) {
        gift.forEach(function(item, i) {
          let row = rowTable.clone();
          row.find('td').eq(0).text(item.giftName);
          row.find('td').eq(1).text(item.giftConversion);
          row.find('td').eq(2).text(item.giftType);
          row.find('td').eq(3).text(item.giftDate);
          row.find('td').eq(4).text(item.giftMoney);
          row.find('td').eq(5).text(item.giftReleased);
          row.find('td').eq(6).text(item.giftCollected);
          row.find('td').eq(7).text(item.giftDistributed);
          row.find('td').eq(8).text(item.giftCost);
          row.find('td').eq(9).text(item.giftVisitorCost);
          $('.table-statistic').append(row);
        });
      }
      console.log("gift statistic added");
    })
    .fail(function(error) {
      console.log(error);
      console.log(`gift statistic failed`);
    })
    
  };
  
  //КОНЕЦ ПОЛУЧЕНИЕ СТАТИСТИКИ КАМПАНИИ

  //ПОЛУЧЕНИЕ СПИСКА КАМПАНИИ
  var getListCampaings = function() {
    console.log(`${baseURL}/gift/${id}/${authKey}`);

    $.ajax({
      url: `${baseURL}/gift/${localStorage.orgID}/${localStorage.orgKey}`,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response);
      let gifts = response.value;
      
      $('[data-giftsbackpack-active]').find('.campaings-inn-row.campaings-item').remove();
      $('[data-giftsbackpack-moderating]').find('.campaings-inn-row.campaings-item').remove();
      $('[data-giftsbackpack-finished]').find('.campaings-inn-row.campaings-item').remove();

      if (gifts) {
        gifts.forEach(function(item, i) {
          console.log(item)
          let campaingRow = campaingItem.clone();
          let count = 0;

          item.locations.map((item, index) => {return count = count + item.giftCount})

          console.log(count);
          campaingRow.attr('data-gift-id', item.gift.giftID);
          campaingRow.find('.campaings-item-img img').attr('src', `${baseURL}/image?id=${item.gift.giftImageArID}`);
          campaingRow.find('.campaings-item-info__name').text(item.gift.giftName);
          campaingRow.find('.campaings-item-info__period').text(`${item.gift.giftDateCreation} - ${item.gift.giftDateUserEnd}`);
          campaingRow.find('.campaings-item-info__count').text(`${count} ед.`);
          if (item.gift.giftStatus == 'available') {
            $('[data-giftsbackpack-active]').find('.campaings-inn').append(campaingRow);
          }
          if (item.gift.giftStatus == 'in_progress') {
            $('[data-giftsbackpack-moderating]').find('.campaings-inn').append(campaingRow);
          }
          if (item.gift.giftStatus == 'not_available') {
            $('[data-giftsbackpack-finished]').find('.campaings-inn').append(campaingRow);
          }
        });
      }
      console.log("gift list added");
    })
    .fail(function(error) {
      console.log(error.responseJSON.message);
      console.log(error);
      console.log("gift list failed");
    })
    
  };
  //КОНЕЦ ПОЛУЧЕНИЕ СПИСКА КАМПАНИИ

  if (window.location.href.indexOf('campaign-for-all')) {
    var addressTemplate2 = $('[data-addreses-wrapper-2]').find('.address-location').clone();
    $('[data-addreses-wrapper-2]').find('.address-location').remove();
  }

  //ПОЛУЧЕНИЕ СПИСКА АДРЕСОВ

  var getAddresses = function() {
    let addresses = [];

    $.ajax({
      url: `${baseURL}/org/${id}/${authKey}/address`,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response);
      addresses = response.value;
      if (window.location.href.indexOf('campaign-for-all') > 1) {
        console.log(response)
        response.value.forEach(function(item, i) {
          let city   = item.addressValue;
          let addr   = item.addressLocality;
          let addrID = item.addressID;

          if (city && addr) {
            let temp = addressTemplate2.clone();

            temp.attr('data-addr-id', addrID);

            temp.find('.address-location__name').find('.address-list-item__name--city').text(`${city}`);
            temp.find('.address-location__name').find('.address-list-item__name--addr').text(`${addr}`);          
            $('[data-addreses-wrapper-2]').append(temp);
          }
        });
      } else {
        $('.address-list.scroll-content').html('');
        response.value.forEach(function(item, i) {
          console.log(item);
          let city = item.addressValue;
          let addr = item.addressLocality;
          let addrID = item.addressID;

          if (city && addr) {
            let temp = addressTemplate.clone();

            temp.attr('data-addr-id', addrID);

            temp.find('.address-list-item__name').find('.address-list-item__name--city').text(`${city}`);
            temp.find('.address-list-item__name').find('.address-list-item__name--addr').text(`${addr}`);
            

            $('.address-list.scroll-content').append(temp);
          }
        });
        console.log("success get of info of buisness profile");
        return addresses;
      }
    })
    .fail(function() {
      console.log("error get of info of buisness profile");
    })

    return addresses;
  }

   //КОНЕЦ ПОЛУЧЕНИЕ СПИСКА АДРЕСОВ

   //ПЕРВОНАЧАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ПРИ НАЛИЧИИ ТОКЕНА И ID

  if (localStorage["id"] && localStorage["authKey"]) {
    id = localStorage["id"];
    authKey = localStorage["authKey"];
    orgID = localStorage["orgID"];
    removePopup();
    getInfoBuisnessProfile();
    getStatisticCampaings();
    getListCampaings();
    if (window.location.href.indexOf('campaign-for-all')) {
      getAddresses();
    }
  } else {
    id = 0;
    authKey = '';
    orgID = 0;
  }

  //КОНЕЦ ПЕРВОНАЧАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ПРИ НАЛИЧИИ ТОКЕНА И ID

  //СОЗДАНИЕ БИЗНЕС ПРОФИЛЯ

  $(document).on('click', '#btn-create-profile', function(e) {
    e.preventDefault();

    let requiredCount = 0;

    $('.block-form').find('.form-input').each(function() {
      if ($(this).hasClass('completed')) {
        ++requiredCount;
      }
    })

    console.log(requiredCount);

    if (requiredCount < 11) {
      $('[data-required]').each(function(index, item) {
        if (!$(this).closest('label').hasClass('completed')) {
          $(this).closest('label').addClass('required');
        }
      })
      $('.block-btns-wrap span').attr('style', 'visibility:initial');
      showModal($('#send-error').attr('id'));
      return false;
    }

    let data = {};
    let avatar = $('.block-photo-upload__avatar').attr('style');


    if (avatar) {
      avatar = avatar.split(' ');
      avatar = avatar[1].split('"');
      avatar = avatar[1];

      let avatarImg = new FormData();
      let avatarImage = $('.block-photo-upload__input')[0].files[0];
      avatarImg.append('file', avatarImage);

      console.log(avatarImg);

      $.ajax({
        url: `${baseURL}/image/upload?type=0&category=лого`,
        method: 'POST',
        type: 'POST',
        dataType: 'json',
        contentType: false,
        processData: false,
        data: avatarImg,
      })
      .done(function(response) {
        showModal($('#send-success').attr('id'));
        let orgLogoID = response.value;
        console.log(response.value);
        console.log("avatar uploaded");
        data = {
          "user": {
            "userName": `${$('[data-org-login]').val()}`,
            "userKey": `${$('[data-org-password]').val()}`,
            "userEmail": `${$('[data-org-email]').val()}`
          },
          "org": {
            "orgName": `${$('[data-org-name]').val()}`,
            "orgFullName": `${$('[data-org-type]').val()}`,
            "orgBanner": orgLogoID,
            "orgLogo": orgLogoID,
            "orgTIN": `${$('[data-org-inn]').val()}`,
            "orgOGRN": `${$('[data-org-ogrn]').val()}`,
            "orgPhone": `${$('[data-org-phone]').val()}`
          },
          "addresses": [
            {
              "addressValue": `${$('[data-org-address-city]').val()}`,
              "addressLocality": `${$('[data-org-address-addr]').val()}`
            }
          ]
        }

        $.ajax({
          url: `${baseURL}/org/create`,
          method: 'POST',
          contentType: 'application/json',
          crossDomain: true,
          processData: false,
          data: JSON.stringify(data),
        })
        .done(function(response) {

          id = response.value.userID;
          authKey = response.value.userKey;
          orgID = response.value.orgID;

          localStorage["id"] = id;
          localStorage["authKey"] = authKey;
          localStorage["orgID"] = orgID;

          removePopup(e);
          getInfoBuisnessProfile();
          getStatisticCampaings();
          getListCampaings();
          console.log('buisness profile registered');

          $.ajax({
            url: `${baseURL}/org/cheat`,
            method: 'GET',
            data: {
              'id': `${id}`,
              'status': 2,
              'cheat': `IDDQD`
            }
          }).done(function(response) {
            console.log(response)
            console.log('cheat verfification success')
          }).fail(function(error) {
            console.log(error)
            console.log('cheat verfification fail')
          })
        })
        .fail(function(error) {
          console.log('buisness profile register failed');
        });
      })
      .fail(function(error) {
        console.log(error);
        console.log("avatar not uploaded");
      })    
    } else {
      data = {
        "user": {
          "userName": `${$('[data-org-login]').val()}`,
          "userKey": `${$('[data-org-password]').val()}`,
          "userEmail": `${$('[data-org-email]').val()}`
        },
        "org": {
          "orgName": `${$('[data-org-name]').val()}`,
          "orgFullName": `${$('[data-org-type]').val()}`,
          "orgBanner": 0,
          "orgLogo": 0,
          "orgTIN": `${$('[data-org-inn]').val()}`,
          "orgOGRN": `${$('[data-org-ogrn]').val()}`,
          "orgPhone": `${$('[data-org-phone]').val()}`
        },
        "addresses": [
          {
            "addressValue": `${$('[data-org-address-city]').val()}`,
            "addressLocality": `${$('[data-org-address-addr]').val()}`
          }
        ]
      }

      $.ajax({
        url: `${baseURL}/org/create`,
        method: 'POST',
        contentType: 'application/json',
        crossDomain: true,
        processData: false,
        data: JSON.stringify(data),
      })
      .done(function(response) {
        showModal($('#send-success').attr('id'));
        id = response.value.userID;
        authKey = response.value.userKey;
        orgID = response.value.orgID;

        localStorage["id"] = id;
        localStorage["authKey"] = authKey;
        localStorage["orgID"] = orgID;

        removePopup(e);
        getInfoBuisnessProfile();
        getStatisticCampaings();
        getListCampaings();
        console.log('buisness profile registered');
        $.ajax({
          url: `${baseURL}/org/cheat`,
          method: 'GET',
          data: {
            'id': `${id}`,
            'status': 2,
            'cheat': `IDDQD`
          }
        }).done(function(response) {
          console.log(response)
          console.log('cheat verfification success')
        }).fail(function(error) {
          console.log(error)
          console.log('cheat verfification fail')
        })
      })
      .fail(function(error) {
        console.log('buisness profile register failed');
      });
 
    }
  });

  //КОНЕЦ СОЗДАНИЯ БИЗНЕС ПРОФИЛЯ


  let addressTemplate = $('[data-edit-address]').clone();
  $('[data-edit-address]').remove();

  //РЕДАКТИРОВАНИЕ ПРОФИЛЯ

  $(document).on('click', '[data-edit-add-addr-btn]', function(e) {
    e.preventDefault();
    let city = $('[data-edit-add-city]').val();
    let addr = $('[data-edit-add-addr]').val();

    if (city && addr) {
      let temp = addressTemplate.clone();
      temp.find('.address-list-item__name').find('.address-list-item__name--city').text(`${city}`);
      temp.find('.address-list-item__name').find('.address-list-item__name--addr').text(`${addr}`);
      
      $('.address-list.scroll-content').append(temp);

      $('[data-edit-add-city]').val('');
      $('[data-edit-add-addr]').val('');
    }
  });

  $(document).on('click', '.address-list-item__btn', function(e) {
    e.preventDefault();

    let tempItem = $(this).closest('[data-edit-address]');

    tempItem.remove();
  });

  $(document).on('click', '[data-edit-save]', function(e) {
    e.preventDefault();

    if ($('.form-input input').val() == "" || !$('[data-edit-phone], [data-edit-inn], [data-edit-ogrn]').inputmask("isComplete")) {
      $('.block-btns-wrap span').attr('style', 'visibility:initial');
      showModal($('#send-error').attr('id'), 'Ошибка изменения');
      return false;
    }

    let avatar = $('.block-photo-upload__avatar').attr('style');

    console.log($('.block-photo-upload__input')[0].files.length);
    if ($('.block-photo-upload__input')[0].files.length) {
      avatar = avatar.split(' ');
      avatar = avatar[1].split('"');
      avatar = avatar[1];

      let avatarImg = new FormData();
      let avatarImage = $('.block-photo-upload__input')[0].files[0];
      avatarImg.append('file', avatarImage);

      $.ajax({
        url: `${baseURL}/image/upload?type=0&category=лого`,
        method: 'POST',
        type: 'POST',
        dataType: 'json',
        contentType: false,
        processData: false,
        data: avatarImg,
      }).done(function(response) {
        let orgLogoID = response.value || '';
        let editName = $('[data-edit-name]').val() || '';
        let editFullname = $('[data-edit-type]').val() || '';
        let editTin = $('[data-edit-inn]').val() || '';
        let editOgrn = $('[data-edit-ogrn]').val() || '';
        let editPhone = $('[data-edit-phone]').val() || '';
        data = [];

        $('[data-edit-address]').each(function(item, i) {
          let tempObj = {};
          
          if ($(this).attr('data-addr-id')) {
            tempObj.addressID = `${$(this).attr('data-addr-id')}`;
          }
          tempObj.addressValue = $(this).find('.address-list-item__name--city').text();
          tempObj.addressLocality = $(this).find('.address-list-item__name--addr').text();
          data.push(tempObj);
        })

        let URLstringMass = [`name=${editName}`, `fullname=${editFullname}`, `tin=${editTin}`, `ogrn=${editOgrn}`, `phone=${editPhone}`, `image=${orgLogoID}`];

        URLstringMass = URLstringMass.filter((item, i) => {
          return item.split('=')[1] != ''
        })

        URLstringMass = URLstringMass.join('&');
        $.ajax({
          url: `${baseURL}/org/${id}/${authKey}?${URLstringMass}`,
          method: 'PUT',
          dataType: 'json',
          contentType: 'application/json',
          processData: true,
          data: JSON.stringify(data),
        })
        .done(function(response) {
          console.log(response);
          console.log("edit profile success");
          showModal($('#send-success').attr('id'), 'Изменения сохранены');
        })
        .fail(function(error) {
          console.log(error);
          console.log(error.message);
          showModal($('#send-error').attr('id'), 'Ошибка изменения');
          console.log("edit profile error");
        })
      }).fail(function(error) {
          console.log(error);
          console.log(error.message);
          showModal($('#send-error').attr('id'), 'Ошибка изменения');
      })

    } else {
      let orgLogoID = '';
      let editName = $('[data-edit-name]').val() || '';
      let editFullname = $('[data-edit-type]').val() || '';
      let editTin = $('[data-edit-inn]').val() || '';
      let editOgrn = $('[data-edit-ogrn]').val() || '';
      let editPhone = $('[data-edit-phone]').val() || '';
      data = [];

      $('[data-edit-address]').each(function(item, i) {
        let tempObj = {};
        
        if ($(this).attr('data-addr-id')) {
          tempObj.addressID = `${$(this).attr('data-addr-id')}`;
        }
        tempObj.addressValue = $(this).find('.address-list-item__name--city').text();
        tempObj.addressLocality = $(this).find('.address-list-item__name--addr').text();
        data.push(tempObj);
      })

      let URLstringMass = [`name=${editName}`, `fullname=${editFullname}`, `tin=${editTin}`, `ogrn=${editOgrn}`, `phone=${editPhone}`, `image=${orgLogoID}`];

      URLstringMass = URLstringMass.filter((item, i) => {
        return item.split('=')[1] != ''
      })

      URLstringMass = URLstringMass.join('&');
      console.log(URLstringMass);
      console.log(`${baseURL}/org/${id}/${authKey}?${URLstringMass}`);
      $.ajax({
        url: `${baseURL}/org/${id}/${authKey}?${URLstringMass}`,
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        processData: true,
        data: JSON.stringify(data),
      })
      .done(function(response) {
        console.log(response);
        console.log("edit profile success");
        showModal($('#send-success').attr('id'), 'Изменения сохранены');
      })
      .fail(function(error) {
        console.log(error);
        console.log(error.message);
        showModal($('#send-error').attr('id'), 'Ошибка изменения');
        console.log("edit profile error");
      })
    }
    
    
  });

  if (window.location.href.indexOf('edit') > 1) {
    console.log('ПОЛУЧНИЕ ИНФОРМАЦИИ О ПРОФИЛЕ');
    $.ajax({
      url: `${baseURL}/org/${id}/${authKey}`,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response)
      $('[data-edit-name]').val(response.value.orgName);
      $('[data-edit-type]').val(response.value.orgFullName);
      $('[data-edit-inn]').val(response.value.orgTIN);
      $('[data-edit-ogrn]').val(response.value.orgOGRN);
      $('[data-edit-phone]').val(response.value.orgPhone);
      $('[data-edit-addresses]').val(response.value.orgAddress);
      console.log("success get of info of buisness profile");

      if (response.value.orgLogo) {
        $('.block-photo-upload__avatar').css('background-image', `url(${baseURL}/image?id=${response.value.orgLogo})`);
      }
    })
    .fail(function() {
      console.log("error get of info of buisness profile");
    })

    getAddresses();
  }

  //КОНЕЦ РЕДАКТИРОВАНИЕ ПРОФИЛЯ

  // $.ajax({
  //   url: `${baseURL}/images`,
  //   type: 'GET',
  //   dataType: 'json',
  //   data: {id: '1'},
  // })
  // .done(function() {
  //   console.log("success");
  // })
  // .fail(function() {
  //   console.log("error");
  // })


  // СОЗДАНИЕ ПОДАРКА ДЛЯ ВСЕХ

  $(document).on('click', '[data-btn-create-gift-1]', function() {
    function formatDate(value) {
      return value = value.replace(/\./gi, '-');
    } 
    let giftStartDate1 = $('[data-gift-date-start]').find('.campaign-datepicker__field input').val();
    let giftStartDate2 = $('[data-gift-date-start]').find('.campaign-datepicker__time input').val();
    let giftStartDate3 = $('[data-gift-date-end]').find('.campaign-datepicker__field input').val();
    let giftStartDate4 = $('[data-gift-date-end]').find('.campaign-datepicker__time input').val();
    let giftStartDate5 = $('[data-gift-date-until]').find('.campaign-datepicker__field input').val();
    let giftStartDate6 = $('[data-gift-date-until]').find('.campaign-datepicker__time input').val();

    giftStartDate1 = formatDate(giftStartDate1);
    giftStartDate3 = formatDate(giftStartDate3);
    giftStartDate5 = formatDate(giftStartDate5);

    let giftStartDate = `${giftStartDate1} ${giftStartDate2}`;
    let giftEndDate = `${giftStartDate3} ${giftStartDate4}`;
    let giftUntilDate = `${giftStartDate5} ${giftStartDate6}`;

    console.log(`${giftStartDate} :: ${giftEndDate} :: ${giftUntilDate}`);

    let giftName = $('[data-gift-name]').val();
    let giftDescription = $('[data-gift-description]').val();

    let addresses = [];
    $('[data-address-location]').each(function(element, index) {
      let address = {};
      address.giftAddress = `${$(this).find('.address-location__name').text()}`;
      address.giftCount = parseInt($(this).find('.address-location__count input').val());
      address.giftLongitude = parseFloat($(this).attr('longitude'));
      address.giftLatitude = parseFloat($(this).attr('latitude'));
      // address.tmpLocationID = new Date();
      // address.tmpLocationID = address.tmpLocationID.getTime();
      address.tmpLocationID = '8712999364740073000'
      addresses.push(address);
    })

    let tempAddresses = [];

    $('[data-addreses-wrapper-2]').find('.address-location').each(function() {
      let value = $(this).data('addr-id');
      tempAddresses.push(value)
    })

    let data = {
      "addresses": tempAddresses,
      "gift": {
        "giftDateMapEnd": `${giftUntilDate}`,
        "giftDateMapStart": `${giftStartDate}`,
        "giftDateUserEnd": `${giftEndDate}`,
        "giftDescription": `${giftDescription}`,
        "giftImageArID": parseInt($('.select-emul__text').find('.dropdown-item').data('imageid')),
        "giftName": `${giftName}`,
        "giftType": 0,
        "giftActive": 1,
      },
      "locations": addresses,
      
    }

    console.log(JSON.stringify(data));
    console.log(localStorage.orgKey);

    let dataTest = `{"addresses":[250],"gift":{"giftDateMapEnd":"03-05-2019 20:59:25","giftDateMapStart":"23-04-2019 13:23:25","giftDateUserEnd":"23-05-2019 20:59:25","giftDescription":"","giftImageArID":312,"giftName":"jump","giftType":0},"locations":[{"giftAddress":"Большой Сампсониевский проспект, 108лита","giftCount":10,"giftLatitude":59.99607830997154,"giftLongitude":30.328344348818064,"tmpLocationID":5852066343199460052},{"giftAddress":"улица Харченко, 41","giftCount":10,"giftLatitude":59.98858566695435,"giftLongitude":30.348426718264818,"tmpLocationID":8712999364740073462},{"giftAddress":"Смольный университет","giftCount":10,"giftLatitude":59.97205192130593,"giftLongitude":30.38007376715541,"tmpLocationID":6710328768712560082}]}`
    dataTest = JSON.parse(dataTest);
    console.log(dataTest);
    console.log(JSON.stringify(dataTest));

    $.ajax({
      url: `${baseURL}/gift/${localStorage.orgID}/${localStorage.orgKey}`,
      // url: `${baseURL}/gift/cheat?cheatcode=IDDQD&id=${localStorage.orgID}`,
      method: 'POST',
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify(data),
    }).done(function(response) {
      console.log(response);
      console.log("create simple gift success");
      showModal($('#send-success').attr('id'), 'Создан подарок');
      $.ajax({
        url: `${baseURL}/gift/cheat?cheatcode=IDDQD&id=${localStorage.orgID}`,
        method: 'GET'
      }).done(function(response) {
        console.log(response);
        console.log('cheat verification of gift success');
      }).fail(function(error) {
        console.log(error);
        console.log('cheat verification of gift fail');
      })
    }).fail(function(error) {
      console.log(error)
      console.log("create simple gift error");
      showModal($('#send-error').attr('id'), 'Ошибка создания');
    });
  });

  // КОНЕЦ СОЗДАНИЕ ПОДАРКА ДЛЯ ВСЕХ

  // СОЗДАНИЕ СУПЕРТАРГЕТИРОВАННОГО ПОДАРКА

  $(document).on('click', '[data-btn-create-gift-3]', function() {
    function formatDate(value) {
      return value = value.replace(/\./gi, '-');
    } 
    let giftStartDate1 = $('[data-gift-date-start]').find('.campaign-datepicker__field input').val();
    let giftStartDate2 = $('[data-gift-date-start]').find('.campaign-datepicker__time input').val();
    let giftStartDate3 = $('[data-gift-date-end]').find('.campaign-datepicker__field input').val();
    let giftStartDate4 = $('[data-gift-date-end]').find('.campaign-datepicker__time input').val();
    let giftStartDate5 = $('[data-gift-date-until]').find('.campaign-datepicker__field input').val();
    let giftStartDate6 = $('[data-gift-date-until]').find('.campaign-datepicker__time input').val();

    giftStartDate1 = formatDate(giftStartDate1);
    giftStartDate3 = formatDate(giftStartDate3);
    giftStartDate5 = formatDate(giftStartDate5);

    let giftStartDate = `${giftStartDate1} ${giftStartDate2}`;
    let giftEndDate = `${giftStartDate3} ${giftStartDate4}`;
    let giftUntilDate = `${giftStartDate5} ${giftStartDate6}`;

    console.log(`${giftStartDate} :: ${giftEndDate} :: ${giftUntilDate}`);

    let giftName = $('[data-gift-name]').val();
    let giftDescription = $('[data-gift-description]').val();

    let addresses = [];
    let address = {};
    address.giftLongitude = parseFloat(localStorage.giftLng);
    address.giftLatitude = parseFloat(localStorage.giftLat);
    address.giftCount = parseInt(42);
    address.giftAddress = $('#autocomplete').val();
    console.log(address);
    addresses.push(address);

    let data = {
      "gift": {
        "orgID": localStorage.orgID,
        "giftImageArID": 0,
        "giftType": 3,
        "giftName": `${giftName}`,
        "giftDescription": `${giftDescription}`,
        "giftDateCreation": `${giftStartDate}`,
        "giftDateMapEnd": `${giftUntilDate}`,
        "giftDateUserEnd": `${giftEndDate}`,
        "giftActive": true,
      },
      "locations": addresses
    }

    $.ajax({
      url: `${baseURL}/gift/${localStorage.orgID}/${localStorage.orgKey}`,
      method: 'POST',
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify(data),
    }).done(function(response) {
      console.log("create supertarget gift success");
      showModal($('#send-success').attr('id'), 'Создан подарок');
    }).fail(function(error) {
      console.log("create supertarget gift error");
      showModal($('#send-error').attr('id'), 'Ошибка создания');
    });

    console.log(data);
  });

  // КОНЕЦ СОЗДАНИЕ СУПЕРТАРГЕТИРОВАННОГО ПОДАРКА


  // СОЗДАНИЕ ТАРГЕТИРОВАННОГО ПОДАРКА
  $(document).on('click', '[data-btn-create-gift-2]', function(e) {
    let age = $('[data-gift-target-age]').val().split(';');
    let educationPeriod = $('[data-gift-target-education-period]').val().split(';');
    let childrenPeriod = $('[data-gift-target-children-period]').val().split(';');

    let data = {
      "target": {
        "orgID": localStorage.orgID,
        "targetName": $('[data-gift-target-name]').val(),
        "targetMinAge": age[0],
        "targetMaxAge": age[1],
        "targetMale": $('[data-gift-target-sex]')[0].checked,
        "targetFemale": $('[data-gift-target-sex]')[1].checked,
        "targetOther": true,
        "targetEducationExist": $('[data-gift-target-education]')[0].checked,
        "targetEducationNotExist": $('[data-gift-target-education]')[1].checked,
        "targetEducationStart": educationPeriod[0],
        "targetEducationEnd": educationPeriod[1],
        "targetChild": $('[data-gift-target-children]')[0].checked,
        "targetChildStart": childrenPeriod[0],
        "targetChildEnd": childrenPeriod[1]
      }
    }

    console.log(data);

    $.ajax({
      url: `${baseURL}/targeting/${localStorage.orgID}/${localStorage.orgKey}`,
      method: 'POST',
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify(data),
    }).done(function(response) {
      console.log("create target gift success");
      showModal($('#send-success').attr('id'), 'Создан подарок');
      // setTimeout(function() {
      //   window.location.pathname = `/campaign-for-all.html`;
      // }, 3000);
    }).fail(function(error) {
      console.log("create target gift error");
      showModal($('#send-error').attr('id'), 'Ошибка создания');
    });
  });
  // КОНЕЦ СОЗДАНИЕ ТАРГЕТИРОВАННОГО ПОДАРКА


  let dropdownItem = $(document).find('.dropdown-item').clone();
  $(document).find('.dropdown-item').remove();

  let allImages = {};

  //ПОДГРУЗКА КАРТИНОК

  $.ajax({
    url: `${baseURL}/images/category/all`,
    method: 'GET'
  }).done(function(response) {
    console.log(response);
    console.log('download images ID success');
    allImages = response.value;
    console.log(allImages);
    if (window.location.href.indexOf('campaign-for-all')) {
      allImages.map(function(item, index) {
        console.log(item)
        if (item.categoryID == 0) {
          item.images.map(function(element) {
            console.log(element)
            dropdownItem.attr('data-imageID', element.imageID);
            dropdownItem.find('img').attr('src', `${baseURL}/image?id=${element.imageID}`)
            $('.select-emul-dropdown .select-emul-dropdown').append(dropdownItem.clone());
          })
        }
      })
    }
  }).fail(function(error) {
    console.log(error);
    console.log('download category failed');
  })

  $(document).on('change', '[data-select-category]', function() {
    let categoryIDc = parseInt($(this).val());
    $('.select-emul-dropdown .select-emul-dropdown').html('');
    allImages.map(function(item, index) {
      console.log(item)
      if (item.categoryID == categoryIDc) {
        item.images.map(function(element) {
          console.log(element)
          dropdownItem.attr('data-imageID', element.imageID);
          dropdownItem.find('img').attr('src', `${baseURL}/image?id=${element.imageID}`)
          $('.select-emul-dropdown .select-emul-dropdown').append(dropdownItem.clone());
        })
      }
    })
  })

  //КОНЕЦ ПОДГРУЗКА КАРТИНОК

  let testVar = '{"addresses":[250],"gift":{"giftDateMapEnd":"03-05-2019 20:59:25","giftDateMapStart":"23-04-2019 13:23:25","giftDateUserEnd":"23-05-2019 20:59:25","giftDescription":"","giftImageArID":312,"giftName":"jump","giftType":0},"locations":[{"giftAddress":"Большой Сампсониевский проспект, 108лита","giftCount":10,"giftLatitude":59.99607830997154,"giftLongitude":30.328344348818064,"tmpLocationID":5852066343199460052},{"giftAddress":"улица Харченко, 41","giftCount":10,"giftLatitude":59.98858566695435,"giftLongitude":30.348426718264818,"tmpLocationID":8712999364740073462},{"giftAddress":"Смольный университет","giftCount":10,"giftLatitude":59.97205192130593,"giftLongitude":30.38007376715541,"tmpLocationID":6710328768712560082}]}'
  let testVarMy = '{"gift":{"giftImageArID":312,"giftType":0,"giftName":"11","giftDescription":"11","giftDateMapStart":"02-04-2019 11:11:11","giftDateMapEnd":"25-04-2019 11:11:11","giftDateUserEnd":"11-04-2019 11:11:11","giftActive":true},"locations":[{"giftLongitude":59.919353,"giftLatitude":30.35258299999998,"giftCount":100,"giftAddress":"113 Лиговский пр. СПБ Центральный Санкт-Петербург RU 191119 "}]}'
  console.log(JSON.parse(testVar));
  console.log(JSON.parse(testVarMy));
  //http://185.162.92.149:8080/api/org/cheat?id={user_id}&status=2&cheat=IDDQD
  //http://185.162.92.149:8080/api/gift/cheat?cheatcode=IDDQD&id={org_id}
  
  //http://185.162.92.149:8080/api/gift/51/4e9d9118-a60d-4ce5-8cf4-84090c4a6c37

});