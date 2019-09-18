var request = require("request");


module.exports = {
    textToAudio: function (text) {
        return new Promise((res,err) =>
        {
            var apikey = "FcunOKhoc4AkXr3hkkBDCkx9";
            var secret = "kzwWK2m4Wb65xFW6mEs9oCgYOVV5XrGF";

            var options = {
                url: `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apikey}&client_secret=${secret}`
            };

            request.get(options, function (err, response, body) {
                result =JSON.parse(response.body) ;
                // console.log(result)
                url = `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=${result.access_token}&tex=${text}&vol=9&per=0&spd=5&pit=5&aue=3`;
                return res(url)
            });
        }
    )
    },
    play: function (webContents, url) {
        webContents.executeJavaScript(`new Audio("${url}").play()`, true)
            .then((result) => {
                // console.log(result)
            })
    }
}