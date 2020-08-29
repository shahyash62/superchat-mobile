export function themeChanger(profile) {
    switch (profile) {
        case 'red':
            document.documentElement.style.setProperty('--ion-color-primary', '#ff3860');
            document.documentElement.style.setProperty('--ion-color-primary-rgb', '255, 56, 96');
            document.documentElement.style.setProperty('--ion-color-primary-contrast', '#ffffff');
            document.documentElement.style.setProperty('--ion-color-primary-contrast-rgb', '255, 255, 255');
            document.documentElement.style.setProperty('--ion-color-primary-shade', '#e03154');
            document.documentElement.style.setProperty('--ion-color-primary-tint', '#ff4c70');
            break;
        case 'blue':
            document.documentElement.style.setProperty('--ion-color-primary', '#3dc2ff');
            document.documentElement.style.setProperty('--ion-color-primary-rgb', '61, 194, 255');
            document.documentElement.style.setProperty('--ion-color-primary-contrast', '#ffffff');
            document.documentElement.style.setProperty('--ion-color-primary-contrast-rgb', '255, 255, 255');
            document.documentElement.style.setProperty('--ion-color-primary-shade', '#36abe0');
            document.documentElement.style.setProperty('--ion-color-primary-tint', '#50c8ff');
            break;
        case 'green':
            document.documentElement.style.setProperty('--ion-color-primary', '#00d1b2');
            document.documentElement.style.setProperty('--ion-color-primary-rgb', '0, 209, 178');
            document.documentElement.style.setProperty('--ion-color-primary-contrast', '#ffffff');
            document.documentElement.style.setProperty('--ion-color-primary-contrast-rgb', '255, 255, 255');
            document.documentElement.style.setProperty('--ion-color-primary-shade', '#00b89d');
            document.documentElement.style.setProperty('--ion-color-primary-tint', '#1ad6ba');
            break;
        default:
            document.documentElement.style.setProperty('--ion-color-primary', '#ff3860');
            document.documentElement.style.setProperty('--ion-color-primary-rgb', '255, 56, 96');
            document.documentElement.style.setProperty('--ion-color-primary-contrast', '#ffffff');
            document.documentElement.style.setProperty('--ion-color-primary-contrast-rgb', '255, 255, 255');
            document.documentElement.style.setProperty('--ion-color-primary-shade', '#e03154');
            document.documentElement.style.setProperty('--ion-color-primary-tint', '#ff4c70');
            break;
    }
}
