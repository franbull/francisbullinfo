$(document).ready(function() {
    console.log('page loaded?');
    setInterval(function() {
        var header = $('#demo_js_div h1.hidden');
        header.fadeIn('slow');
        header.fadeOut('slow');
    }, 1000);
});
