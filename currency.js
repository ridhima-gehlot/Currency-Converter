const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

//code starts from here 

let base_url =  "http://www.floatrates.com/daily/usd.json";
 
const dropdowns=document.querySelectorAll(".dropdown select"); //to fill the dropdown
 dropdowns.forEach((select)=> {
  for  ( currCode in countryList){
    newOption=document.createElement("option")
    newOption.textContent=currCode;
    newOption.value=currCode;
    if(select.name==="from" && currCode=="USD"){
      newOption.selected="selected";}
    else if  (select.name==="to" && currCode=="INR"){
      newOption.selected="selected"} 
    select.appendChild(newOption);
  }
  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
  })
});

const updateFlag=((element)=>{                       //to update flag acc to country
 let currCode=element.value
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
})

const button=document.querySelector("form button")  //to acess input and controlling the input
button.addEventListener("click", async (evt)=>{
  evt.preventDefault();
   let amount=document.querySelector(".amount input");
  let amtVal=amount.value;
  console.log(amtVal)
  if(amtVal==="" || amtVal<1){
    amtVal=1;
    amount.value="1";
  }

let fromCurr=document.querySelector(".from select").value;
 let toCurr=document.querySelector(".to select").value;

//console.log(fromCurr.value, toCurr.value)

let url = `http://www.floatrates.com/daily/${fromCurr.toLowerCase()}.json`;  //fetching api
let response=await fetch(url);
let data=await response.json();
let rate = data[toCurr.toLowerCase()];
console.log(rate);
let finalAmt= (amtVal * rate.rate).toFixed(2);
console.log(finalAmt)  //this is the converted value
msg=document.querySelector(".msg")
msg.innerText=`${amtVal} ${fromCurr} = ${finalAmt} ${toCurr}`; //the updated message
});

let fromCurr=document.querySelector(".from select");
 let toCurr=document.querySelector(".to select");
 let exBtn=document.querySelector(".exBtn");  //to make the arrow icon work 
exBtn.addEventListener("click", ()=>{
  temp= fromCurr.value;
  fromCurr.value=toCurr.value; //swapping value
  toCurr.value=temp;

  button.click(); //triggers the button 
})
