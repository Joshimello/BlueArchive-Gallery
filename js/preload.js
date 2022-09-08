$('<div/>', { id: 'imgcacher', style: 'display: none' }).appendTo('body')
var cacher = $('#imgcacher')

$('img').each((index, img) => {
    $('<img/>', { src: $(this).data('src'), class: "precachedImg" }).appendTo(cacher)
})

$('.precachedImg').promise().done(() => {
    cacher.remove()

    $('img').each((index, img) => {
    	$($('img')[index]).attr('src', $($('img')[index]).data('src'))
    })
})
