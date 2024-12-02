// PhotoSwipe
initPhotoSwipeFromDOM(".js-my-gallery");

$(function () {
    //iOS対策
    //iOSでは疑似要素を含むaタグのリンクは２回タップしないと遷移とページ内スクロールをしないため、
    //ユーザーエージェント判定でiOSの場合はbodyタグにiosを付与し、対象の疑似要素をdisplay: noneする
    var ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) {
        $("body").addClass("ios");
    }

    //Worksのリンクを有効化
    //スライド（Swiper）内に記載のリンクを有効にするため下記の記述が必要 (;´･ω･)ｳｰﾝ･･･
    $(".works-url").on("click", "a", function (e) {
        e.stopPropagation();
    });

    //ページ内スクロール
    var $nav = $(".gnav");
    var navHeight = $nav.outerHeight();

    $('a[href^="#"]').on("click", function () {
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? "html" : href);
        var position = target.offset().top - navHeight;
        $("html, body").animate(
            {
                scrollTop: position,
            },
            300,
            "swing"
        );
        return false;
    });

    //ページトップ
    $("#js-page-top").on("click", function () {
        $("body,html").animate(
            {
                scrollTop: 0,
            },
            300
        );
        return false;
    });
});

// form送信
document
    .getElementById("contact-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault(); // フォームのデフォルト動作をキャンセル

        const form = e.target;
        const formData = new FormData(form);
        const submitButton = document.getElementById("submit-btn");

        // ボタンを無効化してローディング状態
        submitButton.disabled = true;
        submitButton.textContent = "送信中...";

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                mode: "no-cors", // クロスオリジンエラーを防ぐ
            });

            if (response) {
                submitButton.textContent = "送信が完了しました";
                submitButton.classList.add("btn-success");
                form.reset(); // フォームをリセット
            }
        } catch (error) {
            console.error("送信エラー:", error);
            submitButton.textContent = "送信に失敗しました";
            submitButton.classList.add("btn-danger");
        }
    });
