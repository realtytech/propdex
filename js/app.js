function showModal(type) {
    if (type == 'brochure') {
        $('#sellModal .modal-body').html(brochure_form_body);
        $("#sellModal").modal("show");
        localStorage.removeItem('myTimestamp');
    } else {
        // $('#sellModal .modal-body').html(document.getElementsByClassName('form-section')[0].innerHTML);
        $("#sellModal").modal("show");
        localStorage.removeItem('myTimestamp');
    }
}

// Allow numbers only in mobile field
function numbersonly(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode
    if (unicode != 8) { //if the key isn't the backspace key (which we should allow)
        if (unicode < 48 || unicode > 57) //if not a number
            return false //disable key press
    }
    // isValidOTP();
}

function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    // alert("You have entered an invalid email address!")
    return (false)
}

function queryParameter(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

$("#leadForm-popup").submit(function (e) {

    e.preventDefault();

    // handle button click
    $("#submit_button-popup").prop('disabled', true);
    $("#submit_button-popup").prop("value", "Processing....");
    $("#submit_button_mobile").prop('disabled', true);
    $("#submit_button_mobile").prop("value", "Processing....");
    $("#submit_button").prop('disabled', true);
    $("#submit_button").prop("value", "Processing....");
    var formName = "Popup-Form";

    // Query Params
    var currentUrl = window.location.href;

    var d = new Date();

    // form Data
    var name = $("#name-popup").val();
    var email = $("#email-popup").val();
    var mobile = $("#mobile-popup").val();
    if (name == "") {
        alert('Please enter your name');
        return;
    }

    if (email == "") {
        alert('Please enter your email id');
        return;
    } else {
        if (!ValidateEmail(email)) {
            alert('Please enter a valid email id');
            return;
        }

    }
    if (mobile == "") {
        alert('Please enter your valid mobile number');
        return;
    } else {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(mobile)) {
            alert('Please enter your valid 10 digit mobile number');
            return;
        }
    }


    // var srd = selectSRD(utm_source, utm_campaign);
    var srd = queryParameter('srd', currentUrl);
    if (!srd) srd = '7015g0000004xf7';

    var project = 'Arham';
    var utm_source = queryParameter('utm_source',currentUrl);
    var utm_medium = queryParameter('utm_medium',currentUrl);
    var sourceMapping = { 'Google_Brand%20Search' : "Google Search",
        'google_display': "Google Display",
        "Google%20Discovery": "Google Discovery",
        "":"Website"
    }

    var source  = (utm_medium) ? sourceMapping[utm_medium] : "Website";
    
    var data = {
        "name": name,
        "mobile": mobile,
        "email": email,
        "source": source,
        "comment":"URL:"+currentUrl.substring(0,255)+" UTM Source:"+utm_source+" UTM Medium:"+utm_medium,
        "sub_source":"Brochure",
        "project": project
    
    }
        storeLeadInDB(name, email, mobile, JSON.stringify(data), formName);
        setTimeout(function redirect_response() { window.location.href = "brochure.pdf" }, 500)
        return;

});




