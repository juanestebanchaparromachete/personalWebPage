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
            console.log("llega a back")
            e.preventDefault();
            $('html,body').animate({
                    scrollTop: $("#parent").offset().top
                },
                'slow');

        });
    });



    $('.sendBut').click(function () {

        console.log("do it");
    })




}