// music play
const icon = document.querySelector('.far.fa-bell');
const mySong = document.querySelector('#my-song');
const stopSong = document.querySelector('.top');

window.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        mySong.play();
    }
    if (e.key == "Enter" && e.shiftKey == true) {
        mySong.pause();
    }
});
// music play
