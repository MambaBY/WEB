"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if(error === 0){  
            const values = Object.fromEntries(formData.entries());
            
            document.writeln("Имя: " + values.name + "</br>");
            document.writeln("E-mail: " + values.email + "</br>");
            document.writeln("Ваш пол: " + values.gender + "</br>");
            document.writeln("Тип фотосессии: " + values.typePhoto + "</br>");
            document.writeln("Сообщение: " + values.message + "</br>");
            document.writeln("Изображение: " + values.image.name);
            
            /*form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');

            }
            else{
                alert("Ошибка отправки формы!");
                form.classList.remove('_sending');
            }*/
        }
        else{
            alert('Заполните обязательные поля');
        }
    
    }

    //Required fields validation
    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req')

        for (let index =0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }
            else if(input.getAttribute("type") === "checkbox" && input.checked === false){
                    formAddError(input);
                    error++;
            }
            else{ 
                if(input.value === ''){
                    formAddError(input);
                    error++;
                   }
            }
            
        }
        return error;

    }

    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    //Function for checking email
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }


    //Add photo button

    const formImage = document.getElementById('formImage');

    const formPreview = document.getElementById('formPreview');
    
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file){
        if(!['image/jpeg', 'image/png'].includes(file.type)){
            alert('Разрешены только изображенияю');
            formImage.value = '';
            return;
        }
        if(file.size > 2 *1024 *1024){
            alert('Файл должен быть менее 2МБ');
            return;
        }

        var reader = new FileReader();
        reader.onload = function(e){
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function(e){
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }

});