$("#leadForm").submit(function (e) {

    e.preventDefault();

    // handle button click
    $("#submit_button-popup").prop('disabled', true);
    $("#submit_button-popup").prop("value", "Processing....");
    $("#submit_button").prop('disabled', true);
    $("#submit_button").prop("value", "Processing....");
    $("#submit_button_mobile").prop('disabled', true);
    $("#submit_button_mobile").prop("value", "Processing....");
    var formName = "Desktop-Form";

    // Query Params
    var currentUrl = window.location.href;
    // var utm_source = queryParameter('utm_source', currentUrl);
    // var utm_campaign = queryParameter('utm_campaign', currentUrl)

    var d = new Date();

    // form Data
    var name = $("#name").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    if (name == "") {
        alert('Please enter your name');
        return;
    }

    if (email == "") {
        alert('Please enter your email id');
        return;
    } else {
        if (!ValidateEmail(email)) {
            alert('Please enter a valid email id');
            return;
        }

    }
    if (mobile == "") {
        alert('Please enter your valid mobile number');
        return;
    } else {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(mobile)) {
            alert('Please enter your valid 10 digit mobile number');
            return;
        }
    }


    // var srd = selectSRD(utm_source, utm_campaign);
    var srd = queryParameter('srd', currentUrl);
    if (!srd) srd = '7015g0000004xf7';

    var project = 'Hubtown Harmony';
    var utm_source = queryParameter('utm_source',currentUrl);
    var utm_medium = queryParameter('utm_medium',currentUrl);
    var sourceMapping = { 'Google_Brand%20Search' : "Google Search",
        'google_display': "Google Display",
        "Google%20Discovery": "Google Discovery",
        "":"Website"
    }

    var source  = (utm_medium) ? sourceMapping[utm_medium] : "Website";
    
    var data = {
        "name": name,
        "mobile": mobile,
        "email": email,
        "source": source,
        "comment":"URL:"+currentUrl.substring(0,255)+" UTM Source:"+utm_source+" UTM Medium:"+utm_medium,
        "sub_source":utm_medium,
        "project": project

    }
    storeLeadInEnrichr(data,formName);
    return;
    storeLeadInSFDC(data);
    return;

    $.ajax({
        url: "https://app.sell.do/api/leads/create",
        type: "post", //send it through get method
        data: {
            "sell_do[form][lead][name]": name,
            "sell_do[campaign][srd]": srd,
            "sell_do[form][lead][email]": email,
            "sell_do[form][lead][phone]": mobile,
            "api_key": 'c64d03d6e3f7962538b248e1415aa6a2',
            "form_id": "5fa62a37c825615ac5916737"
        },
        success: function (response) {
            console.log(JSON.parse(response));
            storeLeadInDB(name, email, mobile, JSON.stringify(response),formName);
            setTimeout(function redirect_response(){window.location.href = "response.html";}, 1000)
        },
        error: function (xhr) {
            //Do Something to handle error
            console.log("failure");
            // window.location.href = "thankyou.html";
        }
    });


});

$("#leadFormMobile").submit(function (e) {

    e.preventDefault();

    // handle button click
    $("#submit_button-popup").prop('disabled', true);
    $("#submit_button-popup").prop("value", "Processing....");
    $("#submit_button").prop('disabled', true);
    $("#submit_button").prop("value", "Processing....");
    $("#submit_button_mobile").prop('disabled', true);
    $("#submit_button_mobile").prop("value", "Processing....");
    var formName = "Mobile-Footer";
    // Query Params
    var currentUrl = window.location.href;
    // var utm_source = queryParameter('utm_source', currentUrl);
    // var utm_campaign = queryParameter('utm_campaign', currentUrl)

    var d = new Date();
    console.log("Hello");

    // form Data
    var name = $("#name").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var message = $("#message").val();
    if (name == "") {
        alert('Please enter your name');
        return;
    }
    console.log("Hello-Processing");
    if (email == "") {
        alert('Please enter your email id');
        return;
    } else {
        if (!ValidateEmail(email)) {
            alert('Please enter a valid email id');
            return;
        }

    }
    if (mobile == "") {
        alert('Please enter your valid mobile number');
        return;
    } else {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(mobile)) {
            alert('Please enter your valid 10 digit mobile number');
            return;
        }
    }

    console.log("Processing - 3");

    // var srd = selectSRD(utm_source, utm_campaign);
    var srd = queryParameter('srd', currentUrl);
    if (!srd) srd = '7015g0000004xf7';

    var project = 'Hubtown Harmony';
    var utm_source = queryParameter('utm_source',currentUrl);
    var utm_medium = queryParameter('utm_medium',currentUrl);
    var sourceMapping = { 'Google_Brand%20Search' : "Google Search",
        'google_display': "Google Display",
        "Google%20Discovery": "Google Discovery",
        "":"Website"
    }

var source  = (utm_medium) ? sourceMapping[utm_medium] : "Website";

var data = {
    "name": name,
    "mobile": mobile,
    "email": email,
    "source": source,
    "comment":"URL:"+currentUrl.substring(0,255)+" UTM Source:"+utm_source+" UTM Medium:"+utm_medium,
    "sub_source":message,
    "project": project

}
    storeLeadInDB(name, email, mobile, JSON.stringify(data), formName);
    alert("Your message has been received.")
    return;

    storeLeadInSFDC(data);


    $.ajax({
        url: "https://app.sell.do/api/leads/create",
        type: "post", //send it through get method
        data: {
            "sell_do[form][lead][name]": name,
            "sell_do[campaign][srd]": srd,
            "sell_do[form][lead][email]": email,
            "sell_do[form][lead][phone]": mobile,
            "api_key": 'c64d03d6e3f7962538b248e1415aa6a2',
            "form_id": "5fa62a37c825615ac5916737"
        },
        success: function (response) {
            console.log(JSON.parse(response));
            storeLeadInDB(name, email, mobile, JSON.stringify(response));
            setTimeout(function redirect_response(){window.location.href = "response.html";}, 1000)
        },
        error: function (xhr) {
            //Do Something to handle error
            console.log("failure");
            // window.location.href = "thankyou.html";
        }
    });


});


