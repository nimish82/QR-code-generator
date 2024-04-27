const backgroundColor = document.getElementById("background-color").value;
const squares = document.getElementById("squares").value;
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
        type: pixelsType
       
    },
    cornersSquareOptions: {
        color: squares,
        

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
    if (e.target.name === 'background-color') {
        options.backgroundOptions.color = e.target.value
    }else if (e.target.name == 'squares'  ) {
        options.cornersSquareOptions.color = e.target.value
        //  options.cornersSquareOptions.type= e.target.value
        
    } 
    else if (e.target.name == 'pixels' ) {
        options.dotsOptions.color = e.target.value
         
    }
    else if (e.target.name == 'pixels-type'){
        options.dotsOptions.type = e.target.value;
    }
     else  {
        // options.cornersDotOptions.type = e.target.value

        options.cornersDotOptions.color = e.target.value
        // console.log(cornersDotOptions.type);

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
console.log(inputLength);
//  loop for entering  the data/text/url etc on the basis of no. of fields given
for (let i = 0; i < inputLength; i++) {
    inputs[i].addEventListener("input", function () {

        console.log('myinputs',inputs[i])

        console.log('input length',inputLength)

        document.getElementById("qrcode").innerHTML = "";
        var user_input = inputs[i].value;
        const qr = new QRCode(document.getElementById("qrcode"), user_input);
        console.log(user_input, qr);
        document.getElementById("qrcode-1").innerHTML = "";
        var user_input = inputs[i].value;
        generateQRCode("qrcode-1", user_input, options);

    });
}
// loop for changing fields on the basis of button 
for (let i = 0; i < numberofselectButtons; i++) {
    if (i !== 0) {
        inputContainer[i].style.display = 'none';
    }

    document.querySelectorAll(".selectbutton")[i].addEventListener("click", function () {

        console.log(i);


        for (let j = 0; j < numberofselectButtons; j++) {

            if (j == i) {
                inputContainer[i].style.display = 'block';
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
