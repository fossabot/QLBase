function RotatingButton(button) {
    let initialContents = $(button).html();

    return {
        show: ()=> {
            $(button).html("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"rotating\" style=\"margin-right: 6px !important\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2.0\" stroke=\"currentColor\" width=\"18\" height=\"18\" class=\"mb-1\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99\" /></svg><span>Loading...</span>");
        },

        hide: ()=> {
            $(button).html(initialContents);
        }
    }
}