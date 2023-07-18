const key = "0f8fea1a4771f40764412d2f";
const callApiUrl = `https://v6.exchangerate-api.com/v6/${key}/latest/KRW`;

var exchangeRate = async () => {
  try {
    let response = await fetch(callApiUrl);
    if (response.status === 200) {
      let data = response.json();
      return data;
    }
    else {
      return null;
    }    
  }
  catch {
    return null;
  }
};

var setData = async () => {
  let result = await exchangeRate();

  if (result !== null) {
    let data = result.conversion_rates;
    console.log(result);
    const select = document.querySelector("#country");

    for (ctry in data) {
      let opt = document.createElement("option");
      opt.value = data[ctry];
      opt.text = ctry;
      select.append(opt);
    }

    onChangeValue();
  }
}

var onChangeValue = () => {
  const select = document.querySelector("#country");
  const val = document.querySelector("#changeVal");

  if (val !== undefined) {
    const result =  Number.parseFloat(select.value) * Number.parseFloat(val.value);
    const resultInput = document.querySelector("#resultVal");
    const changeRateSpan = document.querySelector("#changeRate");
    resultInput.value = result;
    changeRateSpan.innerHTML = select.options[select.selectedIndex].text;
  }
}
