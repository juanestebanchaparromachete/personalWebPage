window.onload = function () {

    $(document).ready(function () {
        $('#show').click(function () {
            $('.menu').slideToggle("fast");

        });
    });

    function goToByScroll(id) {
        id = id.replace("Link", "");
        if (id != "show") {
            $('html,body').animate({
                    scrollTop: $("#" + id).offset().top
                },
                'slow');
        } else {
            $('html,body').animate({
                    scrollTop: 0
                },
                'slow');
        }
    }

    $("#myTopnav > a").click(function (e) {
        e.preventDefault();
        goToByScroll(this.id);
    });

    $("#toParent > i").click(function (e) {
        e.preventDefault();
        goToByScroll("show");
    });


    $(document).ready(function () {
        $('#toParent').click(function () {
            e.preventDefault();
            $('html,body').animate({
                    scrollTop: $("#parent").offset().top
                },
                'slow');

        });
    });

    $(function () {

        var $body = $(document);
        $body.on('click', '.wfPageNextButton, .wfPagePreviousButton', function () {
            // "Disable" the horizontal scroll.
            if ($body.scrollTop() !== 0) {
                $body.scrollTop(0);
            }
        });

    });



    var myform = $("form#myform");
    myform.submit(function (event) {
        event.preventDefault();

        // Change to your service ID, or keep using the default service
        var service_id = "gmail";
        var template_id = "template_LOXIHisP";

        myform.find("button").text("Sending...");
        emailjs.sendForm(service_id, template_id, "myform")
            .then(function () {
                alert("Sent!");
                myform.find("button").text("Send");
            }, function (err) {
                alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
                myform.find("button").text("Send");
            });
        return false;
    });








}