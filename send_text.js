let obj = (function(){
    const LOCAL_HOST = 'http://127.0.0.1:8888';
    let socket = io.connect(LOCAL_HOST);
    let i = 0;

    let send_text_inner = function () {
        i++;

        socket.emit('submit', document.getElementById("header").value, document.getElementById("footer").value,document.getElementById("Start Date").value,document.getElementById("End Date").value);

    }

    function get_facebook(status) {
        console.log("pressed facebook");
        FB.ui({
            method: 'share',
            href: 'https://www.facebook.com/',
            quote: status,
        }, function (response) {
        });
    }

    socket.on("return_post", function (response) {
        let post = document.createElement("textarea");
        post.id = "post";
        let output_headline = document.createElement("span");
        output_headline.class = "text";
        let facebook = document.createElement("img");
        let br = document.createElement("br");
        let br2 = document.createElement("br");
        let br3 = document.createElement("br");
        let br4 = document.createElement("br");
        let br5 = document.createElement("br");
        let key_click = document.createElement("button");
        let status = response;
        facebook.src = "fsharesmall.png";
        facebook.addEventListener('click', function () {
            get_facebook(status);
        });
        facebook.alt = "Facebook";
        output_headline.classList.add("text2");
        output_headline.innerText = "Your post is:";
        output_headline.style = "font-weight: bold;";
        post.name = "post";
        post.cols = "40";
        post.rows = "5";
        post.value = response;
        key_click.onclick = function click_me() {
            /* Get the text field */
            let copyText = document.getElementById("post");

            /* Select the text field */
            copyText.select();

            /* Copy the text inside the text field */
            document.execCommand("Copy");
        };
        key_click.innerHTML = "Copy text";
        let table = document.createElement("table");
        let row = document.createElement("tr");
        let copy_place = document.createElement("td");
        let facebook_place = document.createElement("td");
        copy_place.appendChild(key_click);
        facebook_place.appendChild(facebook);
        row.appendChild(copy_place);
        row.appendChild(facebook_place);
        table.appendChild(row);
        if (i <= 1) {
            $(".inputs").append(output_headline, br, br2, post, br3, br4, table);
        }
        else {
            document.getElementById("post").value = response;
        }
        // inputs = document.getElementsByName("inputs");
        // inputs.appendChild(output_headline);
        // inputs.appendChild(br);
        // inputs.appendChild(post);

    });

    function onSuccess(googleUser) {
          console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
        }
    function onFailure(error) {
      console.log("error mother fucker");
      console.log(error);
    }
    function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    }
    function disable_inner(checkbox_name,calender_name) {
                var checkBox = document.getElementById(checkbox_name);
                var calender = document.getElementById(calender_name);
                if (checkBox.checked == true)
                {calender.disabled = true;
                if(calender.value != null)
                {calender.value = null;}
                }
                else {calender.disabled = false;}
                }

    let a = {}
    a.send_text = send_text_inner;
    a.disable = disable_inner;
    return a;
})();




