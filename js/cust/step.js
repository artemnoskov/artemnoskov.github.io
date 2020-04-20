$( document ).ready(function() {
  alert('ok');
  $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body text-justify"><div class="card-header text-center"><h5>Внимание!</h5></div><p class="card-text">Cайт позволяет сгенерировать <b>код для отправки заявки</b> на получение цифрового пропуска по СМС. То, что вы получите по окончанию заполнения формы <b>не является пропуском!</b></p><p class="card-text">Для оформления заявки вы должны будете скопировать полученный код (сообщение) и <b>самостоятельно отправить его на номер <i>7377</i></b>. После этого вы получите ответ по СМС.</p><p class="card-text">Мы не собираем и не храним введенную вами информацию.</p><a id="start" class="btn btn-primary btn-block">Продолжить</a></div></div>');
});


$(document).on("click", "a.btn", function() {
  var id = $(this).attr('id');
  if (id == "start"){
    $( "div.dialog" ).html('<div class="dialog"><div class="card" style="width: 90%"><div class="card-body text-justify"><div class="card-header text-center"><h5>Выберите цель поездки</h5></div><ul class="list-group list-group-flush"><li class="list-group-item"><a href="#" id="forJob" class="btn target btn-outline-secondary btn-block">Для работающих</a></li><li class="list-group-item"><a href="#" id="forMed" class="btn target btn-outline-success btn-block">Для посещения медицинских организаций</a></li><li class="list-group-item"><a href="#" id="forOther" class="btn target btn-outline-info btn-block">Для иных целей</a></li><li class="list-group-item"><a href="#" id="forDuty" class="btn target btn-outline-warning btn-block">Для служащих</a></li></ul><a href="#" id="backToStart" class="btn btn-primary btn-block">В начало ↩</a></div></div></div>');
  }

  if (id == "backToStart"){
    location.reload();
  }

});

$(document).on("click", "a.btn.target", function() {
  var id = $(this).attr('id');

  if (id == "forJob"){
    window.target='1';
    //форма
    $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Организация</h5></div><form class="needs-validation" role="form"><div class="form-group"><input type="text" size="10" maxlength="10" class="form-control form-control-lg" id="formGroupInput1" name="OrgSNN" placeholder="ИНН организации" required></div><div class="form-group"><input type="text" class="form-control form-control-lg" id="formGroupInput2" name="OrgName" placeholder="Название организации"></div><button class="btn btn-success" id="submitButton" type="button">Далее</button></form><a href="#" id="backToTarget" class="btn btn-primary btn-block begging">В начало ↩</a></div></div>');

    //валидация
    validate();
    
    //далее к выбору документа
    $(document).on("click", "button#submitButton", function() {

      window.orgSnn = $('#formGroupInput1').val();
      window.orgName = $('#formGroupInput2').val();
      if ($('.needs-validation').bootstrapValidator('validate').has('.has-error').length==0){
        selectDocument();
        
      }
    });

  }

  if (id == "forMed"){
    window.target='2';

    //форма
    $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Медицинская организация</h5></div><form class="needs-validation" role="form"><div class="form-group"><input type="text" class="form-control form-control-lg" id="formGroupInput2" name="MedName" placeholder="Название организации" required></div><small id="HelpBlock" class="form-text text-muted">Дата рождения</small><div class="row"><div class="col-3"><select class="form-control form-control-lg" id="SelectDay"></select></div><div class="col-3"><select class="form-control form-control-lg" id="SelectMonth"></select></div><div class="col-4"><select class="form-control form-control-lg" id="SelectYear"></select></div></div><button class="btn btn-success" id="submitButton" type="button">Далее</button></form><a href="#" id="backToTarget" class="btn btn-primary btn-block begging">В начало ↩</a></div></div>');

    for (i = new Date().getFullYear(); i > 1900; i--)
    {
      $('#SelectYear').append($('<option />').val(i).html(i));
    }
    for (i = 1; i < 13; i++)
    {
      if (i<10){
        $('#SelectMonth').append($('<option />').val('0'+i).html('0'+i));
      }
      else{
        $('#SelectMonth').append($('<option />').val(i).html(i));
      }
    }
    for (i = 1; i < 32; i++)
    {
      if (i<10){
        $('#SelectDay').append($('<option />').val('0'+i).html('0'+i));
      }
      else{ 
        $('#SelectDay').append($('<option />').val(i).html(i));
      }
    }

    //валидация
    validate();
    
    //далее к выбору документа
    $(document).on("click", "button#submitButton", function() {
      window.medName = $('#formGroupInput2').val();
      window.birthDate = $('#SelectDay').val()+'.'+$('#SelectMonth').val()+'.'+$('#SelectYear').val();
      if ($('.needs-validation').bootstrapValidator('validate').has('.has-error').length==0){
        selectDocument();
        
      }
    });

  }

  if (id == "forOther"){
    window.target='3';
    
    //форма
    $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Иная цель</h5></div><form class="needs-validation" role="form"><div class="form-group"><input type="text" size="10" maxlength="20" class="form-control form-control-lg" id="formGroupInput1" name="TripCause" placeholder="Цель выхода" required></div><div class="form-group"><input type="text" class="form-control form-control-lg" id="formGroupInput2" name="TripAddr" placeholder="Адрес" required></div><button class="btn btn-success" id="submitButton" type="button">Далее</button></form><a href="#" id="backToTarget" class="btn btn-primary btn-block begging">В начало ↩</a></div></div>');

    //валидация
    validate();
    
    //далее к выбору документа
    $(document).on("click", "button#submitButton", function() {
      window.tripCause = $('#formGroupInput1').val();
      window.tripAddr = $('#formGroupInput2').val();
      if ($('.needs-validation').bootstrapValidator('validate').has('.has-error').length==0){
        selectDocument();
        
      }
    });
  }

  if (id == "forDuty"){
    window.target='4';
    //форма
    $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Служебное удостоверение</h5></div><form class="needs-validation" role="form"><div class="form-group"><input type="text" size="10" maxlength="50" class="form-control form-control-lg" id="formGroupInput1" name="DutyID" placeholder="Номер удостоверения" required></div><button class="btn btn-success" id="submitButton" type="button">Далее</button></form><a href="#" id="backToTarget" class="btn btn-primary btn-block begging">В начало ↩</a></div></div>');

    //валидация
    validate();
    
    //далее к выбору документа
    $(document).on("click", "button#submitButton", function() {
      window.dutyID = $('#formGroupInput1').val();

      if ($('.needs-validation').bootstrapValidator('validate').has('.has-error').length==0){
        selectDocument();
        
      }
    });

  }

  //если нажали на возврат к вбору цели
  $(document).on("click", "a.btn.begging", function() {
  var id = $(this).attr('id');

  if (id == "backToTarget"){
    alert('ok');
      location.reload();
    }

  });
});

