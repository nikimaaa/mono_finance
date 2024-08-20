(async () => {
    const res = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', { mode: 'cors' });
    const text = await res.text();
    console.log(text)
})()