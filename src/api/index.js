import axios from "axios"

const url = "https://covid19.mathdro.id/api"

export const fetchData = async (country) => {
    let changableUrl = url
    if (country) {
        changableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changableUrl)
        return { confirmed, recovered, deaths, lastUpdate }

    } catch (error) {
        console.log(error)
    }
}
export const fetchDailyData = async () => {
    // try {
    //     const { data } = await axios.get(`${url}/daily`)

    //     const modifiedData = data.map((dailyData) => ({
    //         confirmed: dailyData.confirmed.total,
    //         recovered: dailyData.recovered.total,
    //         deaths: dailyData.deaths.total,
    //         date: dailyData.reportDate,
    //     }))
    //     return modifiedData
    // } catch (error) {
    try {
        const { data } = await axios.get(`${url}/daily`);


        return data.map(({ confirmed, recovered, deaths, reportDate: date }) => ({ confirmed: confirmed.total, recovered: recovered.total, deaths: deaths.total, date }));
    } catch (error) {

        console.log(error)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)

        return countries.map((country) => country.name)

    } catch (error) {
        console.log(error)
    }
}