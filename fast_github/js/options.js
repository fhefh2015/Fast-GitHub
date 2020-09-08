; (function () {

    init();

    async function init() {
        //获取缓存数据
        let input_url_checkbox = await asyncGetItem("input_url_checkbox");
        let cf_url = await asyncGetItem("cf_url");

        if (parseInt(input_url_checkbox)) {
            $("#input_url").attr('disabled', false);
            $("#input_url_checkbox").attr("checked", true);
        } else {
            $("#input_url").attr('disabled', true);
            $("#input_url_checkbox").attr("checked", false);
        }

        if (cf_url && isUrl(cf_url)) {
            $("#input_url").val(cf_url);
        }


        $("#input_url_checkbox").on('change', function () {
            let checked = $(this).is(':checked');

            if (checked) {
                $("#input_url").attr('disabled', false);
                setItemByKey("input_url_checkbox", 1);
            } else {
                $("#input_url").attr('disabled', true);
                setItemByKey("input_url_checkbox", 0);
            }

        });

        $("#save_btn").on('click', function () {

            let cf_url = $("#input_url").val();

            if (!$("#input_url_checkbox").is(':checked')) {

                setItemByKey("input_url_checkbox", 0);
                setItemByKey("cf_url", "");

                $("#input_url").val("");

                alert("未保存填写网址");

                return false;
            }

            if (cf_url == "" || !isUrl(cf_url)) {

                $("#input_url").val("");
                $("#input_url").attr("disabled", true);
                $("#input_url_checkbox").prop("checked", false);

                setItemByKey("input_url_checkbox", 0);
                setItemByKey("cf_url", "");

                alert("请输入正确网址");

                return false;
            }

            setItemByKey("input_url_checkbox", 1);
            setItemByKey("cf_url", cf_url);

            alert("保存成功");
        });
    }
})()