//для работы с документами
function selectDocument(){
  window.series = '';
  window.number = '';
  $( "div.dialog" ).html('<div class="dialog"><div class="card" style="width: 90%"><div class="card-body text-justify"><div class="card-header text-center"><h5>Выберите тип документа</h5></div><ul class="list-group list-group-flush"><li class="list-group-item"><a href="#" id="rfPass" class="btn doc btn-outline-secondary btn-block">Паспорт гражданина РФ</a></li><li class="list-group-item"><a href="#" id="foreignPass" class="btn doc btn-outline-success btn-block">Иностранный паспорт</a></li><li class="list-group-item"><a href="#" id="otherDoc" class="btn doc btn-outline-info btn-block">Иной документ</a></li></ul><a href="#" id="backToTarget" class="btn btn-primary btn-block ">В начало ↩</a></div></div></div>');

  $(document).on("click", "a.btn.doc", function() {
    var id = $(this).attr('id');

    if(id=='rfPass'){
      window.docType = '1';
      //форма
      $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Данные документа</h5></div><form class="needs-validation" role="form"><div class="form-group"><input type="text" size="4" maxlength="4" class="form-control form-control-lg" id="formGroupInput1" name="Series" placeholder="Серия" required></div><div class="form-group"><input type="text" size="6" maxlength="6"class="form-control form-control-lg" id="formGroupInput2" name="Number" placeholder="Номер" required></div><button class="btn btn-success" id="submitButtonDoc" type="button">Далее</button></form><a href="#" id="backToTarget" class="btn btn-primary btn-block ">В начало ↩</a></div></div>');
      //валидация
      validate();
    }

    else{
      if(id=='foreignPass'){
        window.docType = '2';
      }

      if(id=='otherDoc'){
        window.docType = '3';
      }

      //форма
      $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Данные документа</h5></div><form class="needs-validation" role="form"><div class="form-group"><input type="text" maxlength="10" class="form-control form-control-lg" id="formGroupInput1" name="Series" placeholder="Серия"><small id="HelpBlock" class="form-text text-muted">Если у документа нет серии, оставьте поле пустым</small></div><div class="form-group"><input type="text" maxlength="30"class="form-control form-control-lg" id="formGroupInput2" name="Number" placeholder="Номер" required></div><button class="btn btn-success" id="submitButtonDoc" type="button">Далее</button></form><a href="#" id="backToTarget" class="btn btn-primary btn-block ">В начало ↩</a></div></div>');
    }
  });


  $(document).on("click", "button#submitButtonDoc", function() {
    if ($('.needs-validation').bootstrapValidator('validate').has('.has-error').length==0){
      window.series = $('#formGroupInput1').val();
      window.number = $('#formGroupInput2').val();
      selectTransport();
    }
  });

  //если нажали на возврат к вбору цели
  $(document).on("click", "a.btn", function() {
  var id = $(this).attr('id');

  if (id == "backToTarget"){
      location.reload();
    }

  });

}

