const backgroundColor = document.getElementById("background-color").value;
const squares = document.getElementById("squares").value;
const cornerSquarestype = document.getElementById("cornerSquaretype").value;
const pixels = document.getElementById("pixels").value;
const cornersDot = document.getElementById("cornerDots").value;
const cornersDottype = document.getElementById("cornerDotstype").value;
const pixelsType = document.getElementById("pixels-type").value;
const imageInput = document.getElementById("image-input").files[0];
const inputs = document.querySelectorAll(".entervalue");

//state of app
const options = {
    backgroundOptions: {
        color: backgroundColor
    },
    dotsOptions: {
        color: pixels,
        type: pixelsType,
        },
    cornersSquareOptions: {
        color: squares,
        type:cornerSquarestype
    },
    cornersDotOptions: {
        color: cornersDot,
        type: cornersDottype
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 8
    },
};
// for changing color
function colorchange(e) {
    console.log(e.target.value)
    const a = document.querySelectorAll('.inputContainer');
    let i = 0;
    for (let j = 0; j < a.length; j++) {
        if (a[j].style.display !== 'none') {
            i = j;
        }
    }   
    // for changing  shape, color and adding image in the qrcode-1 from the library 
    switch (e.target.name) {
        case 'background-color':
            options.backgroundOptions.color = e.target.value;
            break;
        case 'squares':
            options.cornersSquareOptions.color = e.target.value;
            break;
        case 'cornerSquaretype':
            options.cornersSquareOptions.type = e.target.value;
            break;
        case 'pixels':
            options.dotsOptions.color = e.target.value;
            break;
        case 'pixels-type':
            options.dotsOptions.type = e.target.value;
            break;
        case 'cornerDotstype':
            options.cornersDotOptions.type = e.target.value;
            break;
        default:
            options.cornersDotOptions.color = e.target.value;
    }  
    console.log( options)
    console.log('value',inputs[i].value)
    generateQRCode('qrcode-1', inputs[i].value, options)
};
function generateQRCode(qrId, text, options) {
    // customizing the qrcode-1 on the basis of library used for generating qrcode
    const qrCodeElement = document.getElementById(qrId);
    qrCodeElement.innerHTML = ""; // Clear previous content 
    // Customize options for qrcode-1
    if (qrId === "qrcode-1") {
        const qrOptions = {
            width: 270,
            height: 270,
            data: text,
            ...options,
        };
        const imageInput = document.getElementById("image-input").files[0];

        if (imageInput) {
            const reader = new FileReader();
            reader.onload = function (event) {
                qrOptions.image = event.target.result;
                new QRCodeStyling(qrOptions).append(qrCodeElement);
            };
            reader.readAsDataURL(imageInput);
        } else {
            new QRCodeStyling(qrOptions).append(qrCodeElement);
        }
    }
}
var numberofselectButtons = document.querySelectorAll(".selectbutton").length;
const inputLength = document.querySelectorAll(".entervalue").length;
const errorMessage = document.querySelectorAll(".errormessage");
const inputContainer = document.querySelectorAll(".inputContainer");
const urlError= document.getElementById('url-p');
 const smsError=document.getElementById('sms-p');
 const phoneError= document.getElementById('phone-p');
 const emailError= document.getElementById('email-p');
//  urlError.style.display = 'block';
console.log(inputLength);
//  loop for entering  the data/text/url etc on the basis of no. of fields given
for (let i = 0; i < inputLength; i++) {
    inputs[i].addEventListener("input", function () {
        checkValidation(inputs[i].value,i)
        
        document.getElementById("qrcode").innerHTML = "";
        var user_input = inputs[i].value;
        const qr = new QRCode(document.getElementById("qrcode"), user_input);
        console.log(user_input, qr);
        document.getElementById("qrcode-1").innerHTML = "";
        var user_input = inputs[i].value;
        generateQRCode("qrcode-1", user_input, options);

    });
}
// for error messages 
function checkValidation (inputValue,i){
    var urlPattern = /\.com$/;
    urlError.innerHTML = (i === 0 && inputValue.match(urlPattern)) ? "URL is valid" : "Please enter a valid URL";
    var phonePattern = /^\d{6,10}$/;
    smsError.innerHTML = (i === 1 && inputValue.match(phonePattern)) ? "Number is valid to send message" : "Please enter a valid number to send message";
    var phonePattern = /^\d{6,10}$/;
    phoneError.innerHTML = (i === 3 && inputValue.match(phonePattern)) ? "Number is valid " : "Please enter a valid number";
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.innerHTML = (i === 4 && inputValue.match(emailPattern)) ? "Email is valid " : "Please enter a valid Email";
} 
// loop for changing fields on the basis of button 
for (let i = 0; i < numberofselectButtons; i++) {
    if (i !== 0) {
        inputContainer[i].style.display = 'none';
       if(i !==0){
        errorMessage[i].style.display='none';
       }

    }
    
    
    document.querySelectorAll(".selectbutton")[i].addEventListener("click", function () {

        
        urlError.style.display = (i !== 0) ? 'none' : 'block';
        smsError.style.display = (i !== 1) ? 'none' : 'block';
        phoneError.style.display = (i !== 2) ? 'none' : 'block';
        emailError.style.display = (i !== 3) ? 'none' : 'block';
        console.log(i);

        for (let j = 0; j < numberofselectButtons; j++) {

            if (j == i) {
                inputContainer[i].style.display = 'block';
                // let elementCount = inputContainer[i].childElementCount;  

            }
            else {
                inputContainer[j].style.display = 'none';

            }
        }
    });
}
function copyQR() {
    var img = document.querySelector('#qrcode-1').querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    canvas.toBlob((blob) => {
        navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
        ]);
    }, 'image/png');
}
function downloadQR() {
    var canvas = document.querySelector('#qrcode-1 canvas');

    if (canvas) {
        var imageData = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.download = 'qrcode-1.png';
        link.href = imageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    } else {
        console.error("QR code canvas element not found.");
    }
}
