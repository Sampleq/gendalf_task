export function fakeInputFile() {

    const fakeInput = document.querySelector('.fakeInputFile');
    const getFile = document.getElementById('getFile')

    fakeInput.onclick = () => getFile.click();

    fakeInput.onkeydown = (e) => {
        if (e.code === 'Enter') {
            getFile.click();
        }
    }
}