//для работы с транспортом
function selectTransport(){
  window.auto = '';
  window.troika = '';
  window.strelka = '';
  window.otherTrans = '';

  $( "div.dialog" ).html('<div class="dialog"><div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Информация о способах передвижения</h5></div><ul class="list-group list-group-flush"><li class="list-group-item"><a href="#" id="auto" class="btn trans btn-outline-secondary btn-block">Ввести номер транспортного средства</a></li><li class="list-group-item"><a href="#" id="troika" class="btn trans btn-outline-success btn-block">Ввести номер карты "Тройка"</a></li><li class="list-group-item"><a href="#" id="strelka" class="btn trans btn-outline-info btn-block">Ввести номер карты "Стрелка"</a></li><li class="list-group-item"><a href="#" id="otherTransport" class="btn trans btn-outline-warning btn-block">Другое</a></li></ul><a href="#" id="backToTarget" class="btn btn-primary btn-block ">Назад к выбору цели ↩</a></div></div></div>');

  $(document).on("click", "a.btn.trans", function() {
    window.id = $(this).attr('id');

    if(id=='auto'){
      //форма
      $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Введите номер транспортного средства</h5></div><form class="needs-validation" role="form"><div class="form-group"><input type="text" size="8" maxlength="8" class="form-control form-control-lg" id="formGroupInput1" name="AutoNum" placeholder="АА123А12" required></div><button class="btn btn-success" id="submitButtonTrans" type="button">Далее</button></form><a href="#" id="backToTrans" class="btn btn-primary btn-block ">Назад к выбору транспорта ↩</a></div></div>');
      //валидация
      validate();

    }

    if(window.id =='troika'){
      //форма
      $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Введите номер карты "Тройка"</h5></div><form class="needs-validation" role="form"><div class="form-group"><input type="text" size="10" maxlength="10" class="form-control form-control-lg" id="formGroupInput1" name="TroikaNum" placeholder="0123456789" required></div><button class="btn btn-success" id="submitButtonTrans" type="button">Далее</button></form><a href="#" id="backToTrans" class="btn btn-primary btn-block ">Назад к выбору транспорта ↩</a></div></div>');
      //валидация
      validate();

    }

    if(window.id =='strelka'){
      //форма
      $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Введите номер карты "Стрелка"</h5></div><form class="needs-validation" role="form"><div class="form-group"><input type="text" size="11" maxlength="11" class="form-control form-control-lg" id="formGroupInput1" name="StrelkaNum" placeholder="0123456789" required></div><button class="btn btn-success" id="submitButtonTrans" type="button">Далее</button></form><a href="#" id="backToTrans" class="btn btn-primary btn-block ">Назад к выбору транспорта ↩</a></div></div>');
      //валидация
      validate();
    }

    if(window.id=='otherTransport'){
      window.otherTrans = '';
      createSMS();
    }
  });

  $(document).on("click", "button#submitButtonTrans", function() {
    if ($('.needs-validation').bootstrapValidator('validate').has('.has-error').length==0){
      alert ('call submitButtonTrans');
      if(window.id=='auto'){
        window.auto = $('#formGroupInput1').val();
      }
      if(window.id=='troika'){
        window.troika = $('#formGroupInput1').val();
      }
      if(window.id=='strelka'){
        window.strelka = $('#formGroupInput1').val();
      }
      createSMS();
    }
  });

  $(document).on("click", "a.btn", function() {
    var id = $(this).attr('id');

    if (id == "backToTrans"){

      $( "div.dialog" ).html('<div class="dialog"><div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>Информация о способах передвижения</h5></div><ul class="list-group list-group-flush"><li class="list-group-item"><a href="#" id="auto" class="btn trans btn-outline-secondary btn-block">Ввести номер транспортного средства</a></li><li class="list-group-item"><a href="#" id="troika" class="btn trans btn-outline-success btn-block">Ввести номер карты "Тройка"</a></li><li class="list-group-item"><a href="#" id="strelka" class="btn trans btn-outline-info btn-block">Ввести номер карты "Стрелка"</a></li><li class="list-group-item"><a href="#" id="otherTransport" class="btn trans btn-outline-warning btn-block">Другое</a></li></ul><a href="#" id="backToTarget" class="btn btn-primary btn-block ">Назад к выбору цели ↩</a></div></div></div>');
    }

  });

}

