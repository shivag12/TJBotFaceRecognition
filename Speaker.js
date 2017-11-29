const TJBot = require('tjbot');
 
var hardware = ['speaker'];
var configuration = {
    robot: {
        gender: 'female'
    },
    speak: {
        language: 'en-US'
    }
};
var credentials = {
    text_to_speech: {
        username: 'bee62e5e-8486-4aa8-8de7-7bfba4af4178',
        password: 'LoETC3zEWXq2'
    }
}

var tj = new TJBot(hardware, configuration, credentials);


tj.speak("Hi Suma,My name is Lorena,  how can i help you. Today's temperature is 45 degrees");