{/* <script src="https://unpkg.com/@bitjson/qr-code@1.0.2/dist/qr-code.js"></script>
 if(i!=0){
        
            document.getElementById('url-p').style.display='none';  
    }
    else{

        document.getElementById('url-p').style.display='block';
    }
    if(i!=3 ){
        
        document.getElementById('email-p').style.display='none';  
}
else{

    document.getElementById('email-p').style.display='block';
}
if(i!=2 ){
        
    document.getElementById('number-p').style.display='none';  
}
else{

document.getElementById('number-p').style.display='block';
}

if(i==0){
    var urlPattern = /\.co$/;
    if (user_input.match(urlPattern)) {
        document.getElementById('url-p').innerHTML="URL is valid";
    }
     else {
        
        document.getElementById('url-p').innerHTML="Please enter a valid URL";
    }
}
if(i==3){
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user_input.match(emailPattern)) {
        document.getElementById('email-p').innerHTML="email is valid";
        
    } else {
        document.getElementById('email-p').innerHTML=" enter valid email";
    }
}if(i==1){}
if (i==2){
    var phonePattern = /^\d{6}$/;
    if (user_input.match(numberPattern)) {
        document.getElementById('number-p').innerHTML="Number is valid";
        
    } else {
        document.getElementById('number-p').innerHTML=" enter valid number";
    }
}


// new code 
var formFieldType = null;

function formType(id) {
    var formBox = document.getElementById('formBlock');
    formFieldType = id;
    console.log(formFieldType);
    switch (id) {

        case 'planText': {
            formBox.innerHTML = '<textarea name="planText" id="planText" class="form-control d-flex m-auto" cols="30" rows="10" placeholder="Enter Your Text Here" ></textarea>';
            break;
        }
        case 'siteUrl': {
            formBox.innerHTML = '<input type="text" name="siteUrl" id="siteUrl" class="form-control m-auto mt-2" placeholder="Enter Site Url Here">';
            break
        }

        case 'Phone': {
            formBox.innerHTML = '<input type="tel" name="Phone" id="Phone" class="form-control m-auto mt-2" placeholder="Enter Phone Number">';
            break
        }

        

        case 'Message': {
            formBox.innerHTML = '<input type="tel" name="Phone" id="Phone" class="form-control m-auto mt-2" placeholder="Enter Phone Number Here"><br><textarea name="Message" id="Message" class="form-control d-flex m-auto" cols="30" rows="10" placeholder="Enter Your Message Here"></textarea>';
            break
        }



        default: {
            formBox.innerHTML = '<textarea name="planText" id="planText" class="form-control d-flex m-auto" cols="30" rows="10" placeholder="Enter Your Text Here" ></textarea>';
            break;
        }
    }
    QRCodeGenerator();
}
formType('planText');


function inputValue(id) {
    return document.getElementById(id).value;
}

function QRCodeGenerator() {

    var planText = null;
    var siteUrl = '';
    var fname = '';
    var lname = '';
    var Mobile = '';
    var Phone = '';
    var Fax = '';
    var Email = '';
    var Company = '';
    var Job = '';
    var Street = '';
    var City = '';
    var Zip = '';
    var State = '';
    var Country = '';
    var Website = '';
    var App = '';
    var Message = '';
    var userInput = '';

    switch (formFieldType) {
        case 'planText': {
            planText = inputValue('planText');
            userInput = 'Text:' + planText;
            break;

        }

        case 'siteUrl': {
            siteUrl = inputValue('siteUrl');
            userInput = 'Site Url:' + siteUrl;
            break;

        }

        case 'Phone': {
            Phone = inputValue('Phone');
            userInput = 'Phone:' + Phone;
            break;

        }
       

        case 'Message': {
            Phone = inputValue('Phone')
            Message = inputValue('Message')
            userInput = 'Phone:' + Phone + '\n' + 'Message:' + Message;
            break;

        }


        default: {
            planText = inputValue('planText');
            userInput = 'Text:' + planText;
            break;
        }
    }


    var element = document.getElementById('qrcode');
    element.innerHTML = '';
    let qrcode = new QRCode(element, {
        text: userInput ? userInput : 'www.udemy.com',
        width: 250,
        height: 250,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

}


function copyQR() {
    var img = document.querySelector('#qrcode').querySelector('img');
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
    var img = document.querySelector('#qrcode').querySelector('img').src;
    var link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = img;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR code generator</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <script src="qrcode.min.js"></script>
  <link rel="stylesheet" href="style.css">
  <script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
</head>

<body>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">QR Code Generator </a>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
  <div class="container">
    <div class=" allbutton  mt-5">
      <button type="button" class="btn btn-primary selectbutton">URL</button>
      <button type="button" class="btn btn-primary selectbutton">SMS</button>
      <button type="button" class="btn btn-primary selectbutton">Phone</button>
      <button type="button" class="btn btn-primary selectbutton">Email</button>
      <button type="button" class="btn btn-primary selectbutton">Text</button>

    </div>
    <div class="mt-4 col-8 ">
      <div class="entervalue" >
      <input type="url" class="p-3 " id="url" placeholder="Enter URL">
    </div>
      <div class=" entervalue sms">
        <input type="number" class="p-3 " min="0" id="number" placeholder="Enter Number">
        <br>
        <input type="text" class="p-3" id="sms" placeholder="Enter text">
      </div>
      <div class="entervalue" >
      <input type="number" class="p-3 " min="0" id="number" placeholder="Enter Number">
    </div>
    <div class="entervalue">
      <input type="email" class="p-3 " id="email" placeholder="example@.com">
    </div>
    <div class="entervalue">
      <input type="textarea" class="p-3 " id="input" placeholder="Enter Text" required>
    </div>
      <p class="errormessage" id="url-p"></p>
      <p class="errormessage" id="sms-p"></p>
      <p class="errormessage" id="phone-p"></p>
      <p class="errormessage" id="email-p"></p>
    </div>
    <div>
      <!-- Background color input -->
      <label for="background-color">Background Color:</label>
      <input type="color" id="background-color" oninput="colorchange(event)" name="background-color" value="#ffffff">
      <label for="squares">squares:</label>
      <input type="color" id="squares" oninput="colorchange(event)" name="squares">
      <label for="pixels">pixels:</label>
      <input type="color" id="pixels" oninput="colorchange(event)" name="pixels">
      
      <!-- Image upload input -->
      <label for="image-input">Upload Image:</label>
      <input type="file" id="image-input" name="image-input" accept="image/*" oninput="colorchange(event)">
      <!-- <button type="button" id="qr_btn" class="btn btn-primary">Generate your QR code</button> -->
    </div>
      <div class="all_qr">
      <div id="qrcode" class="mt-4"></div>
      <div id="qrcode-1" class="mt-4"></div>
    </div>
  </div>
  <div class="d-flex justify-content-end">
    <i class="fa text-center p-2 bg-info m-1 rounded  fa-copy" onclick="copyQR()" aria-hidden="true">
      <small>Copy</small></i>
    <i class="fa text-center p-2 bg-info m-1 rounded fa-download" onclick="downloadQR()" aria-hidden="true">
      <small>Download</small></i>
  </div>

  <script src="script.js"></script>
</body>

</html> */}