//функция возвращения к выбору цели
function createSMS(){
  //форма

  if (window.target=='1'){
    var msgText = 'Пропуск*'+window.target+'*'+window.docType+'*'+window.series+'*'+window.number+'*'+window.auto+'*'+window.troika+'*'+window.strelka+'*'+window.orgSnn+'*'+window.orgName;
  }

  if (window.target=='2'){
    var msgText = 'Пропуск*'+window.target+'*'+window.docType+'*'+window.series+'*'+window.number+'*'+window.birthDate+'*'+window.auto+'*'+window.troika+'*'+window.strelka+'*'+window.medName;
  }

  if (window.target=='3'){
    var msgText = 'Пропуск*'+window.target+'*'+window.docType+'*'+window.series+'*'+window.number+'*'+window.auto+'*'+window.troika+'*'+window.strelka+'*'+window.tripCause+'*'+window.tripAddr;
  }
  if (window.target=='4'){
    var msgText = 'Пропуск*'+window.target+'*'+window.docType+'*'+window.series+'*'+window.number+'*'+window.dutyID+'*'+window.auto+'*'+window.troika+'*'+window.strelka;
  }

  $( "div.dialog" ).html('<div class="card" style="width: 90%"><div class="card-body"><div class="card-header text-center"><h5>СМС создано</h5></div><form class="needs-validation resMSG" role="form"><div class="form-group"><textarea class="form-control" id="FormControlTextarea1" rows="3">'+ msgText +'</textarea></div></form></div></div>');

  if((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPhone/i))) {
    $('.resMSG').append('<button class="btn btn-success" id="sendSMS" type="button">Отправить</button>');
  }

  $('.resMSG').append('<button class="btn btn-primary" id="copySMS" type="button">Скопировать</button>');

  $(document).on("click", "button#sendSMS", function() {
    // for andriod
    if(navigator.userAgent.match(/Android/i)) {
      window.open("sms://7377/?body=encodeURIComponent('"+msgText+"'),'_blank'")
    }
    // for IOS
    if(navigator.userAgent.match(/iPhone/i)) {
      window.open("sms://7377/&body=body=encodeURIComponent('"+msgText+"'),'_blank'")
    }
  });

  $(document).on("click", "button#copySMS", function() {
    $('textarea#FormControlTextarea1').select();      
    document.execCommand("copy");
  });
}



