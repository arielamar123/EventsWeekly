window.fbAsyncInit = function () {
    FB.init({
        appId: '199242910962332',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2'
    });

};

(function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));