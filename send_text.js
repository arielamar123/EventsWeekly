const LOCAL_HOST = 'http://127.0.0.1:8001';
let socket = io.connect(LOCAL_HOST);


function send_text(form) {
    alert("shit");
    socket.emit('submit', form.header.value, form.footer.value);
    console.log("mmmm")
}

socket.on("return_post", function (response) {
    let post = document.createElement("textarea");
    let output_headline = document.createElement("span");
    let br = document.createElement("br");
    let br2 = document.createElement("br");

    output_headline.innerText = "Your post is:";
    output_headline.style = "font-weight: bold;";
    post.name = "post";
    post.cols = "40";
    post.rows = "5";
    post.value = response;
    $(".inputs").append(output_headline, br, br2, post);
    // inputs = document.getElementsByName("inputs");
    // inputs.appendChild(output_headline);
    // inputs.appendChild(br);
    // inputs.appendChild(post);

});