//функция валидации
function validate(){
  $('.needs-validation').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        OrgSNN: {
          message: '⚠️ ИНН введен некорректно<br>',
          validators: {
              notEmpty: {
                  message: '⚠️ИНН не может быть незаполненным<br>'
              },
              stringLength: {
                  min: 10,
                  max: 10,
                  message: '⚠️ ИНН должен содержать ровно 10 знаков<br>'
              },
              regexp: {
                  regexp: /^[0-9]+$/,
                  message: '⚠️ ИНН должен содержать только цифры<br>'
              }
          }
        },
        //OrgName: {
          //message: '⚠️ ИНН введен некорректно<br>',
          //validators: {
              //notEmpty: {
                  //message: '⚠️ Название не может быть незаполненным<br>'
              //}
          //}
        //},
        Series: {
          message: '⚠️ Серия паспорта введена некорректно<br>',
          validators: {
              notEmpty: {
                  message: '⚠️ Серия паспорта не может быть незаполненной<br>'
              },
              stringLength: {
                  min: 4,
                  max: 4,
                  message: '⚠️ Серия паспорта должна содержать ровно 4 знака<br>'
              },
              regexp: {
                  regexp: /^[0-9]+$/,
                  message: '⚠️ Серия паспорта должна содержать только цифры<br>'
              }
          }
        },
        Number: {
          message: '⚠️ Номер паспорта введен некорректно<br>',
          validators: {
              notEmpty: {
                  message: '⚠️ Номер паспорта не может быть незаполненным<br>'
              },
              stringLength: {
                  min: 6,
                  max: 6,
                  message: '⚠️ Номер паспорта должен содержать ровно 6 знаков<br>'
              },
              regexp: {
                  regexp: /^[0-9]+$/,
                  message: '⚠️ Номер паспорта должен содержать только цифры<br>'
              }
          }
        },
        AutoNum: {
          message: '⚠️ Номер транспортного средства введен некорректно<br>',
          validators: {
              notEmpty: {
                  message: '⚠️ Номер транспортного средства не может быть незаполненным<br>'
              },
              stringLength: {
                  min: 6,
                  max: 6,
                  message: '⚠️ Номер транспортного средства должен содержать ровно 8 знаков<br>'
              },
              regexp: {
                  regexp: /(([А-Я]\d{3}[А-Я]{1,2})(\d{2,3})|(\d{4}[А-Я]{2})(\d{2})|(\d{3}C?D{1,2}\d{3})(\d{2})|([А-Я]{2}\d{3}[А-Я])(\d{2})|([А-Я]\d{4})(\d{2})|(\d{3}[А-Я])(\d{2})|(\d{4}[А-Я])(\d{2}))/i, 
                  message: '⚠️ Номер транспортного средства должен соответствовать формату<br>'
              }
          }
        },
        AutoNum: {
          message: '⚠️ Номер транспортного средства введен некорректно<br>',
          validators: {
              notEmpty: {
                  message: '⚠️ Номер транспортного средства не может быть незаполненным<br>'
              },
              stringLength: {
                  min: 6,
                  max: 6,
                  message: '⚠️ Номер транспортного средства должен содержать ровно 8 знаков<br>'
              },
              regexp: {
                  regexp: /(([А-Я]\d{3}[А-Я]{1,2})(\d{2,3})|(\d{4}[А-Я]{2})(\d{2})|(\d{3}C?D{1,2}\d{3})(\d{2})|([А-Я]{2}\d{3}[А-Я])(\d{2})|([А-Я]\d{4})(\d{2})|(\d{3}[А-Я])(\d{2})|(\d{4}[А-Я])(\d{2}))/i, 
                  message: '⚠️ Номер транспортного средства должен соответствовать формату<br>'
              }
          }
        },
        TroikaNum: {
          message: '⚠️ Номер карты введен некорректно<br>',
          validators: {
              notEmpty: {
                  message: '⚠️ Номер карты не может быть незаполненным<br>'
              },
              stringLength: {
                  min: 10,
                  max: 10,
                  message: '⚠️ Номер ткарты должен содержать ровно 10 знаков<br>'
              },
              regexp: {
                  regexp: /^[0-9]+$/, 
                  message: '⚠️ Номер карты должен содержать только цифры<br>'
              }
          }
        },
        StrelkaNum: {
          message: '⚠️ Номер карты введен некорректно<br>',
          validators: {
              notEmpty: {
                  message: '⚠️ Номер карты не может быть незаполненным<br>'
              },
              stringLength: {
                  min: 11,
                  max: 11,
                  message: '⚠️ Номер карты должен содержать ровно 11 знаков<br>'
              },
              regexp: {
                  regexp: /^[0-9]+$/, 
                  message: '⚠️ Номер карты должен содержать только цифры<br>'
              }
          }
        },
        tripCause: {
          validators: {
              notEmpty: {
                  message: '⚠️ Цель не может быть незаполненной<br>'
              },
              stringLength: {
                  min: 1,
                  max: 20,
                  message: '⚠️ Цель не может быть больше 20 знаков<br>'
              }
          }
        },
        DutyID: {
          validators: {
              notEmpty: {
                  message: '⚠️ Номер удостоверения не может быть незаполненным<br>'
              },
              stringLength: {
                  min: 1,
                  max: 50,
                  message: '⚠️ Номер удостоверения не может быть больше 50 знаков<br>'
              }
          }
        }
    }
});
}