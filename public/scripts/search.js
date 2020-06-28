var insertion = '';
var author = '';

function search (obj, el) {
        var request = $(obj).val();
        $.ajax({
            url: '/search?query=' + request,
            type: 'GET',
            success: function (html) {
                insertion = '';
                if (html == "empty"){
                    document.getElementById('book-container').innerHTML = '';
                    document.getElementById('backstage').style.visibility = "hidden";
                    return;
                }

                for (book in html){
                    
                if (html[Object.keys(html).indexOf(book)].Author)
                    author = (html[Object.keys(html).indexOf(book)].Author.trim().replace(/\s+/g, " ")).substr(0,12);
                else 
                    author = "Неизвестен..";

                    insertion += `<div class="book_card">
                    <div class=" mb-5">
                        <a target="_blank" rel="noopener noreferrer" href="`+ html[Object.keys(html).indexOf(book)].Url +`">
                            <div class="img_block">
                                <img class="img_book" src="`+ html[Object.keys(html).indexOf(book)].img_book +`">
                                <span class="text_img_book_1 tib descr">Перейти</span><span class="text_img_book_2 tib">на сайт...</span>        
                            </div>
                        </a>
                        <div class="row">
                            <div class="title_text_book">
                                <p><a target="_blank" rel="noopener noreferrer" href="`+ html[Object.keys(html).indexOf(book)].Url +`" style="color:black">`+ (html[Object.keys(html).indexOf(book)].Name.trim().replace(/\s+/g, " ")).substr(0,12) + `...</a></p>
                                <p style="font-size:11pt">`+ author +`</p>
                                <p>`+ html[Object.keys(html).indexOf(book)].Price +`</p>    
                            </div>
                        </div>
                    </div>    
                </div>`;
                    document.getElementById('book-container').innerHTML = insertion;
                    document.getElementById('backstage').style.visibility = "visible";
                }
                if (!html.length){
                    document.getElementById('book-container').innerHTML = '<h3>Поиск не дал результатов..</h3>';
                    document.getElementById('backstage').style.visibility = "hidden";
                }
                    
            },
            cache: false,
            contentType: false,
            processData: false
        });
};
