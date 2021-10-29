const name = document.getElementById("name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const website = document.querySelector("#website");
const company = document.querySelector("#company");
const address = document.querySelector("#address");




const getInfo = async (event) => {

    // api.openweathermap.org / data / 2.5 / weather ? q = pune & appid=a9e30f59660c6a75761abf2e80c03a5d

        try {
            let url = ("https://jsonplaceholder.typicode.com/users");
            console.log(url)
            const response = await fetch(url);

            const data = await response.json();

            console.log(data);



        } catch(err) {
            console.log(err)

        }

}

getInfo();

module.exports = getInfo;
