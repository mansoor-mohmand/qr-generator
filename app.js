// https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WIFI%3AT%3AWPA;S:KPNbox12;P:Welkom1348!; wifi qr code
// const url = 'https://api.qrserver.com/v1/create-qr-code/?data=WIFI%3AT%3AWPA;S:KPNbox12;P:Welkom1348!;&size=200x200&format=png';

const qr_items = document.querySelectorAll(".qrcode-container .qr-item");
const forms = document.querySelectorAll(".forms-container .form");

const btn_qr_generator = document.querySelector("#btn_qr_generator");
const qrcode__image = document.querySelector("#qrcode__image");
const download_btn = document.querySelector("#download_btn");
let ACTIVE_QR_CODE = "text";

function CategorySelection(qr_item_id)
{
    const qr_item_data = qr_item_id.dataset.item;
    const qrcode__icon = document.getElementById("qrcode__icon");

    // ? show active qr-item
    qr_items.forEach(el => el.classList.remove("active"));
    qr_item_id.classList.add("active");

    // ? display active form
    forms.forEach(el =>{
        const form_data = el.dataset.form;
        (form_data === qr_item_data)?el.style.display = "flex":el.style.display = "none";
    });

    // ? change qr-code title icon
    qrcode__icon.className=qr_item_id.children[0].className;
    ACTIVE_QR_CODE = qr_item_data;
}

function GetFormData(form_id)
{
    const form_data = document.getElementById(`form_${form_id}`);
    const formData = new FormData(form_data);
    const formDataObject = Object.fromEntries(formData);

    return formDataObject;
}


const createURL = (data) =>
{
    const QR_CODE_FORMAT = "qzone=0&margin=0&size=400x400&color=FFFFFF&bgcolor=00298A&format=png&ecc=L";
    const url = `http://api.qrserver.com/v1/create-qr-code/?data=${data}&${QR_CODE_FORMAT}`;
    return url;
}

// ? Fetching URL to get QR-CODE as png
async function Fetch_QR_CODE(url) 
{
    const response = await fetch(url);
    const img = await response.blob();
    const imageBase64 = URL.createObjectURL(img);
    qrcode__image.src = imageBase64;
}
// todo -> methods for creating categories QR-CODE
const getTEXT = () =>
{
    let {dataTextarea} = GetFormData(ACTIVE_QR_CODE);
    let text = encodeURIComponent(dataTextarea);
    
    Fetch_QR_CODE(createURL(text)); 
}

const getURL = () =>
{
    let {dataUrl} = GetFormData(ACTIVE_QR_CODE);
    let url_ = encodeURIComponent(dataUrl);
    
    Fetch_QR_CODE(createURL(url_)); 
}

const getPHONE = () =>
{
    let {dataCountryCode,dataAreaCode,dataPhoneNumber} = GetFormData(ACTIVE_QR_CODE);
    let phone = encodeURIComponent(`tel:${dataCountryCode}${dataAreaCode}${dataPhoneNumber}`);

    Fetch_QR_CODE(createURL(phone)); 
}

const getEMAIL = () =>
{
    let {dataEmail,dataSubject,dataMessage} = GetFormData(ACTIVE_QR_CODE);
    let email = encodeURIComponent(`MATMSG:TO:${dataEmail};SUB:${dataSubject};BODY:${dataMessage};`);

    Fetch_QR_CODE(createURL(email));
}

const getWIFI = () =>
{
    let {dataEncryption,dataSsid,dataPassword,dataWifiHidden} = GetFormData(ACTIVE_QR_CODE);
    let email = encodeURIComponent(`WIFI:T:${dataEncryption};S:${dataSsid};P:${(dataEncryption!=="nopass")?dataPassword:""};${(dataWifiHidden)?"H:true":""};`);

    // console.log(email);
    Fetch_QR_CODE(createURL(email));
}


// ? Generate QR-CODE btn
btn_qr_generator.onclick = () =>{
    
     (ACTIVE_QR_CODE === "text") ? getTEXT()
    :(ACTIVE_QR_CODE === "url") ? getURL()
    :(ACTIVE_QR_CODE === "email") ? getEMAIL()
    :(ACTIVE_QR_CODE === "phone") ? getPHONE()
    : getWIFI();

}

// ? download generated QR-CODE
download_btn.onclick = () => {

    domtoimage.toPng(document.getElementById('generated_qrcode'),{
        quality:0.99,
    })
    .then(dataURL => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = "qr-code.png";
        a.href = dataURL;
        a.click();
    })

}





