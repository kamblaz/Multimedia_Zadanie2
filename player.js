(function() {
    const playlistWrapper = document.querySelector('.movies_wrapper');
    const addMovieButton = document.querySelector('.add_movie_button');
    const newMovieTitle = document.querySelector('#movie_title');
    const newMovieUrl = document.querySelector('#movie_url');


    const createNewMovieElement = () => {
        const movieItem = document.createElement('option');
        movieItem.textContent = newMovieTitle.value;
        var url = newMovieUrl.value;
        url = '\"'.concat(url);
        url = url.concat('\"');
        movieItem.setAttribute('onclick', `runVideo(${url})`);
        playlistWrapper.appendChild(movieItem);
        newMovieUrl.value = '';
        newMovieTitle.value = '';
    }

    addMovieButton.addEventListener('click', (e) => {
        e.preventDefault();
        createNewMovieElement();
    })
})();

function runVideo(link) {
    document.getElementById('video').setAttribute('src', link)
    document.getElementById('video').muted = 0;
}

function getParamNames(func) {
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var result = func.slice(func.indexOf('(') + 1, func.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}

function removeParentheses(string) {
    var result = string.toString().replaceAll('\"', '');
    return result;
}

current_video_index = 0;
document.getElementById('video').addEventListener('ended', myHandler, false);

function myHandler(e) {
    var arr = [];
    var e = document.getElementById("select");
    var lis = document.getElementsByTagName("option");
    for (var i = 0; i < lis.length; ++i) {
        var item = lis[i];
        if (item.value == e.value) {
            current_video_index = i;
        }
        if (lis[i].selected) {
            arr.push(i);
        }
    }
    console.log(arr);
    if (current_video_index < lis.length - 1) {
        next_video_link = removeParentheses(getParamNames(lis[current_video_index + 1].getAttribute('onclick')));
        $("#video").attr('src', next_video_link);
        var next_video_title = lis[current_video_index + 1].value;
        $('#select').val(next_video_title);
        current_video_index += 1;
    } else {
        next_video_link = removeParentheses(getParamNames(lis[0].getAttribute('onclick')));
        $("#video").attr('src', next_video_link);
        var next_video_title = lis[0].value;
        $('#select').val(next_video_title);
        current_video_index = 0;
    }
    $("#video")[0].load();
    // console.log("Number of videos", lis.length)
    // console.log("Current video index", current_video_index)
    // console.log("Current video name", e.value)
    // console.log("ended");
}

function moveUp() {
    var selected = $("#select").find(":selected");
    var before = selected.prev();
    if (before.length > 0)
        selected.detach().insertBefore(before);
}

function moveDown() {
    var selected = $("#select").find(":selected");
    var next = selected.next();
    if (next.length > 0)
        selected.detach().insertAfter(next);
}

function remove() {
    var select = document.getElementById("select");
    for (var i = 0; i < select.length; i++) {
        if (select[i].selected) {
            select.remove(i);
            i = i - 1;
        }
    }
}

function changeVolume() {
    var input = document.getElementById("volume");
    var progress_bar = document.getElementById("progress_volume");
    var player = document.getElementById("video");
    player.volume = input.value / 100.0;
    progress_bar.value = input.value;
}

function changePosition() {
    var input = document.getElementById("position");
    var progress_bar = document.getElementById("progress_position");
    var player = document.getElementById("video");
    progress_bar.value = input.value;
}