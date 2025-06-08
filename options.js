document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('consent-checkbox');
    const saveButton = document.getElementById('save-button');

    // Загрузка текущего состояния
    const storage = typeof browser !== 'undefined' ? browser.storage.local : chrome.storage.local;
    console.log('storage options', storage);
    storage.get('consentGiven').then((result) => {
        checkbox.checked = result.consentGiven || false;
    });

    saveButton.addEventListener('click', () => {
        const consentGiven = checkbox.checked;
        storage.set({ consentGiven }).then(() => {
            alert('Настройки сохранены!');
        });
    });
});