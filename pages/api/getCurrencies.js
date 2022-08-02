import redis  from "./redis";

export default async function getCurrencies(getRates) {
    if (getRates) {
        redis.get("rates", async (error, rates) => {
            if (error) console.log(error)
            if (rates === null) {
                let myHeaders = new Headers();
                myHeaders.append("apikey", "XziOZtA0GGfi4wonGizQxxzSixUXJv9f");
                
                let requestOptions = {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders
                };
                
                let response = await fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=&base=IDR", requestOptions).then(res => res.text());
                redis.setex("rates", 3600 * 24, response);
                return (redis.get("rates"))
            }
        })
        return (redis.get("rates"))
    } else {
        redis.get("currencies", async (error, currencies) => {
            if (error) console.log(error)
            if (currencies === null) {
                let myHeaders = new Headers();
                myHeaders.append("apikey", "XziOZtA0GGfi4wonGizQxxzSixUXJv9f");
                
                let requestOptions = {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders
                };
                
                let response = await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions).then(res => res.text());
                redis.setex("currencies", 3600 * 24, response);
                return (redis.get("currencies"))
            }
        })
        return (redis.get("currencies"))
    }

}