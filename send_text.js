const LOCAL_HOST = 'http://127.0.0.1:8080';
let socket = io.connect(LOCAL_HOST);

let i = 0;

function send_text() {
    i++;
    socket.emit('submit', document.getElementById("header").value, document.getElementById("footer").value);

}

socket.on("return_post", function (response) {
    let post = document.createElement("textarea");
    post.id = "post";
    let output_headline = document.createElement("span");
    let br = document.createElement("br");
    let br2 = document.createElement("br");
    let br3 = document.createElement("br");
    let key_click = document.createElement("button");
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
    if (i <= 1) {
        $(".inputs").append(output_headline, br, br2, post, br3, key_click);
    }
    else {
        document.getElementsById("post").value = response;
    }
    // inputs = document.getElementsByName("inputs");
    // inputs.appendChild(output_headline);
    // inputs.appendChild(br);
    // inputs.appendChild(post);

});