function storeLeadInDB(name, email, mobile, response, formName) {
    var currentUrl = window.location.href;
    var utm_source = queryParameter('utm_source', currentUrl);
    var utm_medium = queryParameter('utm_medium', currentUrl)
    var utm_campaign = queryParameter('utm_campaign', currentUrl)
    var utm_adgroup = queryParameter('utm_adgroup', currentUrl)
    var utm_keyword = queryParameter('utm_keyword', currentUrl)
    var utm_adset = queryParameter('utm_adset', currentUrl)
    var utm_ad = queryParameter('utm_ad', currentUrl)
    var utm_device = queryParameter('utm_device', currentUrl)
    var utm_site = queryParameter('utm_site', currentUrl)
    var utm_placement = queryParameter('utm_placement', currentUrl);
    var gclid = queryParameter('gclid', currentUrl);
    var fbclid = queryParameter('fbclid', currentUrl);
    var srd = queryParameter('srd', currentUrl);


    var project = 'Arham';
    var timestamp = Date();
    data = {
        "formId": String(Math.floor(Date.now() / 1000)),
        "name": name,
        "email": email,
        "mobile": mobile,
        "project": project,
        "lead_creation_date": timestamp,
        "utm_source": utm_source,
        "utm_medium": utm_medium,
        "utm_campaign": utm_campaign,
        "utm_adgroup": utm_adgroup,
        "utm_keyword": utm_keyword,
        "utm_adset": utm_adset,
        "utm_ad": utm_ad,
        "utm_device": utm_device,
        "utm_site": utm_site,
        "utm_placement": utm_placement,
        "gclid": gclid,
        "fbclid": fbclid,
        "response": response,
        "formName": formName,
        "url":currentUrl,
        "srd":srd

    }
    const formURL = 'https://dj2kxzt125.execute-api.ap-south-1.amazonaws.com/Prod/submitForm';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', formURL, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = response => {
        if (response.target.status === 200) {
            //   form.reset();
            console.error(JSON.parse(response));

            //   submitResponse.innerHTML = 'Form submitted. Success!';
        } else {
            //   submitResponse.innerHTML = 'Error! Please try again.';
            console.error(JSON.parse(response));
        }
    };

}
// Lazy Loading images

function isMobileTablet() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

var lazyloadImages = document.querySelectorAll("img.lazy");

lazyloadImages.forEach(function (img) {
    // console.log(isMobileTablet())
    if (!isMobileTablet()) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');

    }
});


document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function (img) {
                console.log(isMobileTablet())
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');

                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});



function showModal(type) {
    if (type == 'brochure') {
        $('#sellModal .modal-body').html(brochure_form_body);
        $("#sellModal").modal("show");
        localStorage.removeItem('myTimestamp');
    } else {
        // $('#sellModal .modal-body').html(document.getElementsByClassName('form-section')[0].innerHTML);
        $("#sellModal").modal("show");
        localStorage.removeItem('myTimestamp');
    }
}
$(document).on('change', 'div', function () {
    x = $('.selldof_row label')
    for (i = 0; i < x.length; i++) {
        if (x[i].innerText == 'Project') {
            x[i].parentNode.parentNode.style.display = 'none'
        }
    }
    console.log(x);
});


window.onscroll = function (e) {
    var myDaemon = '';
    localStorage.setItem('myTimestamp', Date.now());
    if (myDaemon) clearInterval(myDaemon);
    myDaemon = setInterval(function () {
        var TimeDiffinSeconds = (Date.now() - localStorage.myTimestamp) / 1000;
        if (TimeDiffinSeconds > 10) {
            showModal();
            clearInterval(myDaemon);
            localStorage.removeItem('myTimestamp');
        }
    }, 1000);
}

